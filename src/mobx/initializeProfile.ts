import authStore from "./auth/auth"
import profileStore from "./profile"
import appStore from "./app"
import {authApi} from "../api/api";

export const initializeProfile = async () => {
    const isAuthResponse = await authApi.checkAuth()
    if (isAuthResponse.resultCode === 0) {
        const {data} = isAuthResponse
        await authStore.setUserData(data.id, data.email, data.login)
        const currentUserDataResponse = await profileStore.getCurrentUserData(data.id)
        // // @ts-ignore
        // const userId = profileData?.userId
        // const userStatus = await profileApi.getUserStatus(userId)
        // profileStore.setCurrentUserStatus(userStatus.toString())
        authStore.toggleLoggedStatus(true)
    } else {
        authStore.isLogged ? authStore.toggleLoggedStatus(false) : void 0
    }
    appStore.toggleIsInitialized(true)
}