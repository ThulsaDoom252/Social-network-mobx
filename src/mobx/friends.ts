import {User} from "../types";
import {makeAutoObservable} from "mobx";
import {usersApi} from "../api/api";

class FriendsStore {
    isFriendsLoaded: boolean = false
    friends: User[] = []

    constructor() {
        makeAutoObservable(this)
    }

    setFriends(friends: []) {
        this.friends = friends
    }

    deleteFriendFromList(friendId: number) {
        this.friends = this.friends.filter(friend => friend.id !== friendId)
    }

    addFriendToList(friend: User) {
        this.friends.push(friend)
    }

    setIsFriendsLoaded(isLoaded: boolean) {
        this.isFriendsLoaded = isLoaded
    }

    async getFriends() {
        await usersApi.getFriends()
            .then((res) => {
                this.setFriends(res.items)
                this.setIsFriendsLoaded(true)
            })
            .catch((e) => {
                alert(e)
            })

    }

    async unFollowFriend(friendId: number) {
        await usersApi.unFollowUser(friendId)
            .then(() => this.deleteFriendFromList(friendId))
            .catch(() => alert('something went wrong'))
    }
}


export default new FriendsStore()