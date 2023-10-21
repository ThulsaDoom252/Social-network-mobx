import axios from 'axios'
export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})
export const usersApi = {
  getUsers: async (count: number = 10, page: number = 1, querry?: string) => {
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
    return await instance.put('profile/status', { status }).then(response => response.data)
  },

  async updatePhoto (photo: File | Blob) {
    const formData = new FormData()
    formData.append('image', photo)
    return await instance.put('profile/photo/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  async updateUserData (userId: string,
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
    mainLink: string
  ) {
    return await instance.put('/profile', {
      userId,
      lookingForAJob,
      lookingForAJobDescription,
      fullName,
      aboutMe,
      contacts: {
        github, facebook, vk, instagram, twitter, website, youtube, mainLink
      }
    })
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
