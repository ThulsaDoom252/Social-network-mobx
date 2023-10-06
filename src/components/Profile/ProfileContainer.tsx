import React, { useEffect, useState } from 'react';
import About from "./About";
import Profile from "./Profile";
import FriendsList from "./FriendsList";
import authHoc from "../../hoc/authHoc";
import profileStore from "../../mobx/profile";
import friendsStore from "../../mobx/friends";
import { ProfileData } from "../../types";
import { useParams } from "react-router-dom";
import usersStore from "../../mobx/users";
import { observer } from "mobx-react-lite";
import { contactUrlCheck } from "../../common/common";

// Props interface for the ProfileContainer component
interface ProfilePageProps {
    profileData: Partial<ProfileData>; // Partial profile data of
    currentUserProfileData: Partial<ProfileData>; // Partial profile data of the current user
    smallScreenMode: boolean; // Flag for small screen mode
    isCurrentUserProfile: boolean; // Flag indicating if the profile belongs to the current user
    tinyScreenMode: boolean; // Flag for tiny screen mode
    isLogged: boolean; // Flag indicating if the user is logged in
    currentUserEmail: string; // Email of the current user
    isProfileDataLoaded: boolean; // Flag indicating if profile data is loaded
    isCurrentUserDataLoaded: boolean; // Flag indicating if current user data is loaded
    currentUserStatus: string; // Status of the current user
    currentUserId: number; // ID of the current user
    viewedUserId: number; // ID of the viewed user
    handleOpenModal: (e: React.MouseEvent) => void; // Function to handle opening a modal
    handleOpenStatusModal: () => void; // Function to handle opening a status modal
}

// ProfileContainer component that displays user profile information
const ProfileContainer: React.FC<ProfilePageProps> = observer(({
                                                                   smallScreenMode,
                                                                   currentUserId,
                                                                   profileData,
                                                                   currentUserEmail,
                                                                   currentUserStatus,
                                                                   isProfileDataLoaded,
                                                                   tinyScreenMode,
                                                                   handleOpenModal, currentUserProfileData,
                                                                   isCurrentUserDataLoaded,
                                                                   isCurrentUserProfile,
                                                                   viewedUserId,
                                                                   handleOpenStatusModal }) => {

    // Destructuring props
    const {
        userId,
        fullName,
        aboutMe,
        lookingForAJob,
        lookingForAJobDescription,
        contacts,
        photos
    } = (isCurrentUserProfile ? currentUserProfileData : profileData) as ProfileData || {};

    // Destructuring contacts
    const { github, facebook, instagram, twitter, website, youtube } = contacts || {};

    // Getting the user ID parameter from the URL
    const { useridParam } = useParams();
    const parsedUserIdParam = parseInt(useridParam || '0');

    // States to handle empty contacts
    const [noContacts, setIsNoContacts] = useState<boolean>(false);
    const [emptyContacts, setEmptyContacts] = useState<number>(0);

    // MobX store references
    const isUserFollowed = profileStore.isUserFollowed;
    const friends = friendsStore.friends;
    const isFriendsLoaded = friendsStore.isFriendsLoaded;

    // Check if data is loaded for the current user
    const isDataLoaded = isCurrentUserProfile ? isCurrentUserDataLoaded : isProfileDataLoaded;

    // Toggle if the profile belongs to the current user
    useEffect(() => {
        if (currentUserId === parsedUserIdParam) {
            !isCurrentUserProfile && profileStore.setIsCurrentUserProfile(true);
        } else {
            isCurrentUserProfile && profileStore.setIsCurrentUserProfile(false);
        }
    }, [parsedUserIdParam]);

    // Initialize the profile depending on the user ID parameter
    // Load a new profile if the user ID parameter differs from the currently viewed profile
    useEffect(() => {
        if (viewedUserId !== parsedUserIdParam && !isCurrentUserProfile) {
            profileStore.initializeProfile(parsedUserIdParam).then(() => void 0);
        }
    }, [viewedUserId, isCurrentUserProfile, parsedUserIdParam]);

    // Checking if the user has contacts in the proper URL format (only gitРub, facebook, instagram, Twitter, YouTube)
    useEffect(() => {
        emptyContacts !== 0 && setEmptyContacts(0);
        if (isProfileDataLoaded) {
            noContacts && setIsNoContacts(false);
            userContacts.forEach(contact => (!contact || contact === '' || !contactUrlCheck.test(contact))
                && setEmptyContacts(prevValue => prevValue + 1));
        }
    }, [isProfileDataLoaded]);

    // Set a flag if there are no contacts
    useEffect(() => {
        if (emptyContacts === 5) {
            setIsNoContacts(true);
        }
    }, [emptyContacts]);

    // Function to handle following/unfollowing a user
    const handleFollowUser = async (id: number, isFollowed: boolean) => {
        profileStore.setIsUserFollowed(false);
        const user = {
            id: userId,
            name: fullName,
            photos: {
                small: photos.small,
                large: photos.large,
            },
            status: currentUserStatus,
            followed: true
        };
        isFollowed ? await usersStore.unfollowUser(id) : await usersStore.followUser(id, user);
        await profileStore.getIsUserFollowedInfo(id);
    };

    // Arrays of props for child components
    const aboutProps = [userId, lookingForAJobDescription, website, currentUserEmail,
        isCurrentUserProfile, isProfileDataLoaded];
    const userContacts = [github, facebook, instagram, twitter, youtube];

    const profileProps = [userContacts, aboutMe, lookingForAJobDescription,
        lookingForAJob, fullName, photos, handleOpenStatusModal, isCurrentUserProfile, userId];

    return (
        <>
            {!smallScreenMode && <About isProfileDataLoaded={isDataLoaded} aboutProps={aboutProps} />}
            <Profile
                smallScreenMode={smallScreenMode}
                profileProps={profileProps}
                isUserFollowed={isUserFollowed}
                currentUserStatus={currentUserStatus}
                isProfileDataLoaded={isDataLoaded}
                tinyScreenMode={tinyScreenMode}
                noContacts={noContacts}
                handleOpenModal={handleOpenModal}
                handleFollowUser={handleFollowUser}
            />
            {!smallScreenMode && <FriendsList friends={friends} isFriendsLoaded={isFriendsLoaded} />}
        </>
    );
});

export default authHoc(ProfileContainer);
