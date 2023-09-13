import {User} from "../types";
import {makeAutoObservable} from "mobx";
import {usersApi} from "../api/api";

class FriendsStore {
    isFriendsLoaded: boolean = false
    fetchFriends: boolean = false
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

    toggleFetchFriends(toggle: boolean) {
        this.fetchFriends = toggle
    }

    setIsFriendsLoaded(isLoaded: boolean) {
        this.isFriendsLoaded = isLoaded
    }


    async getFriends() {
        this.toggleFetchFriends(true)
        await usersApi.getFriends()
            .then((res) => {
                this.setFriends(res.items)
                this.setIsFriendsLoaded(true)
            })
            .catch((e) => {
                alert(e)

            })
            .finally(() => this.toggleFetchFriends(false))
    }

    async unFollowFriend(friendId: number) {
        await usersApi.unFollowUser(friendId)
            .then(() => this.deleteFriendFromList(friendId))
            .catch(() => alert('something went wrong'))
    }
}


export default new FriendsStore()