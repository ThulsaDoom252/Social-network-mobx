import authStore from "./auth/auth"
import profileStore from "./profile"
import appStore from "./app"
import {authApi} from "../api/api";
import friendsStore from "../mobx/friends"

export const initializeCurrentUser = async () => {
    const isLogged = authStore.isLogged
    if (!isLogged) {
        try {
            const isAuthResponse = await authApi.checkAuth()
            if (isAuthResponse.resultCode === 0) {
                const {data} = isAuthResponse
                authStore.setUserData(data.id, data.email, data.login)
                await profileStore.getCurrentUserData(data.id)
                await friendsStore.getFriends()
                authStore.toggleLoggedStatus(true)
            }
        } catch (e) {
            appStore.setApiError(`Authorization check error: ${e}`)
        }
    } else {
        void 0
    }
    appStore.toggleIsInitialized(true)

}