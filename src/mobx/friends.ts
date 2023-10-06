import { User } from "../types";
import { makeAutoObservable } from "mobx";
import { usersApi } from "../api/api";
import appStore from "../mobx/app";

// Define the FriendsStore class
class FriendsStore {
    isFriendsLoaded: boolean = false;  // Tracks whether friends are loaded
    friends: User[] = [];              // Stores the list of friends

    constructor() {
        // Initialize MobX observables for all properties
        makeAutoObservable(this);
    }

    // Set the list of friends
    setFriends(friends: []) {
        this.friends = friends;
    }

    // Delete a friend from the list by ID
    deleteFriendFromList(friendId: number) {
        this.friends = this.friends.filter(friend => friend.id !== friendId);
    }

    // Add a friend to the list
    addFriendToList(friend: User) {
        this.friends.push(friend);
    }

    // Set the 'isFriendsLoaded' property
    setIsFriendsLoaded(isLoaded: boolean) {
        this.isFriendsLoaded = isLoaded;
    }

    // Asynchronously fetch the list of friends from the API
    async getFriends() {
        try {
            const response = await usersApi.getFriends();
            this.setFriends(response.items);
            this.setIsFriendsLoaded(true);
        } catch (e) {
            appStore.setApiError(`Error loading friends: ${e}`);
        }
    }

    // Asynchronously unfollow a friend by ID
    async unFollowFriend(friendId: number) {
        try {
            await usersApi.unFollowUser(friendId);
            this.deleteFriendFromList(friendId);
        } catch (e) {
            appStore.setApiError(`Error deleting friend from list: ${e}`);
        }
    }
}

// Export a new instance of the FriendsStore class
export default new FriendsStore();
