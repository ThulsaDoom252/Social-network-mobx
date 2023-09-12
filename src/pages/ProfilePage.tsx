import React, {useEffect} from 'react';
import About from "../components/Profile/About";
import Profile from "../components/Profile/Profile";
import FriendsList from "../components/Profile/FriendsList";
import authHoc from "../hoc/authHoc";
import profileStore from "../mobx/profile"
import {ProfileData} from "../types";
import {useParams} from "react-router-dom";

interface ProfilePageProps {
    smallScreenMode?: boolean
    isLogged: boolean,
    profileData: Partial<ProfileData>,
    currentUserEmail: string,
    isProfileDataLoaded: boolean,
    currentUserStatus: string,
    currentUserId: string,
}

const ProfilePage: React.FC<ProfilePageProps> = ({
                                                     smallScreenMode,
                                                     currentUserId,
                                                     profileData, currentUserEmail,
                                                     currentUserStatus, isProfileDataLoaded,

                                                 }) => {

    const {userid} = useParams();

    //Is current user check
    const isCurrentUser = currentUserId.toString() === userid


    useEffect(() => {
        if (userid) {
            profileStore.initializeProfile(userid).then(() => void 0)
        }

    }, [userid]);

    // if (!isProfileDataLoaded) {
    //     return <ClipLoader/>
    // }

    const {
        userId,
        fullName,
        aboutMe,
        lookingForAJob,
        lookingForAJobDescription,
        contacts,
        photos
    } = profileData as ProfileData || {}
    const {github, facebook, instagram, twitter, website, youtube} = contacts || {}
    const aboutProps = [userId, lookingForAJobDescription, lookingForAJob, website, currentUserEmail,
        isCurrentUser, isProfileDataLoaded]
    const profileProps = [github, facebook, instagram, twitter, youtube, aboutMe,
        lookingForAJobDescription, lookingForAJob, fullName, photos]

    return (
        <>
            {!smallScreenMode && <About aboutProps={aboutProps}/>}
            <Profile smallScreenMode={smallScreenMode}
                     profileProps={profileProps}
                     currentUserStatus={currentUserStatus}
                     isProfileDataLoaded={isProfileDataLoaded}/>
            {!smallScreenMode && <FriendsList/>}

        </>
    );
};

export default authHoc(ProfilePage);