import React from 'react';
import About from "../components/Profile/About";
import Profile from "../components/Profile/Profile";
import FriendsList from "../components/Profile/FriendsList";

const ProfilePage = () => {
    return (
        <>
            <About/>
            <Profile/>
            <FriendsList/>
        </>
    );
};

export default ProfilePage;