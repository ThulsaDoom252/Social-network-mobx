import {makeAutoObservable} from "mobx"

class AppStore {
    currentPath: string = ''
    smallScreen: boolean = false
    tinyScreen: boolean = false
    isEditProfileModalOpen = false
    isInitialized: boolean = false
    apiError: any = null
    successMessage: string | null = null

    constructor() {
        makeAutoObservable(this)
    }

    setSuccessMessage(value: string | null) {
        this.successMessage = value
    }

    setCurrentPath(value: string) {
        this.currentPath = value
    }

    setApiError(value: any) {
        this.apiError = value
    }

    toggleSmallScreen(toggle: boolean) {
        this.smallScreen = toggle
    }

    toggleTinyScreen(toggle: boolean) {
        this.tinyScreen = toggle
    }

    toggleIsInitialized(toggle: boolean) {
        this.isInitialized = toggle
    }

    toggleIsEditProfileModalOpen(toggle: boolean) {
        this.isEditProfileModalOpen = toggle
    }

}

export default new AppStore()