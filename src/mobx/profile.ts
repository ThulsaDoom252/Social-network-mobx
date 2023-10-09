import {makeAutoObservable} from "mobx";
import {profileApi} from "../api/api";
import {ProfileData} from "../types";
import appStore from "./app";
import friendsStore from "../mobx/friends";
import {delay} from "../common/commonFuncs";

// Define the profileStore class
class profileStore {
    currentUserProfileData: Partial<ProfileData> = {};  // Stores the current user's profile data
    profileData: Partial<ProfileData> = {};            // Stores viewed profile data
    viewedUserId: number | null = null;                // Stores the ID of the viewed user
    status: string = '';                    // Stores the current user's status
    isCurrentUserProfile: boolean = false;             // Tracks if the profile is of the current user
    isAvatarUpdating: boolean = false;                 // Tracks avatar update status
    isProfileDataLoaded: boolean = false;              // Tracks if profile data is loaded
    isUserFollowed: boolean = false;                   // Tracks if the user of viewed profile is followed
    isCurrentUserDataLoaded: boolean = false;          // Tracks if current user data is loaded
    isStatusLoading: boolean = false;                  // Tracks status loading status
    isUserDataUpdating: boolean = false;               // Tracks user data update status
    isCurrentUserProfileDataLoaded: boolean = false;   // Tracks if current user profile data is loaded
    isStatusModalOpen: boolean = false;                // Tracks status modal open status
    isCurrentProfileUpdated: boolean = false;           // Tracks  current profile update status

    constructor() {
        // Initialize MobX observables for all properties
        makeAutoObservable(this);
    }

    // Set the current user's profile data
    setCurrentUserProfileData(data: object) {
        this.currentUserProfileData = data;
    }

    setIsCurrentProfileUpdated(value: boolean) {
        this.isCurrentProfileUpdated = value
    }

    // Set the viewed user's ID
    setViewedUserId(value: number) {
        this.viewedUserId = value;
    }

    // Set profile data
    setProfileData(data: object) {
        this.profileData = data;
    }

    // Set the  user's status
    setUserStatus(status: string) {
        this.status = status;
    }

    // Set if it's the current user's profile
    setIsCurrentUserProfile(isCurrentProfile: boolean) {
        this.isCurrentUserProfile = isCurrentProfile;
    }

    // Set if the user is followed
    setIsUserFollowed(isFollowed: boolean) {
        this.isUserFollowed = isFollowed;
    }

    // Toggle the status modal
    toggleStatusModal(toggle: boolean) {
        this.isStatusModalOpen = toggle;
    }

    // Toggle if profile data is loaded
    toggleIsProfileDataLoaded(toggle: boolean) {
        this.isProfileDataLoaded = toggle;
    }

    // Toggle if current user data is loaded
    toggleIsCurrentUserDataLoaded(toggle: boolean) {
        this.isCurrentUserDataLoaded = toggle;
    }

    // Toggle status loading status
    toggleIsStatusLoading(toggle: boolean) {
        this.isStatusLoading = toggle;
    }

    // Toggle user data updating status
    toggleIsUserDataUpdating(toggle: boolean) {
        this.isUserDataUpdating = toggle;
    }

    // Toggle avatar updating status
    toggleIsAvatarUpdating(toggle: boolean) {
        this.isAvatarUpdating = toggle;
    }

    // Clear all profile data
    clearAllProfileData() {
        this.isAvatarUpdating = false;
        this.isCurrentUserProfile = false;
        this.isAvatarUpdating = false;
        this.isProfileDataLoaded = false;
        this.isUserFollowed = false;
        this.isCurrentUserDataLoaded = false;
        this.isStatusLoading = false;
        this.status = '';
        this.currentUserProfileData = {};
        this.profileData = {};
        this.isUserDataUpdating = false;
        this.isCurrentUserProfileDataLoaded = false;
        this.isStatusModalOpen = false;
    }

    // Update user data
    async updateUserData(userId: string,
                         aboutMe: string,
                         lookingForAJob: boolean,
                         lookingForAJobDescription: string,
                         fullName: string,
                         github: string,
                         facebook: string,
                         instagram: string,
                         twitter: string,
                         website: string,
                         youtube: string,
                         ) {
        this.toggleIsUserDataUpdating(true);
        try {
            const updateDataResponse = await profileApi.updateUserData(
                userId,
                aboutMe,
                lookingForAJob,
                lookingForAJobDescription,
                fullName,
                github,
                '',
                facebook,
                instagram,
                twitter,
                website,
                youtube,
                ''
            );
            if (updateDataResponse.resultCode === 0) {
                this.setCurrentUserProfileData({
                    ...this.currentUserProfileData,
                    aboutMe,
                    lookingForAJob,
                    lookingForAJobDescription,
                    fullName,
                    contacts: {
                        ...this.currentUserProfileData.contacts,
                        github,
                        facebook,
                        instagram,
                        twitter,
                        website,
                        youtube,
                    },

                });
                this.setIsCurrentProfileUpdated(true)
                await delay(100)
                this.setIsCurrentProfileUpdated(false)
                appStore.setSuccessMessage('Data successfully updated');
            } else {
                console.error(`Update data error - ${updateDataResponse}`);
            }
        } catch (e) {
            appStore.setApiError(e);
        }
        this.toggleIsUserDataUpdating(false);
    }

    // Get current user's data
    async getCurrentUserData(id: number) {
        try {
            const responseData = await profileApi.getProfileData(id);
            const responseStatusData = await profileApi.getStatus(id);
            this.setCurrentUserProfileData(responseData);
            this.setUserStatus(responseStatusData);
            this.setViewedUserId(id);
            this.toggleIsCurrentUserDataLoaded(true);
        } catch (e) {
            appStore.setApiError(`Failed to get current user data, ${e}`);
        }
    }

    // Get profile data for a user by ID
    async getProfileData(id: number) {
        try {
            const responseData = await profileApi.getProfileData(id);
            this.setProfileData(responseData);
            this.setViewedUserId(id);
        } catch (e) {
            appStore.setApiError(`Error getting user data ${e}`);
        }
    }

    // Initialize profile data for a user
    async initializeProfile(id: number) {
        if (this.profileData.userId !== id) {
            this.toggleIsProfileDataLoaded(false);
            try {
                await Promise.all([
                    this.getProfileData(id),
                    this.getUserStatus(id),
                    this.getIsUserFollowedInfo(id),
                ]);
                this.toggleIsProfileDataLoaded(true);
            } catch (e) {
                appStore.setApiError(`Error initializing profile, see console for details`);
            }
        }
    }

    // Get information about whether a user is followed
    async getIsUserFollowedInfo(id: number) {
        this.isUserFollowed && this.setIsUserFollowed(false);
        friendsStore.friends.forEach((friend) => {
            friend.id === id && this.setIsUserFollowed(true);
        });
    }

    // Get the user's status
    async getUserStatus(id: number) {
        this.toggleIsStatusLoading(true);
        try {
            const statusResponseData = await profileApi.getStatus(id);
            this.setUserStatus(statusResponseData);
        } catch (e) {
            console.error(`Error in getting user status ${e}`);
        }
        this.toggleIsStatusLoading(false);
    }

    // Update the user's status
    async updateStatus(status: string) {
        this.toggleIsStatusLoading(true);
        try {
            const response = await profileApi.updateStatus(status);
            if (response.resultCode === 0) {
                this.setUserStatus(status);
                appStore.setSuccessMessage(`Status updated!`);
            } else {
                appStore.setApiError(`Error updating status: ${response}`);
            }
        } catch (e) {
            appStore.setApiError(e);
        }
        this.toggleIsStatusLoading(false);
    }

    // Update the user's avatar
    async updateAvatar(photo: File | Blob) {
        this.toggleIsAvatarUpdating(true);
        try {
            const updateAvatarResponse = await profileApi.updatePhoto(photo);
            if (updateAvatarResponse.data.resultCode === 0) {
                this.setCurrentUserProfileData({
                    ...this.currentUserProfileData,
                    photos: {
                        ...this.currentUserProfileData.photos,
                        large: updateAvatarResponse.data.data.photos.large,
                    },
                });
                appStore.setSuccessMessage(`Avatar updated!`);
            } else {
                console.log('some error occurred uploading photo...');
            }
        } catch (e) {
            appStore.setApiError(`Error updating avatar ${e}`);
        }
        this.toggleIsAvatarUpdating(false);
    }
}

// Export a new instance of the profileStore class
export default new profileStore();
