import authStore from './auth'
import profileStore from './profile'
import appStore from './app'
import { authApi } from '../api/api'
import friendsStore from '../mobx/friends'

// Function to initialize the current user
export const initializeCurrentUser = async () => {
  // Check if the user is already logged in
  const isLogged = authStore.isLogged
  if (!isLogged) {
    try {
      // Check if the user is authenticated via API call
      const isAuthResponse = await authApi.checkAuth()
      if (isAuthResponse.resultCode === 0) {
        // If authenticated, retrieve user data and friends
        const { data } = isAuthResponse
        authStore.setUserData(data.id, data.email, data.login)
        await profileStore.getCurrentUserData(data.id)
        await friendsStore.getFriends()
        authStore.toggleLoggedStatus(true)
      }
    } catch (e) {
      // Handle authorization check error
      appStore.setApiError(`Authorization check error: ${e}`)
    }
  }

  // Mark the app as initialized
  appStore.toggleIsInitialized(true)
}
