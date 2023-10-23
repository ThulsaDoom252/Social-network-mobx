import React from 'react'
import { NavLink } from 'react-router-dom'
import {routesConfig} from "../config/routesConfig";

interface mobileNavbarProps {
  viewedUserId: number
}

const MobileNavbar: React.FC<mobileNavbarProps> = ({ viewedUserId }) => {
  const commonStyle: string = 'flex no-underline text-black p-2 border-t-2 border-gray-600'
  const activeStyle: string = 'bg-white  border-t-2 border-t-blue-600 z-10 h-11 transition-all duration-200'
  const inactiveStyle: string = 'bg-gray-400  border-b border-b-black border-t-black\'}'

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
            <NavLink to={`${routesConfig.profileRoute}/${viewedUserId}`}
                     className={navData =>
                         `border-r-2 border-l-2 ${commonStyle} ${navData.isActive ? activeStyle : inactiveStyle}`}>
                Profile
            </NavLink>
            <NavLink to={routesConfig.friendsRoute} className={navData =>
                `border-r-2  ${commonStyle} ${navData.isActive ? activeStyle : inactiveStyle}`}>
                Friends
            </NavLink>
            <NavLink to={routesConfig.usersRoute} className={navData =>
                `border-r-2  ${commonStyle} ${navData.isActive ? activeStyle : inactiveStyle}`}>
                Users
            </NavLink>
            <NavLink to={routesConfig.infoRoute} className={navData =>
                `border-r-2 ${commonStyle} ${navData.isActive ? activeStyle : inactiveStyle}`}>
                Info
            </NavLink>

        </div>
  )
}

export default MobileNavbar
