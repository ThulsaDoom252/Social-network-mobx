import {makeAutoObservable} from "mobx";
import {profileApi} from "../api/api";

class profileStore {
    profileData: {
        userId?: number,
        lookingForAJob?: boolean,
        lookingForAJobDescription?: string,
        aboutMe?: string,
        fullName?: string,
        contacts?: {
            github?: string
            vk?: string
            facebook?: string
            instagram?: string
            twitter?: string
            website?: string
            youtube?: string
            mainLink?: string
        },
        photos?: {
            small?: string,
            large?: string,
        }
    } = {};
    currentUserAvatar = ''


    constructor() {
        makeAutoObservable(this)
    }

    setProfileData(data: object) {
        this.profileData = data
        // @ts-ignore
        this.setUserPhoto(data?.photos.large)
    }

    setUserPhoto(url: string) {
        this.currentUserAvatar = url
    }

    async getProfileData(id: string) {
        const result = await profileApi.getProfileData(id)
        this.setProfileData(result)
    }

    async updateAvatar(photo: File | Blob) {
        const result = await profileApi.updatePhoto(photo)
        if (result.data.resultCode === 0) {
            this.setUserPhoto(result.data.data.photos.large)
            debugger
        } else {
            console.log('some error occured uploading photo...')
        }
    }
}

export default new profileStore()