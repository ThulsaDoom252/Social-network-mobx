import {User} from "../types";
import {makeAutoObservable} from "mobx";
import {usersApi} from "../api/api";

class FriendsStore {
    fetchFriends: boolean = false
    friends: User[] = []

    constructor() {
        makeAutoObservable(this)
    }

    setFriends(friends: []) {
        this.friends = friends
    }

    filterFriends(friendId: number) {
        this.friends = this.friends.filter(friend => friend.id !== friendId)
    }

    toggleFetchFriends(toggle: boolean) {
        this.fetchFriends = toggle
    }


    async getFriends() {
        this.toggleFetchFriends(true)
        await usersApi.getFriends()
            .then((res) => {
                console.log(res)
                this.setFriends(res.items)
            })
            .catch((e) => {
                alert(e)
                console.log(e)

            })
            .finally(() => this.toggleFetchFriends(false))
    }

    async unFollowFriend(friendId: number) {
        await usersApi.unFollowUser(friendId)
            .then(() => this.filterFriends(friendId))
            .catch(() => alert('something went wrong'))
    }
}


export default new FriendsStore()