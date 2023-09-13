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

    const isUserFollowed = profileStore.isUserFollowed

    const handleOpenStatusModal = () => {
        profileStore.toggleStatusModal(true)
    }

    //Is current user check
    const isCurrentUser = currentUserId.toString() === userid

    const handleFollowUser = () => {

    }


    useEffect(() => {
        if (userid) {
            profileStore.initializeProfile(parseInt(userid)).then(() => void 0)
        }

    }, [userid]);

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
    const aboutProps = [userId, lookingForAJobDescription, website, currentUserEmail,
        isCurrentUser, isProfileDataLoaded]
    const profileProps = [github, facebook, instagram, twitter, youtube, aboutMe,
        lookingForAJobDescription, lookingForAJob, fullName, photos, handleOpenStatusModal, isCurrentUser]

    return (
        <>
            {!smallScreenMode && <About aboutProps={aboutProps}/>}
            <Profile smallScreenMode={smallScreenMode}
                     profileProps={profileProps}
                     isUserFollowed = {isUserFollowed}
                     currentUserStatus={currentUserStatus}
                     isProfileDataLoaded={isProfileDataLoaded}/>
            {!smallScreenMode && <FriendsList/>}

        </>
    );
};

export default authHoc(ProfilePage);