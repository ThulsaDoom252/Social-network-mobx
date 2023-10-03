import React from 'react';
import {ImProfile} from "react-icons/im";
import {FaUserFriends, FaUsers} from "react-icons/fa";
import {FaCircleInfo} from "react-icons/fa6";
import {NavLink} from "react-router-dom";
import {friendsRoute, infoRoute, usersRoute} from "../common";

interface NavbarProps {
    width?: string,
    showIcons?: boolean,
    userId: number
}

const Navbar: React.FC<NavbarProps> = ({
                                           showIcons = true,
                                           width,
                                           userId,
                                       }) => {
    const isActiveStyle: string = `text-black`;
    const inactiveStyle: string = `text-gray-500 no-underline !important'}`;

    return (
        <div className={`       
        flex
        justify-between
        items-center
        ${width}
        `
        }
        >
            <p className={`
            flex
            items-center
            `}>
                {showIcons && <ImProfile/>}

                <NavLink className={navData =>
                    navData.isActive ? isActiveStyle : inactiveStyle}
                         to={`/profile/${userId}`}>
                    Profile
                </NavLink>
            </p>
            <p className='
            flex
            items-center'>
                {showIcons && <FaUserFriends/>}
                <NavLink className={navData =>
                    navData.isActive ? isActiveStyle : inactiveStyle}
                         to={friendsRoute}>
                    Friends
                </NavLink>
            </p>
            <p className='
            flex
            items-center'>
                {showIcons && <FaUsers/>}
                <NavLink className={navData =>
                    navData.isActive ? isActiveStyle : inactiveStyle}
                         to={usersRoute}>
                    Users
                </NavLink>
            </p>
            <p className='
            flex
            items-center'>
                {showIcons && <FaCircleInfo/>}
                <NavLink className={navData =>
                    navData.isActive ? isActiveStyle : inactiveStyle}
                         to={infoRoute}>
                    Info
                </NavLink>
            </p>
        </div>
    );
};

export default Navbar;