import React from 'react'
import { dummyUsersForSkeletonLoading} from '../../common/common'
import {routesConfig} from "../../config/routesConfig";
import anon from '../../images/anon.jpg'
import { observer } from 'mobx-react-lite'
import { type User } from '../../types'
import { NavLink } from 'react-router-dom'
import Button from 'antd/es/button'
import { Skeleton, Space } from 'antd'

// Props interface for the Users component
interface UsersProps {
  smallScreenMode?: boolean // Indicates if in small screen mode
  usersToShow: User[] // Array of users to display
  isUsersLoaded: boolean // Indicates if users are loaded
  followUserHandler: (isFollowed: boolean, userId: number, user: User) => void // Function to handle follow/unfollow
  tinyScreenMode: boolean // Indicates if in tiny screen mode
  noSearchResults: boolean // Indicates if there are no search results
}

// Users component
const Users: React.FC<UsersProps> = observer(({
  smallScreenMode,
  usersToShow,
  isUsersLoaded,
  followUserHandler,
  tinyScreenMode,
  noSearchResults
}) => {
  return (
        <>
            {/* Users list block */}
            <div className={`   
                w-full
                bg-gray-200
                mt-3
                p-5
                ${!smallScreenMode && !noSearchResults && `grid ${isUsersLoaded
                ? 'grid-cols-8'
: 'grid-cols-4'} grid-rows-2 gap-3`}
            `}>
                {/* Mapping Users (if loaded) */}
                {isUsersLoaded ? usersToShow.map((user: User, index) =>
                        // User main block
                        <div key={index} className={`
                            flex
                            relative
                            border
                            rounded-md
                            p-5
                            border-gray-400
                            ${smallScreenMode && !tinyScreenMode
                            ? 'justify-between mt-2'
: tinyScreenMode
                                ? 'flex-col items-center'
: 'justify-center flex-col items-center'} 
                        `}>
                            {/* Image Container */}
                            <div className={`${smallScreenMode ? 'w-24' : 'max-w-14'}`}>
                                <NavLink to={`${routesConfig.profileRoute}/${user.id}`}>
                                    <img className='w-full h-full cursor-pointer rounded-full'
                                         src={user.photos.small || anon}
                                         alt={'friend-photo'}/>
                                </NavLink>
                            </div>
                            {/* User data */}
                            <div className='
                                w-full
                                text-center
                            '>
                                <div className={'truncate'}>{user.name}</div>
                                <div className={'truncate'}>{user.status}</div>
                                <Button
                                    disabled={user.followRequest}
                                    onClick={() => {
                                      followUserHandler(user.followed || false, user.id || 0,
                                        { ...user }
                                      )
                                    }}
                                    shape={'round'}
                                    size={`${smallScreenMode ? 'middle' : 'small'}`}
                                    className={`bg-blue-400 
                                        ${!tinyScreenMode && 'absolute'} 
                                        ${smallScreenMode && !tinyScreenMode ? 'transform -translate-y-1/2 right-2' : 'top-0 right-0'}`}
                                    type="primary">{user.followed ? 'Unfollow' : 'Follow'}
                                </Button>
                            </div>
                        </div>
                  // Mapping dummy array into skeleton if users not loaded
                ) : dummyUsersForSkeletonLoading.map((index) =>
                    <div key={index}>
                        <Space className={`
                            flex 
                            ${smallScreenMode && !tinyScreenMode ? 'justify-between w-full' : tinyScreenMode ? 'flex-col mb-2' : 'flex-col justify-center items-center'}                                                                                                  
                        `}>
                            <Skeleton.Avatar active size={'large'}/>
                            <Skeleton.Input active size={'small'}/>
                            <Skeleton.Button className={'mt-2 w-5'} active shape={'round'}/>
                        </Space>
                    </div>)}
                {/* No search results / no users block */}
                <div className={'w-full text-center'}>
                    {noSearchResults
                      ? ' No users match your criteria'
                      : isUsersLoaded && usersToShow.length === 0
                        ? 'No users...'
                        : void 0}
                </div>
            </div>
        </>
  )
})

export default Users
