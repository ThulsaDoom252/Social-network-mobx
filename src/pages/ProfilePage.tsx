import React from 'react';
import About from "../components/Profile/About";
import Profile from "../components/Profile/Profile";
import FriendsList from "../components/Profile/FriendsList";

interface ProfilePageProps {
    smallScreenMode?: boolean
}

const ProfilePage: React.FC<ProfilePageProps> = ({smallScreenMode}) => {
    return (
        <>
            {!smallScreenMode && <About/>}
            <Profile smallScreenMode={smallScreenMode}/>
            {!smallScreenMode && <FriendsList/>}

        </>
    );
};

export default ProfilePage;