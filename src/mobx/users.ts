import {makeAutoObservable} from "mobx";
import {usersApi} from "../api/api";
import {User} from "../types";
import {defaultPhotoFilterMode, defaultStatusFilterMode, withPhoto, withStatus} from "../components/users/filterModes";

class UsersStore {
    usersCount: number = 20
    page: number = 1
    totalUserCount: number = 0
    filterByStatusMode: string = defaultStatusFilterMode
    filterByPhotoMode: string = defaultPhotoFilterMode
    searchMode: boolean = false
    searchRequest: string = ''
    searchResults: [] | User[] = []
    users: [] | User[] = [];
    isUsersLoaded: boolean = false
    fetchingUserIds: number[] = []

    constructor() {
        makeAutoObservable(this)
    }

    setTotalUsersCount(value: number) {
        this.totalUserCount = value
    }

    changeFilterByPhotoMode(value: string) {
        this.filterByPhotoMode = value
    }

    changeFilterByStatusMode(value: string) {
        this.filterByStatusMode = value
    }

    setCurrentPage(value: number) {
        this.page = value
    }

    setUsers(users: any) {
        this.users = users
    }

    setUsersPerPage(value: number) {
        this.usersCount = value
    }

    setSearchRequest(value: string) {
        this.searchRequest = value
    }

    toggleSearchMode(toggle: boolean) {
        this.searchMode = toggle
    }

    searchUsers(request: string) {
        this.searchRequest = request; // Обновляем поле searchRequest
        // @ts-ignore
        this.searchResults = this.users.filter(user => user.name.toLowerCase().includes(request)); // Обновляем searchResults
    }

    toggleUsersIsLoaded(toggle: boolean) {
        this.isUsersLoaded = toggle
    }


    async followUser(userId: number) {
        this.fetchingUserIds.push(userId)
        await usersApi.followUser(userId)
        this.users = this.users.map(user => user.id === userId ? {...user, followed: true} : user)
        this.fetchingUserIds = this.fetchingUserIds.filter(id => id !== userId);
    }

    async unfollowUser(userId: number) {
        this.fetchingUserIds.push(userId)
        await usersApi.unFollowUser(userId)
        this.users = this.users.map(user => user.id === userId ? {...user, followed: false} : user)
        this.fetchingUserIds.filter(id => id !== userId)

    }

    async getUsers(count?: number, page?: number, quarry?: string) {
        this.toggleUsersIsLoaded(false)
        const result = await usersApi.getUsers(count, page, quarry)
        this.setTotalUsersCount(result.totalCount)
        let filteredUsers: User[] = result.items

        if (this.filterByStatusMode !== defaultStatusFilterMode) {
            if (this.filterByStatusMode === withStatus) {
                filteredUsers = filteredUsers.filter((user: User) => user.status)
            } else {
                filteredUsers = filteredUsers.filter((user: User) => !user.status)
            }
        }

        if (this.filterByPhotoMode !== defaultPhotoFilterMode) {
            if (this.filterByPhotoMode === withPhoto) {
                filteredUsers = filteredUsers.filter((user: User) => user.photos.small)
            } else {
                filteredUsers = filteredUsers.filter((user: User) => !user.photos.small)
            }
        }

        this.setUsers(filteredUsers)
        debugger
        this.toggleUsersIsLoaded(true)
    }
}


export default new UsersStore()