import React, {useContext, useEffect} from 'react';
import Users from "./Users";
import authHoc from "../../hoc/authHoc";
import usersStore from "../../mobx/users"
import {User} from "../../types";
import {observer} from "mobx-react-lite";
import PageContainer from "../common/PageContainer";
import Paginator from "../Paginator/Paginator";
import SearchMenuCloseOverlay from "../Search/SearchMenuCloseOverlay";
import SearchBar from "../Search/SearchBar";
import {SearchContext} from "../../context/SearchContext";
import appStore from "../../mobx/app"


interface UsersContainerProps {
    smallScreenMode: boolean
    tinyScreenMode: boolean
    isLogged: boolean,
    currentPath: string,
}

const UsersContainer: React.FC<UsersContainerProps> = observer(({
                                                                    smallScreenMode,
                                                                    tinyScreenMode,
                                                                    currentPath,
                                                                }) => {
    const searchContext = useContext(SearchContext)

    const newPage = usersStore.newPage

    const {
        searchResults,
        searchRequest,
        searchMode,
        filterByStatusMode,
        filterByPhotoMode,
        handleItemsPerPage,
        handleFilterByStatusMode,
        handleFilterByPhotoMode,
        isSearchMenuActive,
        setIsSearchMenuActive,
        handleSearchRequest,
        newItemsPerPageValue,
        clearSearchRequest,
        users,
        filteredUsers,
        filterMode
    } = searchContext

    const isUsersLoaded = usersStore.isUsersLoaded
    const usersToShow = filterMode && !searchMode ? filteredUsers : searchMode ? searchResults : users
    const currentPage = usersStore.currentPage
    const itemsPerPage = usersStore.itemsPerPage
    const totalUsersCount = usersStore.totalUserCount
    const noSearchResults = searchMode && usersToShow.length === 0


    useEffect(() => {
        currentPath !== 'users' && appStore.setCurrentPath('users')

        return () => {
            appStore.setCurrentPath('')
        }

    }, []);


    useEffect(() => {
        if (itemsPerPage !== newItemsPerPageValue || currentPage !== newPage) {
            usersStore.getUsers(newItemsPerPageValue, newPage).then(() => void 0)
            usersStore.setItemsPerPage(newItemsPerPageValue)
        }
        // enqueueSnackbar('Users loaded')
    }, [newItemsPerPageValue, newPage]);


    const followUser = (userId: number, user: User) => usersStore.followUser(userId, user)
    const unfollowUser = (userId: number) => usersStore.unfollowUser(userId)


    const followUserHandler = async (isFollowed: boolean, userId: number, user: User) => {
        if (isFollowed) {
            await unfollowUser(userId)
        } else {
            await followUser(userId, user)
        }
    }
    const handleChangePage = (value: number) => {
        usersStore.setNewPage(value)
    }

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
                    usersPerPage={itemsPerPage}
                    handleUsersPerPage={handleItemsPerPage}
                    filterByPhotoMode={filterByPhotoMode}
                    filterByStatusMode={filterByStatusMode}
                    handleFilterByPhotoMode={handleFilterByPhotoMode}
                    handleFilterByStatusMode={handleFilterByStatusMode}
                    isSearchMenuActive={isSearchMenuActive}
                />
                <Paginator
                    currentPage={currentPage}
                    totalItems={totalUsersCount}
                    itemsPerPage={itemsPerPage}
                    handleChangePage={handleChangePage}
                    smallScreenMode={smallScreenMode}
                />
                <Users
                    followUserHandler={followUserHandler}
                    usersToShow={usersToShow}
                    smallScreenMode={smallScreenMode}
                    isUsersLoaded={isUsersLoaded}
                    tinyScreenMode={tinyScreenMode}
                    noSearchResults={noSearchResults}
                />

            </PageContainer>
        </>
    )
});

export default authHoc(UsersContainer);