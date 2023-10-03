import React from 'react';
import {NavLink} from "react-router-dom";
import {friendsRoute, infoRoute, profileRoute, usersRoute} from "../common";


interface mobileNavbarProps {
    viewedUserId: number
}

const MobileNavbar: React.FC<mobileNavbarProps> = ({viewedUserId}) => {
    const commonStyle: string = 'flex no-underline text-black p-2 border-t-2 border-gray-600'
    const isActiveStyle: string = `bg-white  border-t-2 border-t-blue-600 z-10 h-11`;
    const inactiveStyle: string = `bg-gray-400  border-b border-b-black border-t-black'}`;

    return (
        <div className={`
        absolute
        left-4
        bottom-mobileNavbar
        h-fit
        w-10/12
        flex
        items-center
        justify-start
        z-10
        `}>
            <NavLink to={`${profileRoute}/${viewedUserId}`}
                     className={navData =>
                         `border-r-2 border-l-2 ${commonStyle} ${navData.isActive ? isActiveStyle : inactiveStyle}`}>
                Profile
            </NavLink>
            <NavLink to={friendsRoute} className={navData =>
                `border-r-2  ${commonStyle} ${navData.isActive ? isActiveStyle : inactiveStyle}`}>
                Friends
            </NavLink>
            <NavLink to={usersRoute} className={navData =>
                `border-r-2  ${commonStyle} ${navData.isActive ? isActiveStyle : inactiveStyle}`}>
                Users
            </NavLink>
            <NavLink to={infoRoute} className={navData =>
                `border-r-2 ${commonStyle} ${navData.isActive ? isActiveStyle : inactiveStyle}`}>
                Info
            </NavLink>

        </div>
    )


}

export default MobileNavbar;