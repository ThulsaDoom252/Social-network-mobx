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

    constructor() {
        makeAutoObservable(this)
    }

    setProfileData(data: object) {
        this.profileData = data
    }

    async getProfileData(id: string) {
        const result = await profileApi.getProfileData(id)
        this.setProfileData(result)
    }
}


export default new profileStore()


// userId: required(integer)
// lookingForAJob: required(boolean)
// lookingForAJobDescription: required(string)
// fullName: required(string)
// contacts: required(object)
// github: required(string)
// vk: required(string)
// facebook: required(string)
// instagram: required(string)
// twitter: required(string)
// website: required(string)
// youtube: required(string)
// mainLink: required(string)
// photos: required(object)
// small: (string)
// URL address of user photo (small size) (null if photo is not uploaded to the server)
//
// large: (string)
// URL address of user pho