import React, {useEffect, useState} from 'react';
import Users from "./Users";
import authHoc from "../../hoc/authHoc";
import {useSnackbar} from "notistack";
import usersStore from "../../mobx/users"
import {HandleSearchRequestType, User} from "../../types";
import {observer} from "mobx-react-lite";
import ContentLoader from "react-content-loader";
import PageContainer from "../../components/common/PageContainer";
import SearchBar from "../../components/users/SearchBar";
import Paginator from "../../components/paginator/Paginator";
import SearchMenuCloseOverlay from "../../components/users/SearchMenuCloseOverlay";

interface UsersContainerProps {
    smallScreenMode: boolean
    isLogged: boolean,
}

const UsersContainer: React.FC<UsersContainerProps> = observer(({
                                                                    smallScreenMode,
                                                                }) => {
    const users: User[] = usersStore.users; // Убедитесь, что тип данных соответствует User[]
    const isUsersLoaded = usersStore.isUsersLoaded
    const searchResults: User[] = usersStore.searchResults
    const searchRequest = usersStore.searchRequest
    const searchMode = usersStore.searchMode
    const usersToShow = searchMode ? searchResults : users
    const currentPage = usersStore.page
    const usersPerPage = usersStore.usersCount
    const totalUsersCount = usersStore.totalUserCount
    const filterByStatusMode = usersStore.filterByStatusMode
    const filterByPhotoMode = usersStore.filterByPhotoMode
    const fetchingUserId = usersStore.fetchingUserIds

    const [isSearchMenuOpen,
        toggleSearchMenu] = useState(false)


    const handleUsersPerPage = (value: number) => usersStore.setUsersPerPage(value)

    const handleFilterByStatusMode = (value: string) => usersStore.changeFilterByStatusMode(value)
    const handleFilterByPhotoMode = (value: string) => usersStore.changeFilterByPhotoMode(value)

    const followUser = (userId: number, user: User) => usersStore.followUser(userId, user)
    const unfollowUser = (userId: number) => usersStore.unfollowUser(userId)


    const followUserHandler = async (isFollowed: boolean, userId: number, user: User) => {
        if (isFollowed) {
            unfollowUser(userId)
        } else {
            followUser(userId, user)
        }
    }

    const setSearchRequest = (value: string) => {
        usersStore.setSearchRequest(value)
    }

    const toggleSearchMode = (toggle: boolean) => {
        usersStore.toggleSearchMode(toggle)
    }

    const clearSearchRequest = () => usersStore.setSearchRequest('')

    const searchUsers = (value: string) => usersStore.searchUsers(value)

    const handleChangePage = (value: number) => {
        usersStore.setCurrentPage(value)
    }

    // const {enqueueSnackbar, closeSnackbar} = useSnackbar()

    useEffect(() => {
        usersStore.getUsers(usersPerPage, currentPage)
        // enqueueSnackbar('Users loaded')
        debugger
    }, [usersPerPage, currentPage, filterByPhotoMode, filterByStatusMode]);

    useEffect(() => {
        if (searchRequest === '') {
            searchMode && toggleSearchMode(false)
        } else {
            !searchMode && toggleSearchMode(true)
        }
        searchUsers(searchRequest)
    }, [searchRequest]);

    const handleSearchRequest: HandleSearchRequestType = (e) => {
        const {value} = e.currentTarget;
        setSearchRequest(value.toLowerCase())
    };


    return (
        <>
            {isSearchMenuOpen && <SearchMenuCloseOverlay toggleSearchMenu={toggleSearchMenu}/>}
            <PageContainer>
                <h4 className='
            w-full text-center font-bold
            '>Users({usersToShow.length})</h4>
                <SearchBar
                    isSearchMenuOpen={isSearchMenuOpen}
                    toggleSearchMenu={toggleSearchMenu}
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
                />
            </PageContainer>
        </>
    )
});

export default authHoc(UsersContainer);