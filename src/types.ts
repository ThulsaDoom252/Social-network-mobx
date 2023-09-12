import {ChangeEvent} from "react";
import {
    defaultPhotoFilterMode,
    defaultStatusFilterMode,
    withoutPhoto,
    withoutStatus,
    withPhoto,
    withStatus
} from "./components/users/filterModes";

export type Contacts = {
    github: string;
    vk: string;
    facebook: string;
    instagram: string;
    twitter: string;
    website: string;
    youtube: string;
    mainLink: string;
};

type Photos = {
    large: string;
    small: string;
}

// Определение типа для данных профиля
export type ProfileData = {
    aboutMe: string,
    userId: number;
    lookingForAJob: boolean;
    lookingForAJobDescription: string;
    fullName: string;
    contacts: Contacts;
    photos: Photos
};


export type User = {
    id?: number;
    name?: string;
    photos: {
        small?: string;
        large?: string;
    };
    status?: string;
    uniqueUrlName?: string;
    followed?: boolean;
};

export type HandleSearchRequestType = (e: ChangeEvent<HTMLInputElement>) => void;

export type FilterStatusModeTypes = typeof withStatus | typeof withoutStatus | typeof defaultStatusFilterMode;

export type FilterPhotoModeTypes = typeof  withPhoto | typeof withoutPhoto | typeof defaultPhotoFilterMode