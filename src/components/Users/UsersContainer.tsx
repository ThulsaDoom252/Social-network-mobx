import React, {useContext, useEffect} from 'react';
import Users from "./Users";
import authHoc from "../../hoc/authHoc";
import usersStore from "../../mobx/users"
import {User} from "../../types";
import {observer} from "mobx-react-lite";
import PageContainer from "../Common/PageContainer";
import Paginator from "../Paginator";
import SearchMenuCloseOverlay from "../Search/SearchMenuCloseOverlay";
import SearchBar from "../Search/SearchBar";
import {SearchContext} from "../../context/SearchContext";
import appStore from "../../mobx/app"

// Props interface for the UsersContainer component
interface UsersContainerProps {
    smallScreenMode: boolean;       // Indicates if in small screen mode
    tinyScreenMode: boolean;        // Indicates if in tiny screen mode
    isLogged: boolean;              // Indicates if the user is logged in
    currentPath: string;            // Current path
}

// UsersContainer component
const UsersContainer: React.FC<UsersContainerProps> = observer(({
                                                                    smallScreenMode,
                                                                    tinyScreenMode,
                                                                    currentPath,
                                                                }) => {
    // Access the SearchContext
    const searchContext = useContext(SearchContext)

    // Extract variables and functions from the SearchContext
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

    // Determine users to display based on search and filter settings
    const isUsersLoaded = usersStore.isUsersLoaded
    const usersToShow = filterMode && !searchMode ? filteredUsers : searchMode ? searchResults : users
    const currentPage = usersStore.currentPage
    const itemsPerPage = usersStore.itemsPerPage
    const totalUsersCount = usersStore.totalUserCount
    const noSearchResults = (searchMode || filterMode) && usersToShow.length === 0

    // Set current path when component mounts
    useEffect(() => {
        currentPath !== 'users' && appStore.setCurrentPath('users')
        return () => {
            appStore.setCurrentPath('')
        }
    }, []);

    // Load users when items per page or page number changes. Maintain loaded page number on new component mount
    useEffect(() => {
        if (itemsPerPage !== newItemsPerPageValue || currentPage !== newPage) {
            debugger
            usersStore.getUsers(newItemsPerPageValue, newPage).then(() => void 0)
            usersStore.setItemsPerPage(newItemsPerPageValue)
        }
    }, [newItemsPerPageValue, newPage]);


    // Toggle follow/unfollow user and update the  store
    const followUserHandler = (isFollowed: boolean, userId: number, user: User) => {
        if (isFollowed) {
            usersStore.unfollowUser(userId).then(() => void 0)
        } else {
            usersStore.followUser(userId, user).then(() => void 0)
        }
    }

    const handleChangePage = (value: number) => {
        usersStore.setNewPage(value)
    }

    return (
        <>
            {/* Display search menu close overlay */}
            {isSearchMenuActive && <SearchMenuCloseOverlay toggleSearchMenu={() => setIsSearchMenuActive(false)}/>}

            {/* Page container */}
            <PageContainer>
                {/* Display the total number of users */}
                <h4 className='w-full text-center font-bold'>Users({usersToShow.length})</h4>

                {/* Search bar component */}
                <SearchBar
                    placeholder={'Search users'}
                    menuType={'users'}
                    isItemsLoaded={isUsersLoaded}
                    isSearchMenuOpen={isSearchMenuActive}
                    toggleSearchMenu={setIsSearchMenuActive}
                    searchRequest={searchRequest}
                    noItems={users.length === 0}
                    clearSearchRequest={clearSearchRequest}
                    handleSearchRequest={handleSearchRequest}
                    usersPerPage={itemsPerPage}
                    handleUsersPerPage={handleItemsPerPage}
                    filterByPhotoMode={filterByPhotoMode}
                    filterByStatusMode={filterByStatusMode}
                    handleFilterByPhotoMode={handleFilterByPhotoMode}
                    handleFilterByStatusMode={handleFilterByStatusMode}
                    isSearchMenuActive={isSearchMenuActive}
                />

                {/* Paginator component */}
                <Paginator
                    currentPage={currentPage}
                    totalItems={totalUsersCount}
                    itemsPerPage={itemsPerPage}
                    handleChangePage={handleChangePage}
                    smallScreenMode={smallScreenMode}
                />

                {/* Users component */}
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
