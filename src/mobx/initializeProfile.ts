import authStore from "./auth/auth"
import profileStore from "./profile"
import {authApi} from "../api/api";

export const initializeProfile = async () => {
    const isAuth = await authApi.checkAuth()
    if (isAuth.resultCode === 0) {
        const {data} = isAuth
        await authStore.setUserData(data.id, data.email, data.login)
        await profileStore.getProfileData(data.id)
        authStore.toggleLoggedStatus(true)
    } else {
        authStore.isLogged ? authStore.toggleLoggedStatus(false) : void 0
    }
}