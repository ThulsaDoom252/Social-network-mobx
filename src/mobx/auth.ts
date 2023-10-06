import { makeAutoObservable } from "mobx";
import { authApi } from "../api/api";
import profileStore from "./profile";
import appStore from "./app";
import { delay } from "../common/commonFuncs";

// Define the AuthStore class
class AuthStore {
    id: number = 0; // User ID
    email: string = ''; // User email
    login: string = ''; // User login
    authErrorText: string = ''; // Error text for authentication
    captchaUrl: string = ''; // URL for captcha image
    isLogged: boolean = false; // User login status
    isLoggedOutByUser: boolean = false; // Tracks if user logged out manually
    fetchAuthData: boolean = false; // Tracks fetching of authentication data
    isCaptchaRequired: boolean = false; // Tracks if captcha is required

    constructor() {
        // Initialize MobX observables for all properties
        makeAutoObservable(this);
    }

    // Set user data (id, email, login)
    setUserData(id: number, email: string, login: string) {
        this.email = email;
        this.id = id;
        this.login = login;
    }

    // Set the authentication error text
    setAuthError(text: string) {
        this.authErrorText = text;
    }

    // Set the user ID
    setUserId(id: number) {
        this.id = id;
    }

    // Set the flag for user logout
    setIsLoggedOutByUser(value: boolean) {
        this.isLoggedOutByUser = value;
    }

    // Set the captcha URL
    setCaptchaUrl(url: string) {
        this.captchaUrl = url;
    }

    // Toggle the user login status
    toggleLoggedStatus(toggle: boolean) {
        this.isLogged = toggle;
    }

    // Toggle the flag for fetching authentication data
    toggleAuthDataFetch(toggle: boolean) {
        this.fetchAuthData = toggle;
    }

    // Toggle the captcha requirement
    toggleCaptcha(toggle: boolean) {
        this.isCaptchaRequired = toggle;
    }

    // Sign in the user
    async signIn(email: string, password: string, rememberMe?: boolean, captchaSymbols?: string) {
        this.toggleAuthDataFetch(true);
        try {
            const result = await authApi.signIn(email, password, rememberMe, captchaSymbols);
            if (result.resultCode === 0) {
                if (this.isCaptchaRequired) {
                    this.toggleCaptcha(false);
                    this.setCaptchaUrl('');
                }
                await profileStore.getCurrentUserData(result.data.userId);
                this.setUserId(result.data.userId);
                this.toggleLoggedStatus(true);
                this.setAuthError('');
            } else {
                const errorMessage = result.messages.toString();
                this.setAuthError(errorMessage);
                if (result.resultCode === 10) {
                    const captchaResult = await authApi.getCaptcha();
                    this.setCaptchaUrl(captchaResult.url);
                    this.toggleCaptcha(true);
                }
            }
        } catch (e) {
            appStore.setApiError(`Sign in error: ${e}`);
        }
        this.toggleAuthDataFetch(false);
    }

    // Sign out the user
    async signOut() {
        try {
            const result = await authApi.signOut();
            if (result.resultCode === 0) {
                this.setIsLoggedOutByUser(true);
                this.toggleLoggedStatus(false);
                profileStore.isCurrentUserProfileDataLoaded && profileStore.clearAllProfileData();
                await delay(2000);
                this.setIsLoggedOutByUser(false);
            } else {
                console.error(`Sign out error - ${result}`);
            }
        } catch (e) {
            appStore.setApiError(e);
        }
    }
}

// Export a new instance of the AuthStore class
export default new AuthStore();
