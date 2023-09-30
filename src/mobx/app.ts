import {makeAutoObservable} from "mobx";

class AppStore {
    currentPath: string = ''
    smallScreen = false
    tinyScreen = false
    isEditProfileModalOpen = false
    isInitialized = false


    constructor() {
        makeAutoObservable(this)
    }

    setCurrentPath(value:string) {
        this.currentPath = value
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