import {makeAutoObservable} from "mobx";
import {profileApi} from "../api/api";
import profile from "../components/Profile/Profile";
import {ProfileData} from "../types";

class profileStore {
    userId: number = 0
    isAvatarUpdating: boolean = false
    isProfileDataLoaded: boolean = false
    currentUserStatus: string = ''
    currentUserProfileData: Partial<ProfileData> = {};
    profileData: Partial<ProfileData> = {};
    isUserDataUpdating: boolean = false
    isCurrentUserProfileDataLoaded: boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    setCurrentUserProfileData(data: object) {
        this.currentUserProfileData = data
        this.isCurrentUserProfileDataLoaded = true
    }

    setUserId(id: number) {
        this.userId = id
    }

    setProfileData(data: object) {
        this.profileData = data
        // @ts-ignore
        this.isProfileDataLoaded = true
    }

    setCurrentUserStatus(status: string) {
        this.currentUserStatus = status
    }

    toggleIsUserDataUpdating(toggle: boolean) {
        this.isUserDataUpdating = toggle
    }

    toggleIsAvatarUpdating(toggle: boolean) {
        this.isAvatarUpdating = toggle
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

        } else {
            console.log('there was an error updating data...')
        }
        this.toggleIsUserDataUpdating(false)
    }

    async getCurrentUserData(id: string) {
        const responseData = await profileApi.getProfileData(id)
        this.setCurrentUserProfileData(responseData)
        this.setUserId(responseData.userId)
    }

    async getProfileData(id: string) {
        const responseData = await profileApi.getProfileData(id)
        this.setProfileData(responseData)
    }

    async updateAvatar(photo: File | Blob) {
        this.toggleIsAvatarUpdating(true)
        const updateAvatarResponse = await profileApi.updatePhoto(photo)
        if (updateAvatarResponse.data.resultCode === 0) {
            this.setCurrentUserProfileData({
                ...this.currentUserProfileData,
                photos: {
                    ...this.currentUserProfileData.photos,
                    large: updateAvatarResponse.data.data.photos.large
                }
            });
            debugger
        } else {
            console.log('some error occured uploading photo...')
        }
        this.toggleIsAvatarUpdating(false)
    }
}

export default new profileStore()