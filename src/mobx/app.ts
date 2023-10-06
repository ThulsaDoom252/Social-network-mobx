import {makeAutoObservable} from "mobx";

// Define the mobx app store class
class AppStore {
    currentPath: string = '';               // Stores the current path
    smallScreen: boolean = false;          // Tracks whether the screen is small
    tinyScreen: boolean = false;           // Tracks whether the screen is tiny
    isEditProfileModalOpen = false;        // Tracks the state of the edit profile modal
    isInitialized: boolean = false;        // Tracks whether the app is initialized
    apiError: any = null;                  // Stores API error information
    successMessage: string | null = null;  // Stores success messages

    constructor() {
        // Initialize MobX observables for all properties
        makeAutoObservable(this);
    }

    // Set the success message
    setSuccessMessage(value: string | null) {
        this.successMessage = value;
    }

    // Set the current path
    setCurrentPath(value: string) {
        this.currentPath = value;
    }

    // Set the API error
    setApiError(value: any) {
        this.apiError = value;
    }

    // Toggle the 'smallScreen' property
    toggleSmallScreen(toggle: boolean) {
        this.smallScreen = toggle;
    }

    // Toggle the 'tinyScreen' property
    toggleTinyScreen(toggle: boolean) {
        this.tinyScreen = toggle;
    }

    // Toggle the 'isInitialized' property
    toggleIsInitialized(toggle: boolean) {
        this.isInitialized = toggle;
    }

    // Toggle the 'isEditProfileModalOpen' property
    toggleIsEditProfileModalOpen(toggle: boolean) {
        this.isEditProfileModalOpen = toggle;
    }
}

// Export a new instance of the application store class
export default new AppStore();
