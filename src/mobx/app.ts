import {makeAutoObservable} from "mobx";

class AppStore {
    smallScreen = false
    tinyScreen = false
    isEditProfileModalOpen = false
    isInitialized = false


    constructor() {
        makeAutoObservable(this)
    }

    toggleSmallScreen(toggle: boolean) {
        this.smallScreen = toggle
    }

    toggleTinyScreen(toggle:boolean) {
        this.tinyScreen = toggle
    }

    toggleIsInitialized(toggle:boolean) {
        this.isInitialized = toggle
    }

    toggleIsEditProfileModalOpen(toggle: boolean) {
        this.isEditProfileModalOpen = toggle
    }

}

export default new AppStore()