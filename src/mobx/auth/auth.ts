import {makeAutoObservable} from "mobx";
import {authApi} from "../../api/api";
import profileStore from "../profile"
import appStore from "../app"
import {delay} from "../../common/commonFuncs";

class AuthStore {
    id: string = ''
    email: string = ''
    login: string = ''
    authErrorText: string = ''
    captchaUrl: string = ''
    isLogged: boolean = false
    isLoggedOutByUser: boolean = false
    fetchAuthData: boolean = false
    isCaptchaRequired: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    setUserData(id: string,
                email: string,
                login: string) {
        this.email = email
        this.id = id
        this.login = login
    }

    setAuthError(text: string) {
        this.authErrorText = text
    }

    setUserId(id: string) {
        this.id = id
    }


    setIsLoggedOutByUser(value: boolean) {
        this.isLoggedOutByUser = value
    }

    setCaptchaUrl(url: string) {
        this.captchaUrl = url
    }

    toggleLoggedStatus(toggle: boolean) {
        this.isLogged = toggle
    }

    toggleAuthDataFetch(toggle: boolean) {
        this.fetchAuthData = toggle
    }

    toggleCaptcha(toggle: boolean) {
        this.isCaptchaRequired = toggle
    }

    async signIn(email: string,
                 password: string,
                 rememberMe?: boolean,
                 captchaSymbols?: 'string') {
        this.toggleAuthDataFetch(true)
        try {
            const result =
                await authApi.signIn(email, password, rememberMe, captchaSymbols)
            if (result.resultCode === 0) {
                if (this.isCaptchaRequired) {
                    this.toggleCaptcha(false)
                    this.setCaptchaUrl('')
                }
                await profileStore.getCurrentUserData(result.data.userId)
                this.setUserId(result.data.userId)
                this.toggleLoggedStatus(true)
                this.setAuthError('')
            } else {
                const errorMessage = result.messages.toString()
                this.setAuthError(errorMessage)
                if (result.resultCode === 10) {
                    const result = await authApi.getCaptcha()
                    this.setCaptchaUrl(result.url)
                    this.toggleCaptcha(true)
                }
            }
        } catch (e) {
            appStore.setApiError(`Sign in error: ${e}`)
        }
        this.toggleAuthDataFetch(false)
    }

    async signOut() {
        try {
            const result = await authApi.signOut()
            if (result.resultCode === 0) {
                this.setIsLoggedOutByUser(true)
                this.toggleLoggedStatus(false)
                profileStore.isCurrentUserProfileDataLoaded && profileStore.clearAllProfileData()
                await delay(2000)
                debugger
                this.setIsLoggedOutByUser(false)
            } else {
                console.error(`Sign out error - ${result}`);
            }
        } catch (e) {
            appStore.setApiError(e)
        }

    }
}

export default new AuthStore()



