import React from 'react';
import {dummyUsers, profileRoute} from "../../common";
import anon from "../../public/anon.jpg";
import {observer} from "mobx-react-lite";
import {User} from "../../types";
import {NavLink} from "react-router-dom";
import SkeletonLoader from "../../components/context/SkeletonLoader";
import {truncate} from "../../common/commonFuncs";
import Button from 'antd/es/button';

interface UsersProps {
    smallScreenMode?: boolean
    usersToShow: User[]
    isUsersLoaded: boolean,
    followUserHandler: (isFollowed: boolean, userId: number, user: User) => void
}

const Users: React.FC<UsersProps> = observer(({
                                                  smallScreenMode,
                                                  usersToShow,
                                                  isUsersLoaded,
                                                  followUserHandler,
                                              }) => {

    // @ts-ignore
    return (
        <>
            {/*//Users list block*/}
            <div className={`   
            w-full
            bg-gray-200
            mt-3
            p-5
            ${!smallScreenMode && 'grid grid-cols-8 grid-rows-2 gap-3'}
            `}>
                {isUsersLoaded ? usersToShow.map((user, index) =>
                    //User main block
                    <div key={index} className={`
                    flex
                    relative
                    border
                rounded-md
                p-5
                border-gray-400
                   ${smallScreenMode ? 'justify-between mt-2' : 'justify-center flex-col items-center'} `}>
                        {/*//Image Container*/}
                        <div className={`${smallScreenMode ? 'w-24' : 'max-w-20 max-h-20'}`}>
                            <NavLink to={`${profileRoute}/${user.id}`}>
                                <img className='w-full h-full cursor-pointer rounded-full'
                                     src={user.photos.small || anon}
                                     alt={'friend-photo'}/>
                            </NavLink>

                        </div>

                        <div className='
                        w-full
                        text-center
                        '>
                            <div>{user.name && truncate(user.name, (smallScreenMode ? 20 : 10))}</div>
                            <div>{user.status ? truncate(user.status, (smallScreenMode ? 20 : 10)) : 'no status'}</div>
                            <Button
                                onClick={() => followUserHandler(user.followed || false, user.id || 0,
                                    {...user}
                                )}
                                shape={"round"}
                                size={`${smallScreenMode ? 'middle' : 'small'}`}
                                className={`bg-blue-400 absolute right-0 ${smallScreenMode ? 'transform -translate-y-1/2' : 'top-0'}`}
                                type="primary">{user.followed ? 'Unfollow' : 'Follow'}</Button>
                        </div>
                    </div>
                ) : dummyUsers.map((index) =>
                    <div key={index}>
                        <SkeletonLoader>
                            <rect x="0" y="88" rx="3" ry="3" width="178" height="6"/>
                            <circle cx="20" cy="20" r="20"/>
                        </SkeletonLoader>
                    </div>)}
            </div>
        </>


    );
});

export default Users;