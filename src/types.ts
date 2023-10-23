import { type ChangeEvent } from 'react'

// AuthContainer
export type OnFinishFunction = (values: {
  email: string
  password: string
  remember: boolean
  captcha: string
}) => void

export interface AuthField {
  email?: string
  password?: string
  remember?: string
  captcha?: string
}

export interface Contacts {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}

interface Photos {
  large: string
  small: string
}


export interface Routes {
    profileRoute: string,
    rootRoute: string,
    authRoute: string,
    friendsRoute: string,
    usersRoute: string,
    infoRoute: string,
}

export interface ProfileData {
  aboutMe: string
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: Contacts
  photos: Photos
}

export interface User {
  id?: number
  name?: string
  photos: {
    small?: string
    large?: string
  }
  status?: string
  uniqueUrlName?: string
  followed?: boolean
  followRequest?: boolean
}

export type HandleSearchRequestType = (e: ChangeEvent<HTMLInputElement>) => void

