import {makeAutoObservable} from "mobx";
import {profileApi, usersApi} from "../api/api";
import {ProfileData} from "../types";
import appStore from "./app"

class profileStore {
    currentUserId: number = 0
    currentUserProfileData: Partial<ProfileData> = {};
    profileData: Partial<ProfileData> = {};
    currentUserStatus: string = ''
    isCurrentUserProfile: boolean = false
    isAvatarUpdating: boolean = false
    isProfileDataLoaded: boolean = false
    isUserFollowed: boolean = false
    isCurrentUserDataLoaded: boolean = false
    isStatusLoading: boolean = false
    isUserDataUpdating: boolean = false
    isCurrentUserProfileDataLoaded: boolean = false
    isStatusModalOpen: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    setUserId(id: number) {
        this.currentUserId = id
    }

    setCurrentUserProfileData(data: object) {
        this.currentUserProfileData = data
    }

    setProfileData(data: object) {
        this.profileData = data
    }

    setCurrentUserStatus(status: string) {
        this.currentUserStatus = status
    }

    setIsCurrentUserProfile(isCurrentProfile: boolean) {
        this.isCurrentUserProfile = isCurrentProfile
    }

    setIsUserFollowed(isFollowed: boolean) {
        this.isUserFollowed = isFollowed
    }

    toggleStatusModal(toggle: boolean) {
        this.isStatusModalOpen = toggle
    }

    toggleIsProfileDataLoaded(toggle: boolean) {
        this.isProfileDataLoaded = toggle
    }

    toggleIsCurrentUserDataLoaded(toggle: boolean) {
        this.isCurrentUserDataLoaded = toggle
    }

    toggleIsStatusLoading(toggle: boolean) {
        this.isStatusLoading = toggle
    }

    toggleIsUserDataUpdating(toggle: boolean) {
        this.isUserDataUpdating = toggle
    }

    toggleIsAvatarUpdating(toggle: boolean) {
        this.isAvatarUpdating = toggle
    }

    clearAllProfileData() {
        this.currentUserId = 0
        this.isAvatarUpdating = false
        this.isCurrentUserProfile = false
        this.isAvatarUpdating = false
        this.isProfileDataLoaded = false
        this.isUserFollowed = false
        this.isCurrentUserDataLoaded = false
        this.isStatusLoading = false
        this.currentUserStatus = ''
        this.currentUserProfileData = {};
        this.profileData = {};
        this.isUserDataUpdating = false
        this.isCurrentUserProfileDataLoaded = false
        this.isStatusModalOpen = false
    }

    async updateUserData(userId: string,
                         aboutMe: string,
                         lookingForAJob: boolean,
                         lookingForAJobDescription: string,
                         fullName: string,
                         github: string,
                         vk: string,
                         facebook: string,
                         instagram: string,
                         twitter: string,
                         website: string,
                         youtube: string,
                         mainLink: string,) {
        this.toggleIsUserDataUpdating(true)
        try {
            const updateDataResponse = await profileApi.updateUserData(
                userId,
                aboutMe,
                lookingForAJob,
                lookingForAJobDescription,
                fullName,
                github,
                vk,
                facebook,
                instagram,
                twitter,
                website,
                youtube,
                mainLink)
            if (updateDataResponse.resultCode === 0) {
                this.setCurrentUserProfileData({
                    ...this.currentUserProfileData,
                    aboutMe, lookingForAJob,
                    lookingForAJobDescription,
                    fullName, github, vk, facebook, instagram, twitter,
                    website, youtube, mainLink
                })
                appStore.setSuccessMessage('Data successfully updated')

            } else {
                console.error(`Update data error - ${updateDataResponse}`)
            }
        } catch (e) {
            appStore.setApiError(e)
        }

        this.toggleIsUserDataUpdating(false)
    }

    async getCurrentUserData(id: number) {
        try {
            const responseData = await profileApi.getProfileData(id)
            const responseStatusData = await profileApi.getStatus(id)
            this.setCurrentUserProfileData(responseData)
            this.setCurrentUserStatus(responseStatusData)
            this.setUserId(responseData.userId)
            this.toggleIsCurrentUserDataLoaded(true)
        } catch (e) {
            appStore.setApiError(`Failed to get current user data, ${e}`)
        }
    }

    async getProfileData(id: number,) {
        try {
            const responseData = await profileApi.getProfileData(id)
            this.setProfileData(responseData)
        } catch (e) {
            appStore.setApiError(`Error getting user data ${e}`)
        }
    }

    async initializeProfile(id: number) {
        this.toggleIsProfileDataLoaded(false)
        try {
            await Promise.all([
                this.getProfileData(id),
                this.getUserStatus(id),
                this.getIsUserFollowedInfo(id)
            ]);
            this.toggleIsProfileDataLoaded(true)
        } catch (e) {
            appStore.setApiError(`Error initializing profile, see console for details`)
        }
    }

    async getIsUserFollowedInfo(id: number) {
        try {
            const isFollowedResponse = await usersApi.getIsUserFollowedInfo(id)
            this.setIsUserFollowed(isFollowedResponse)
        } catch (e) {
            console.error(`Error getting isUserFollowed info ${e}`)
        }
    }

    async getUserStatus(id: number) {
        this.toggleIsStatusLoading(true)
        try {
            const statusResponseData = await profileApi.getStatus(id)
            this.setCurrentUserStatus(statusResponseData)
        } catch (e) {
            console.error(`Error in getting user status ${e}`)
        }

        this.toggleIsStatusLoading(false)
    }

    async updateStatus(status: string) {
        this.toggleIsStatusLoading(true)
        try {
            const response = await profileApi.updateStatus(status)
            if (response.resultCode === 0) {
                this.setCurrentUserStatus(status)
                appStore.setSuccessMessage(`Status updated!`)
            } else {
                appStore.setApiError(`Error updating status: ${response}`)
            }
        } catch (e) {
            appStore.setApiError(e)
        }
        this.toggleIsStatusLoading(false)
    }

    async updateAvatar(photo: File | Blob) {
        this.toggleIsAvatarUpdating(true)
        try {
            const updateAvatarResponse = await profileApi.updatePhoto(photo)
            if (updateAvatarResponse.data.resultCode === 0) {
                this.setCurrentUserProfileData({
                    ...this.currentUserProfileData,
                    photos: {
                        ...this.currentUserProfileData.photos,
                        large: updateAvatarResponse.data.data.photos.large
                    }
                });
                appStore.setSuccessMessage(`Avatar updated!`)
            } else {
                console.log('some error occurred uploading photo...')
            }

        } catch (e) {
            appStore.setApiError(`Error updating avatar ${e}`)
        }
        this.toggleIsAvatarUpdating(false)
    }
}

export default new profileStore()