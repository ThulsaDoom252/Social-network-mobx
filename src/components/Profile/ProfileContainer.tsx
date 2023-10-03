import React, {useEffect, useState} from 'react';
import About from "./About";
import Profile from "./Profile";
import FriendsList from "./FriendsList";
import authHoc from "../../hoc/authHoc";
import profileStore from "../../mobx/profile"
import friendsStore from "../../mobx/friends"
import {ProfileData} from "../../types";
import {useParams} from "react-router-dom";
import usersStore from "../../mobx/users"
import {observer} from "mobx-react-lite";

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
    currentUserId: number,
    handleOpenModal: (e: React.MouseEvent) => void
    isCurrentUserProfile: boolean,
    viewedUserId: number,

}

const ProfileContainer: React.FC<ProfilePageProps> = observer(({
                                                                   smallScreenMode,
                                                                   currentUserId,
                                                                   profileData, currentUserEmail,
                                                                   currentUserStatus, isProfileDataLoaded,
                                                                   tinyScreenMode,
                                                                   handleOpenModal,
                                                                   currentUserProfileData,
                                                                   isCurrentUserDataLoaded,
                                                                   isCurrentUserProfile,
                                                                   viewedUserId,
                                                               }) => {

    const {useridParam} = useParams();
    const parsedUserIdParam = parseInt(useridParam || '0')

    const [noContacts, setIsNoContacts] = useState<boolean>(false)
    const [emptyContacts, setEmptyContacts] = useState<number>(0)

    const isUserFollowed = profileStore.isUserFollowed
    const friends = friendsStore.friends
    const isFriendsLoaded = friendsStore.isFriendsLoaded

    //Is current user check
    const isDataLoaded = isCurrentUserProfile ? isCurrentUserDataLoaded : isProfileDataLoaded
    const getFriends = () => {
        friendsStore.getFriends().then(() => void 0)
    }

    useEffect(() => {
        if (currentUserId === parsedUserIdParam) {
            !isCurrentUserProfile && profileStore.setIsCurrentUserProfile(true)
        } else {
            isCurrentUserProfile && profileStore.setIsCurrentUserProfile(false)
        }

    }, [parsedUserIdParam]);

    const handleOpenStatusModal = () => {
        profileStore.toggleStatusModal(true)
    }

    // Initialize profile depending on user id param
    useEffect(() => {
        if (viewedUserId !== parsedUserIdParam && !isCurrentUserProfile) {
            profileStore.initializeProfile(parsedUserIdParam).then(() => void 0)
        }

    }, [viewedUserId, isCurrentUserProfile, parsedUserIdParam]);

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

    const handleFollowUser = async (id: number, isFollowed: boolean) => {
        profileStore.setIsUserFollowed(false)
        const user = {
            id: userId,
            name: fullName,
            photos: {
                small: photos.small,
                large: photos.large,
            },
            status: currentUserStatus,
            followed: true
        }
        isFollowed ? await usersStore.unfollowUser(id) : await usersStore.followUser(id, user)
        await profileStore.getIsUserFollowedInfo(id)
    }

    //Destructuring props
    const {
        userId,
        fullName,
        aboutMe,
        lookingForAJob,
        lookingForAJobDescription,
        contacts,
        photos
    } = (isCurrentUserProfile ? currentUserProfileData : profileData) as ProfileData || {}
    const {github, facebook, instagram, twitter, website, youtube} = contacts || {}
    const aboutProps = [userId, lookingForAJobDescription, website, currentUserEmail,
        isCurrentUserProfile, isProfileDataLoaded]
    const userContacts = [github, facebook, instagram, twitter, youtube]

    const profileProps = [userContacts, aboutMe,
        lookingForAJobDescription, lookingForAJob, fullName, photos, handleOpenStatusModal, isCurrentUserProfile, userId]


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
                     handleFollowUser={handleFollowUser}
            />
            {!smallScreenMode && <FriendsList friends={friends} isFriendsLoaded={isFriendsLoaded}/>}

        </>
    );
});

export default authHoc(ProfileContainer);