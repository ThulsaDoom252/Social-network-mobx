import React, {useContext, useEffect} from 'react';
import friendsStore from "../../mobx/friends"
import authHoc from "../../hoc/authHoc";
import Friends from "../../pages/Friends";
import {observer} from "mobx-react-lite";
import {SearchContext} from "../../context/SearchContext";
import SearchBar from "../search/SearchBar";
import appStore from "../../mobx/app";
import PageContainer from "../common/PageContainer";
import {Button, Tooltip} from 'antd';
import {InfoCircleOutlined, SearchOutlined} from "@ant-design/icons";
import SearchMenuCloseOverlay from "../search/SearchMenuCloseOverlay";


interface FriendsContainerProps {
    mobileMode: boolean,
    isLogged: boolean,
    tinyScreenMode: boolean,
}

const FriendsPageContainer: React.FC<FriendsContainerProps> = observer(({mobileMode, isLogged, tinyScreenMode}) => {
    const searchContext = useContext(SearchContext)

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
    } = searchContext

    const currentPath = appStore.currentPath


    const friends = searchMode ? searchResults : friendsStore.friends
    const isFriendsLoaded = friendsStore.isFriendsLoaded

    const handleUnfollowFriend = (id: number) => {
        friendsStore.unFollowFriend(id).then(() => void 0)
    }

    useEffect(() => {
        currentPath !== 'friends' && appStore.setCurrentPath('friends')
        if (!isFriendsLoaded) {
            friendsStore.getFriends().finally(() => void 0)
        }
    }, []);


    useEffect(() => {
        if (isFriendsLoaded) {
            handleCurrentSortType(currentSortTypeValue)
            debugger
        }
    }, []);

    return (
        <PageContainer>
            {isSearchMenuActive && <SearchMenuCloseOverlay toggleSearchMenu={() => setIsSearchMenuActive(false)}/>}
            {isFriendsLoaded && friends.length !== 0 &&
                <div className={'flex items-center justify-center'}><h4 className='
            font-bold
            '>You have {friends.length} friends</h4>
                    <Tooltip title="Maximum 100">
                        <Button
                            type="default"
                            icon={<InfoCircleOutlined color={'gray'}/>}
                            shape="circle"
                            className={'bg-transparent border-0'}>
                        </Button>
                    </Tooltip>
                </div>}
            <SearchBar
                menuType={'friends'}
                isSearchMenuOpen={isSearchMenuActive}
                toggleSearchMenu={setIsSearchMenuActive}
                searchRequest={searchRequest}
                clearSearchRequest={clearSearchRequest}
                isUsersLoaded={isFriendsLoaded}
                handleSearchRequest={handleSearchRequest}
                usersPerPage={100}
                handleUsersPerPage={handleUsersPerPage}
                filterByPhotoMode={filterByPhotoMode}
                filterByStatusMode={filterByStatusMode}
                handleFilterByPhotoMode={handleFilterByPhotoMode}
                handleFilterByStatusMode={handleFilterByStatusMode}
                isSearchMenuActive={isSearchMenuActive}
                sortByNameValue={sortByNameValue}
                sortByPhotoValue={sortByPhotoValue}
                handleCurrentSortTypeValue={handleCurrentSortType}
            />
            <Friends smallScreen={mobileMode}
                     friends={friends}
                     handleUnfollowFriend={handleUnfollowFriend}
                     isFriendsLoaded={isFriendsLoaded}
                     tinyScreenMode={tinyScreenMode}
            />
        </PageContainer>

    )

});

export default authHoc(FriendsPageContainer);