import {makeAutoObservable} from "mobx";

class AppStore {
    smallScreen = false
    isEditProfileModalOpen = false


    constructor() {
        makeAutoObservable(this)
    }

    toggleSmallScreen(toggle:boolean) {
        this.smallScreen = toggle
    }

    toggleIsEditProfileModalOpen(toggle:boolean) {
        this.isEditProfileModalOpen = toggle
    }

}

export default new AppStore()