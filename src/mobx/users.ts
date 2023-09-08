import {makeAutoObservable} from "mobx";
import {usersApi} from "../api/api";
import {User} from "../types";

class UsersStore {
    usersCount: number = 10
    page: number = 1
    users: [] | User[] = [];
    isUsersLoaded: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    setUsers(users: any) {
        this.users = users
    }

    toggleUsersIsLoaded(toggle: boolean) {
        this.isUsersLoaded = toggle
    }

    async getUsers(count?: number, page?: number) {
        this.toggleUsersIsLoaded(false)
        const result = await usersApi.getUsers(count, page)
        this.setUsers(result.items)
        this.toggleUsersIsLoaded(true)
        debugger
    }
}


export default new UsersStore()