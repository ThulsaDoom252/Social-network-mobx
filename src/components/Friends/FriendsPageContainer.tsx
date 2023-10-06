import React, { useContext, useEffect } from 'react';
import friendsStore from "../../mobx/friends";
import authHoc from "../../hoc/authHoc";
import Friends from "./Friends";
import { observer } from "mobx-react-lite";
import { SearchContext } from "../../context/SearchContext";
import SearchBar from "../Search/SearchBar";
import PageContainer from "../Common/PageContainer";
import { Button, Tooltip } from 'antd';
import { InfoCircleOutlined } from "@ant-design/icons";
import SearchMenuCloseOverlay from "../Search/SearchMenuCloseOverlay";
import appStore from "../../mobx/app";

// Props interface for the FriendsPageContainer component
interface FriendsContainerProps {
    mobileMode: boolean;        // Flag for mobile mode
    isLogged: boolean;          // Flag indicating if the user is logged in. Needed for AuthHook
    tinyScreenMode: boolean;    // Flag for tiny screen mode
    currentPath: string;        // Current path
}

const FriendsPageContainer: React.FC<FriendsContainerProps> = observer(({
                                                                            mobileMode,
                                                                            tinyScreenMode,
                                                                            currentPath }) => {
    const searchContext = useContext(SearchContext);

    // Destructuring properties from the SearchContext
    const {
        searchResults,
        searchRequest,
        searchMode,
        filterByStatusMode,
        filterByPhotoMode,
        currentSortTypeValue,
        handleItemsPerPage,
        handleFilterByStatusMode,
        handleFilterByPhotoMode,
        isSearchMenuActive,
        setIsSearchMenuActive,
        handleSearchRequest,
        clearSearchRequest,
        sortByNameValue,
        sortByPhotoValue,
        handleCurrentSortType,
    } = searchContext;

    // Determine which set of friends to display based on search mode
    const friendsToShow = searchMode ? searchResults : friendsStore.friends;
    const isFriendsLoaded = friendsStore.isFriendsLoaded;

    // Check if there are no friends in the list
    const noFriends = isFriendsLoaded && !searchMode && friendsToShow.length === 0;
    // Check if there are no friends matching search request
    const noFriendsSearchResults = searchMode && friendsToShow.length === 0;

    // Set the current path in mobx app store when the component mounts
    useEffect(() => {
        currentPath !== 'friends' && appStore.setCurrentPath('friends');
        // Clean up by resetting the current path when the component unmounts
        return () => {
            appStore.setCurrentPath('');
        }
    }, []);

    // Initialize the sort type when friends are loaded
    useEffect(() => {
        if (isFriendsLoaded) {
            handleCurrentSortType(currentSortTypeValue);
        }
    }, []);

    // Handle unfollowing a friend
    const handleUnfollowFriend = (id: number) => {
        friendsStore.unFollowFriend(id).then(() => void 0);
    }

    return (
        <PageContainer>
            {/* Display search menu close overlay if active */}
            {isSearchMenuActive && <SearchMenuCloseOverlay toggleSearchMenu={() => setIsSearchMenuActive(false)} />}

            {/* Display the number of friends if available */}
            {isFriendsLoaded && friendsToShow.length !== 0 &&
                <div className={'flex items-center justify-center'}>
                    <h4 className='font-bold'>You have {friendsToShow.length} friends</h4>
                    <Tooltip title="Maximum 100">
                        <Button
                            type="default"
                            icon={<InfoCircleOutlined color={'gray'} />}
                            shape="circle"
                            className={'bg-transparent border-0'}
                        >
                        </Button>
                    </Tooltip>
                </div>}

            {/* Display the search bar */}
            <SearchBar
                menuType={'friends'}
                isItemsLoaded={isFriendsLoaded}
                isSearchMenuOpen={isSearchMenuActive}
                toggleSearchMenu={setIsSearchMenuActive}
                searchRequest={searchRequest}
                clearSearchRequest={clearSearchRequest}
                handleSearchRequest={handleSearchRequest}
                usersPerPage={100}
                handleUsersPerPage={handleItemsPerPage}
                filterByPhotoMode={filterByPhotoMode}
                filterByStatusMode={filterByStatusMode}
                handleFilterByPhotoMode={handleFilterByPhotoMode}
                handleFilterByStatusMode={handleFilterByStatusMode}
                isSearchMenuActive={isSearchMenuActive}
                sortByNameValue={sortByNameValue}
                sortByPhotoValue={sortByPhotoValue}
                handleCurrentSortTypeValue={handleCurrentSortType}
            />

            {/* Display the Friends component */}
            <Friends
                smallScreen={mobileMode}
                friends={friendsToShow}
                handleUnfollowFriend={handleUnfollowFriend}
                isFriendsLoaded={isFriendsLoaded}
                tinyScreenMode={tinyScreenMode}
                noFriends={noFriends}
                noFriendsSearchResults={noFriendsSearchResults}
            />
        </PageContainer>
    );
});

export default authHoc(FriendsPageContainer);
