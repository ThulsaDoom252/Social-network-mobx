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

    async getUsers(count?: number, page?: number, quarry?: string) {
        this.toggleUsersIsLoaded(false)
        const result = await usersApi.getUsers(count, page, quarry)
        this.setTotalUsersCount(result.totalCount)
        let filteredUsers: User[] = result.items

        if (this.filterByStatusMode !== defaultStatusFilterMode) {
            debugger
            if (this.filterByStatusMode === withStatus) {
                debugger
                filteredUsers = filteredUsers.filter((user: User) => user.status)
            } else {
                debugger
                filteredUsers = filteredUsers.filter((user: User) => !user.status)
            }
        }

        if (this.filterByPhotoMode !== defaultPhotoFilterMode) {
            debugger
            if (this.filterByPhotoMode === withPhoto) {
                debugger
                filteredUsers = filteredUsers.filter((user: User) => user.photos.small)
            } else {
                debugger
                filteredUsers = filteredUsers.filter((user: User) => !user.photos.small)
            }
        }

        this.setUsers(filteredUsers)
        debugger
        this.toggleUsersIsLoaded(true)
    }
}


export default new UsersStore()