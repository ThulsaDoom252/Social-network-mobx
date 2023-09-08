type Contacts = {
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
    followed?: false;
};