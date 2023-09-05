import {observable, action, makeAutoObservable, autorun} from "mobx";

class AuthStore {
    isLogged: boolean = true
    id = ''
    email = ''

    constructor() {
        makeAutoObservable(this)
    }

    toggleLoggedStatus(toggle: boolean) {
        debugger
        this.isLogged = toggle
        console.log(this.isLogged)
    }

    setUserData(id: string,
                email: string) {
        this.email = email
        this.id = id
    }
}

export default new AuthStore()



