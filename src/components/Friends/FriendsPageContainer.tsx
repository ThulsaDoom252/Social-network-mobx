import React, {useContext, useEffect} from 'react';
import friendsStore from "../../mobx/friends"
import authHoc from "../../hoc/authHoc";
import Friends from "./Friends";
import {observer} from "mobx-react-lite";
import {SearchContext} from "../../context/SearchContext";
import SearchBar from "../Search/SearchBar";
import PageContainer from "../common/PageContainer";
import {Button, Tooltip} from 'antd';
import {InfoCircleOutlined} from "@ant-design/icons";
import SearchMenuCloseOverlay from "../Search/SearchMenuCloseOverlay";
import appStore from "../../mobx/app"


interface FriendsContainerProps {
    mobileMode: boolean,
    isLogged: boolean,
    tinyScreenMode: boolean,
    currentPath:string,
}

const FriendsPageContainer: React.FC<FriendsContainerProps> = observer(({mobileMode, isLogged, tinyScreenMode, currentPath}) => {
    const searchContext = useContext(SearchContext)

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
    } = searchContext


    const friendsToShow = searchMode ? searchResults : friendsStore.friends
    const isFriendsLoaded = friendsStore.isFriendsLoaded

    const handleUnfollowFriend = (id: number) => {
        friendsStore.unFollowFriend(id).then(() => void 0)
    }

    useEffect(() => {
        currentPath !== 'friends' && appStore.setCurrentPath('friends')

        return () => {
            appStore.setCurrentPath('')
        }

    }, []);


    useEffect(() => {
        if (isFriendsLoaded) {
            handleCurrentSortType(currentSortTypeValue)
        }
    }, []);

    return (
        <PageContainer>
            {isSearchMenuActive && <SearchMenuCloseOverlay toggleSearchMenu={() => setIsSearchMenuActive(false)}/>}
            {isFriendsLoaded && friendsToShow.length !== 0 &&
                <div className={'flex items-center justify-center'}><h4 className='
            font-bold
            '>You have {friendsToShow.length} friends</h4>
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
            <Friends smallScreen={mobileMode}
                     friends={friendsToShow}
                     handleUnfollowFriend={handleUnfollowFriend}
                     isFriendsLoaded={isFriendsLoaded}
                     tinyScreenMode={tinyScreenMode}
            />
        </PageContainer>

    )

});

export default authHoc(FriendsPageContainer);