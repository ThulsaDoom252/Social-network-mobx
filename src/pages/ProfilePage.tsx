import React from 'react';
import About from "../components/Profile/About";
import Profile from "../components/Profile/Profile";
import FriendsList from "../components/Profile/FriendsList";
import authHoc from "../hoc/authHoc";

interface ProfilePageProps {
    smallScreenMode?: boolean
    isLogged: boolean,
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

export default authHoc(ProfilePage);