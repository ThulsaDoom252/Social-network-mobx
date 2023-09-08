import {makeAutoObservable} from "mobx";
import {authApi} from "../../api/api";

class AuthStore {
    isLogged: boolean = false
    id:string = ''
    email:string = ''
    login:string = ''
    fetchAuthData:boolean = false
    authErrorText:string= ''
    isCaptchaRequired:boolean = false
    captchaUrl:string = ''
    constructor() {
        makeAutoObservable(this)
    }
    toggleLoggedStatus(toggle:boolean) {
        this.isLogged = toggle
    }
    setUserData(id:string,
                email:string,
                login:string) {
        this.email = email
        this.id = id
        this.login = login
    }

    toggleAuthDataFetch(toggle:boolean) {
        this.fetchAuthData = toggle
    }
    toggleAuthErrorText(text:string) {
        this.authErrorText = text
    }
    toggleCaptcha(toggle: boolean) {
        this.isCaptchaRequired = true
    }
    setCaptchaUrl(url: string) {
        this.captchaUrl = url
    }
    async signIn(email:string,
                 password:string,
                 rememberMe?: boolean,
                 captchaSymbols?: 'string') {
        this.toggleAuthDataFetch(true)
        const result =
            await authApi.signIn(email, password, rememberMe, captchaSymbols)
        if (result.resultCode === 0) {
            if (this.isCaptchaRequired) {
                this.toggleCaptcha(false)
                this.setCaptchaUrl('')
            }

            this.toggleLoggedStatus(true)
        } else {
            const errorMessage = result.messages.toString()
            this.toggleAuthErrorText(errorMessage)
            if (result.resultCode === 10) {
                const result = await authApi.getCaptcha()
                this.setCaptchaUrl(result.url)
                this.toggleCaptcha(true)
            }

        }
        this.toggleAuthDataFetch(false)
    }

    async signOut() {
        const result = await authApi.signOut()
        if (result.resultCode === 0) {
            this.toggleLoggedStatus(false)
        } else {
            console.log('there was an error during sign out');
        }
    }
}

export default new AuthStore()



