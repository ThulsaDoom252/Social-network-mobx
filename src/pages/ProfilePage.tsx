import React, {useEffect} from 'react';
import About from "../components/Profile/About";
import Profile from "../components/Profile/Profile";
import FriendsList from "../components/Profile/FriendsList";
import authHoc from "../hoc/authHoc";
import profileStore from "../mobx/profile"
import {ClipLoader} from "react-spinners";
import {Simulate} from "react-dom/test-utils";

interface ProfilePageProps {
    smallScreenMode?: boolean
    isLogged: boolean,
    profileData: any,
    currentUserEmail: string,
    isProfileDataLoaded?: boolean,
    currentUserStatus: string,
    loadedUserId: number,
}

const ProfilePage: React.FC<ProfilePageProps> = ({
                                                     smallScreenMode,
                                                     profileData, currentUserEmail,
                                                     currentUserStatus,
                                                     isProfileDataLoaded,
                                                     loadedUserId,
                                                 }) => {

    useEffect(() => {
        if (loadedUserId !== 0) {
            const loadedUserIdString = loadedUserId.toString()
            profileStore.getProfileData(loadedUserIdString)
        }

    }, [loadedUserId]);

    if (!isProfileDataLoaded) {
        debugger
        return <ClipLoader/>
    }

    const {userId, fullName, aboutMe, isLookingForAJob, lookingForAJobDescription, contacts, photos} = profileData
    const {github, facebook, instagram, twitter, website, youtube} = contacts
    const aboutProps = [userId, lookingForAJobDescription, isLookingForAJob, website, currentUserEmail]
    const profileProps = [github, facebook, instagram, twitter, youtube, aboutMe,
        lookingForAJobDescription, isLookingForAJob, fullName, photos]

    return (
        <>
            {!smallScreenMode && <About aboutProps={aboutProps}/>}
            <Profile smallScreenMode={smallScreenMode} profileProps={profileProps}
                     currentUserStatus={currentUserStatus}/>
            {!smallScreenMode && <FriendsList/>}

        </>
    );
};

export default authHoc(ProfilePage);