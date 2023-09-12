import axios from "axios";

export const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
});


export const usersApi = {
    getUsers: (count: number = 10, page: number = 1, querry?: string) => {
        return instance.get(`users?page=${page}&count=${count}`).then(response => response.data)
    }
}

export const profileApi = {
    getProfileData: (id: string) => {
        return instance.get(`profile/${id}`)
            .then(response => response.data)
    },
    getUserStatus: (id: string) => {
        return instance.get(`/profile/status/${id}`).then(response => response.data)
    },
    updatePhoto(photo: File | Blob) {
        const formData = new FormData();
        formData.append("image", photo);
        return instance.put("profile/photo/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    updateUserData(userId: string,
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
                   mainLink: string,
    ) {

        return instance.put("/profile", {
            userId, lookingForAJob, lookingForAJobDescription, fullName, aboutMe, contacts: {
                github, facebook, vk, instagram, twitter, website, youtube, mainLink
            }
        }).then(response => response.data)
    },


}


export const authApi = {
    checkAuth: () => {
        return instance.get("auth/me").then(response => {
            return response.data;
        });
    },
    signIn: (email: string, password: string, rememberMe?: boolean, captchaSymbols?: string) => {
        return instance.post("auth/login", {
            email, password, rememberMe, captcha: captchaSymbols
        }).then(response => response.data)
    },
    signOut: () => {
        return instance.delete("auth/login/").then(response => {
            return response.data;
        });
    },
    getCaptcha: () => {
        return instance.get("security/get-captcha-url").then(response => {
            return response.data
        })
    }
}
