import axios from 'axios'
import {appConfig} from "../config/config";
import {IUpdateProfileDataParams} from "../types";

export const instance = axios.create({
    withCredentials: true,
    baseURL: appConfig.baseUrl,
})

export const usersApi = {
    //toDo: add query param to search users by name
    getUsers: async (count: number = 10, page: number = 1) => {
        return await instance.get(`users?page=${page}&count=${count}`)
            .then(response => response.data)
    },

    getFriends: async (count: number = 100) => {
        return await instance.get(`users?friend=true&count=${count}`)
            .then(response => response.data)
    },

    followUser: async (userId: number) => {
        return await instance.post(`follow/${userId}`, {})
            .then(response => response.data)
    },

    unFollowUser: async (userId: number) => {
        return await instance.delete(`follow/${userId}`)
            .then(response => response.data)
    }
}

export const profileApi = {
    getProfileData: async (id: number) => {
        return await instance.get(`profile/${id}`)
            .then(response => response.data)
    },

    getStatus: async (id: number) => {
        return await instance.get(`/profile/status/${id}`).then(response => response.data)
    },

    updateStatus: async (status: string) => {
        return await instance.put('profile/status', {status}).then(response => response.data)
    },

    updatePhoto: async (photo: File | Blob) => {
        const formData = new FormData()
        formData.append('image', photo)
        return await instance.put('profile/photo/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },

    updateUserData: async (data: IUpdateProfileDataParams
    ) => {
        return await instance.put('/profile', data)
            .then(response => response.data)
    }
}

export const authApi = {
    checkAuth: async () => {
        return await instance.get('auth/me')
            .then(response => {
                return response.data
            })
    },

    signIn: async (email: string, password: string, rememberMe?: boolean, captchaSymbols?: string) => {
        return await instance.post('auth/login', {
            email, password, rememberMe, captcha: captchaSymbols
        })
            .then(response => response.data)
    },

    signOut: async () => {
        return await instance.delete('auth/login/')
            .then(response => {
                return response.data
            })
    },

    getCaptcha: async () => {
        return await instance.get('security/get-captcha-url')
            .then(response => {
                return response.data
            })
    }
}
