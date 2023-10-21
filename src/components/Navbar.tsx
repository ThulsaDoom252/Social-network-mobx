import React from 'react'
import { ImProfile } from 'react-icons/im'
import { FaUserFriends, FaUsers } from 'react-icons/fa'
import { FaCircleInfo } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'
import { friendsRoute, infoRoute, usersRoute } from '../common/common'

interface NavbarProps {
  width?: string
  showIcons?: boolean
  userId: number
}

const Navbar: React.FC<NavbarProps> = ({
  showIcons = true,
  width,
  userId
}) => {
  const activeStyle: string = 'text-black underline'
  const inactiveStyle: string = 'text-gray-500 no-underline'
  const navItemStyle: string = 'm-2 flex items-center'

  return (
        <div className={`       
        flex
        justify-between
        items-center
        text-xl
        ${width}
        `
        }
        >
            <p className={navItemStyle}>
                {showIcons && <ImProfile/>}

                <NavLink className={navData =>
                  navData.isActive ? activeStyle : inactiveStyle}
                         to={`/profile/${userId}`}>
                    Profile
                </NavLink>
            </p>
            <p className={navItemStyle}>
                {showIcons && <FaUserFriends/>}
                <NavLink className={navData =>
                  navData.isActive ? activeStyle : inactiveStyle}
                         to={friendsRoute}>
                    Friends
                </NavLink>
            </p>
            <p className={navItemStyle}>
                {showIcons && <FaUsers/>}
                <NavLink className={navData =>
                  navData.isActive ? activeStyle : inactiveStyle}
                         to={usersRoute}>
                    Users
                </NavLink>
            </p>
            <p className={navItemStyle}>
                {showIcons && <FaCircleInfo/>}
                <NavLink className={navData =>
                  navData.isActive ? activeStyle : inactiveStyle}
                         to={infoRoute}>
                    Info
                </NavLink>
            </p>
        </div>
  )
}

export default Navbar
