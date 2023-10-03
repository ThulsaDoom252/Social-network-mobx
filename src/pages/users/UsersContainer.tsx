import React, {useContext, useEffect, useState} from 'react';
import Users from "./Users";
import authHoc from "../../hoc/authHoc";
import {useSnackbar} from "notistack";
import usersStore from "../../mobx/users"
import {HandleSearchRequestType, User} from "../../types";
import {observer} from "mobx-react-lite";
import PageContainer from "../../components/common/PageContainer";
import Paginator from "../../components/paginator/Paginator";
import SearchMenuCloseOverlay from "../../components/search/SearchMenuCloseOverlay";
import SearchBar from "../../components/search/SearchBar";
import {SearchContext} from "../../context/SearchContext";

interface UsersContainerProps {
    smallScreenMode: boolean
    tinyScreenMode: boolean
    isLogged: boolean,
}

const UsersContainer: React.FC<UsersContainerProps> = observer(({
                                                                    smallScreenMode,
                                                                    tinyScreenMode,
                                                                }) => {
    const searchContext = useContext(SearchContext)

    const  newPage= usersStore.newPage

    const {
        searchResults,
        searchRequest,
        searchMode,
        filterByStatusMode,
        filterByPhotoMode,
        currentSortTypeValue,
        handleUsersPerPage,
        handleFilterByStatusMode,
        handleFilterByPhotoMode,
        toggleSearchMode,
        searchUsers,
        isSearchMenuActive,
        setIsSearchMenuActive,
        isSearchMenuOpened,
        setIsSearchMenuOpened,
        setSearchRequest,
        setSearchResults,
        setFilterByStatusMode,
        setFilterByPhotoMode,
        handleSearchRequest,
        clearSearchRequest,
        sortByNameValue,
        sortByPhotoValue,
        handleCurrentSortType,
        users,
        filteredUsers,
        filterMode
    } = searchContext

    const isUsersLoaded = usersStore.isUsersLoaded
    //Search Props
    // const searchResults: User[] = usersStore.searchResults
    // const searchRequest = usersStore.searchRequest
    // const searchMode = usersStore.searchMode
    const usersToShow = filterMode && !searchMode ? filteredUsers : searchMode ? searchResults : users
    const currentPage = usersStore.currentPage
    const usersPerPage = usersStore.usersCount
    const totalUsersCount = usersStore.totalUserCount
    // const filterByStatusMode = usersStore.filterByStatusMode
    // const filterByPhotoMode = usersStore.filterByPhotoMode
    const fetchingUserId = usersStore.fetchingUserIds


    const [isActive, setIsActive] = useState(false);


    // const [isSearchMenuActive,
    //     toggleSearchMenu] = useState(false)

    useEffect(() => {
        if (isSearchMenuActive) {
            setIsActive(true);
        } else {
            // Задержите исчезновение компонента, чтобы анимация завершилась
            setTimeout(() => setIsActive(false), 300);
        }
    }, [isSearchMenuActive]);

    useEffect(() => {
        if (currentPage !== newPage) {
            usersStore.getUsers(usersPerPage, newPage)
        }
        // enqueueSnackbar('Users loaded')
    }, [usersPerPage,  newPage]);

    useEffect(() => {
        if (searchRequest === '') {
            searchMode && toggleSearchMode(false)
        } else {
            !searchMode && toggleSearchMode(true)
        }
        searchUsers(searchRequest)
    }, [searchRequest]);


    // const handleUsersPerPage = (value: number) => usersStore.setUsersPerPage(value)
    //
    // const handleFilterByStatusMode = (value: string) => usersStore.changeFilterByStatusMode(value)
    // const handleFilterByPhotoMode = (value: string) => usersStore.changeFilterByPhotoMode(value)

    const followUser = (userId: number, user: User) => usersStore.followUser(userId, user)
    const unfollowUser = (userId: number) => usersStore.unfollowUser(userId)


    const followUserHandler = async (isFollowed: boolean, userId: number, user: User) => {
        if (isFollowed) {
            unfollowUser(userId)
        } else {
            followUser(userId, user)
        }
    }

    // const setSearchRequest = (value: string) => {
    //     usersStore.setSearchRequest(value)
    // }
    //
    // const toggleSearchMode = (toggle: boolean) => {
    //     usersStore.toggleSearchMode(toggle)
    // }
    //
    // const clearSearchRequest = () => usersStore.setSearchRequest('')
    //
    // const searchUsers = (value: string) => usersStore.searchUsers(value)

    const handleChangePage = (value: number) => {
        usersStore.setNewPage(value)
    }

    // const {enqueueSnackbar, closeSnackbar} = useSnackbar()


    // const handleSearchRequest: HandleSearchRequestType = (e) => {
    //     const {value} = e.currentTarget;
    //     setSearchRequest(value.toLowerCase())
    // };


    return (
        <>
            {isSearchMenuActive && <SearchMenuCloseOverlay toggleSearchMenu={() => setIsSearchMenuActive(false)}/>}
            <PageContainer>
                <h4 className='
            w-full text-center font-bold
            '>Users({usersToShow.length})</h4>
                <SearchBar
                    menuType={'users'}
                    isSearchMenuOpen={isSearchMenuActive}
                    toggleSearchMenu={setIsSearchMenuActive}
                    searchRequest={searchRequest}
                    clearSearchRequest={clearSearchRequest}
                    isUsersLoaded={isUsersLoaded}
                    handleSearchRequest={handleSearchRequest}
                    usersPerPage={usersPerPage}
                    handleUsersPerPage={handleUsersPerPage}
                    filterByPhotoMode={filterByPhotoMode}
                    filterByStatusMode={filterByStatusMode}
                    handleFilterByPhotoMode={handleFilterByPhotoMode}
                    handleFilterByStatusMode={handleFilterByStatusMode}
                    isSearchMenuActive={isActive}
                />
                <Paginator
                    currentPage={currentPage}
                    totalItems={totalUsersCount}
                    itemsPerPage={usersPerPage}
                    handleChangePage={handleChangePage}
                    smallScreenMode={smallScreenMode}
                />
                <Users
                    followUserHandler={followUserHandler}
                    usersToShow={usersToShow}
                    smallScreenMode={smallScreenMode}
                    isUsersLoaded={isUsersLoaded}
                    tinyScreenMode={tinyScreenMode}
                />
            </PageContainer>
        </>
    )
});

export default authHoc(UsersContainer);