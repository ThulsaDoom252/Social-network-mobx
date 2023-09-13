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


    const handleUnfollowFriend = (id: number) => {
        friendsStore.unFollowFriend(id).then(() => void 0)
    }

    useEffect(() => {
        friendsStore.getFriends().finally(() => void 0)
        debugger
    }, []);


    if (fetchFriends) {
        return <ClipLoader/>
    }

    return <Friends mobileMode={mobileMode} friends={friends} handleUnfollowFriend={handleUnfollowFriend}/>
});

export default authHoc(FriendsPageContainer);