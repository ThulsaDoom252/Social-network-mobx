import React from 'react';
import {ImProfile} from "react-icons/im";
import {FaUserFriends, FaUsers} from "react-icons/fa";
import {FaCircleInfo} from "react-icons/fa6";
import {NavLink} from "react-router-dom";

interface NavbarProps {
    width?: string,
}

const Navbar: React.FC<NavbarProps> = ({width}) => {
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
            <p className='
            flex
            items-center
            '>
                <ImProfile/>
                <NavLink className={navData =>
                    navData.isActive ? isActiveStyle : inactiveStyle}
                         to={'/profile'}>
                    Profile
                </NavLink>
            </p>
            <p className='
            flex
            items-center'>
                <FaUserFriends/>
                <NavLink className={navData =>
                    navData.isActive ? isActiveStyle : inactiveStyle}
                         to={'/friends'}>
                    Friends
                </NavLink>
            </p>
            <p className='
            flex
            items-center'>
                <FaUsers/>
                <NavLink className={navData =>
                    navData.isActive ? isActiveStyle : inactiveStyle}
                         to={'/users'}>
                    Users
                </NavLink>
            </p>
            <p className='
            flex
            items-center'>
                <FaCircleInfo/>
                <NavLink className={navData =>
                    navData.isActive ? isActiveStyle : inactiveStyle}
                         to={'/info'}>
                    Info
                </NavLink>
            </p>
        </div>
    );
};

export default Navbar;