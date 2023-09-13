import React, {useEffect} from 'react';
import friendsStore from "../../mobx/friends"
import authHoc from "../../hoc/authHoc";
import Friends from "../../pages/Friends";
import {ClipLoader} from "react-spinners";
import {observer} from "mobx-react-lite";


interface FriendsContainerProps {
    mobileMode: boolean,
    isLogged: boolean,
}

const FriendsPageContainer: React.FC<FriendsContainerProps> = observer(({mobileMode, isLogged}) => {

    const friends = friendsStore.friends
    const fetchFriends = friendsStore.fetchFriends
    const isFriendsLoaded = friendsStore.isFriendsLoaded

    const handleUnfollowFriend = (id: number) => {
        friendsStore.unFollowFriend(id).then(() => void 0)
    }

    useEffect(() => {
        if (!isFriendsLoaded) {
            friendsStore.getFriends().finally(() => void 0)
        }
    }, []);

    if (fetchFriends) {
        return <ClipLoader/>
    }

    return <Friends smallScreen={mobileMode}
                    friends={friends}
                    handleUnfollowFriend={handleUnfollowFriend}
                    isFriendsLoaded={isFriendsLoaded}
    />
});

export default authHoc(FriendsPageContainer);