import React, {useEffect, useState} from 'react';
import About from "./About";
import Profile from "./Profile";
import FriendsList from "./FriendsList";
import authHoc from "../../hoc/authHoc";
import profileStore from "../../mobx/profile"
import friendsStore from "../../mobx/friends"
import {ProfileData} from "../../types";
import {useParams} from "react-router-dom";
import appStore from "../../mobx/app"

interface ProfilePageProps {
    smallScreenMode?: boolean
    tinyScreenMode?: boolean
    isLogged: boolean,
    profileData: Partial<ProfileData>,
    currentUserProfileData: Partial<ProfileData>,
    currentUserEmail: string,
    isProfileDataLoaded: boolean,
    isCurrentUserDataLoaded: boolean,
    currentUserStatus: string,
    currentUserId: string,
    handleOpenModal: (e: React.MouseEvent) => void

}

const ProfileContainer: React.FC<ProfilePageProps> = ({
                                                          smallScreenMode,
                                                          currentUserId,
                                                          profileData, currentUserEmail,
                                                          currentUserStatus, isProfileDataLoaded,
                                                          tinyScreenMode,
                                                          handleOpenModal,
                                                          currentUserProfileData,
                                                          isCurrentUserDataLoaded,
                                                      }) => {

    const {userid} = useParams();

    const [noContacts, setIsNoContacts] = useState<boolean>(false)
    const [emptyContacts, setEmptyContacts] = useState<number>(0)
    const currentPath = appStore.currentPath

    const isUserFollowed = profileStore.isUserFollowed
    const isCurrentUserProfile = profileStore.isCurrentUserProfile
    const friends = friendsStore.friends
    const isFriendsLoaded = friendsStore.isFriendsLoaded

    //Is current user check
    const isCurrentUser = currentUserId.toString() === userid

    const isDataLoaded = isCurrentUser ? isCurrentUserDataLoaded : isProfileDataLoaded
    const getFriends = () => {
        friendsStore.getFriends().then(() => void 0)
    }

    const setIsCurrentUserProfile = (isCurrentUserProfile: boolean) => {
        profileStore.setIsCurrentUserProfile(isCurrentUserProfile)
    }

    const handleOpenStatusModal = () => {
        profileStore.toggleStatusModal(true)
    }

    // Initialize profile depending on user id param
    useEffect(() => {
        if (userid && !isCurrentUser) {
            profileStore.initializeProfile(parseInt(userid)).then(() => void 0)
        } else {
            isCurrentUserProfile ? setIsCurrentUserProfile(false) : void 0
        }
        currentPath !== 'users' && appStore.setCurrentPath('users')

    }, [userid]);

    useEffect(() => {
        if (isProfileDataLoaded) {
            noContacts && setIsNoContacts(false)
            emptyContacts !== 0 && setEmptyContacts(0)
            userContacts.forEach(contact => !contact && setEmptyContacts(prevValue => prevValue + 1))
        }

    }, [isProfileDataLoaded]);

    useEffect(() => {
        if (emptyContacts === 5) {
            setIsNoContacts(true)
        }

    }, [emptyContacts]);


    useEffect(() => {
        if (isCurrentUser) {
            setIsCurrentUserProfile(true)
        }

    }, [isCurrentUser]);

    useEffect(() => {
        debugger
        if (!isFriendsLoaded && isCurrentUser) {
            getFriends()
        }
    }, [isFriendsLoaded]);


    //Destructuring props
    const {
        userId,
        fullName,
        aboutMe,
        lookingForAJob,
        lookingForAJobDescription,
        contacts,
        photos
    } = (isCurrentUser ? currentUserProfileData : profileData) as ProfileData || {}
    const {github, facebook, instagram, twitter, website, youtube} = contacts || {}
    const aboutProps = [userId, lookingForAJobDescription, website, currentUserEmail,
        isCurrentUser, isProfileDataLoaded]
    const userContacts = [github, facebook, instagram, twitter, youtube]

    const profileProps = [userContacts, aboutMe,
        lookingForAJobDescription, lookingForAJob, fullName, photos, handleOpenStatusModal, isCurrentUser]

    return (
        <>
            {!smallScreenMode && <About isProfileDataLoaded={isDataLoaded} aboutProps={aboutProps}/>}
            <Profile smallScreenMode={smallScreenMode}
                     profileProps={profileProps}
                     isUserFollowed={isUserFollowed}
                     currentUserStatus={currentUserStatus}
                     isProfileDataLoaded={isDataLoaded}
                     tinyScreenMode={tinyScreenMode}
                     noContacts={noContacts}
                     handleOpenModal={handleOpenModal}
            />
            {!smallScreenMode && <FriendsList friends={friends} isFriendsLoaded={isFriendsLoaded}/>}

        </>
    );
};

export default authHoc(ProfileContainer);