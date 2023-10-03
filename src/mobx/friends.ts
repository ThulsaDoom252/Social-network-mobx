import {User} from "../types";
import {makeAutoObservable} from "mobx";
import {usersApi} from "../api/api";
import appStore from "../mobx/app"

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
        try {
            const response = await usersApi.getFriends()
            this.setFriends(response.items)
            this.setIsFriendsLoaded(true)
        } catch (e) {
            appStore.setApiError(`Error loading friends: ${e}`)
        }
    }
    async unFollowFriend(friendId: number) {
        try {
            await usersApi.unFollowUser(friendId)
            this.deleteFriendFromList(friendId)
        } catch (e) {
            appStore.setApiError(`Error deleting friend from list: ${e}`)
        }
    }
}

export default new FriendsStore()