import React from 'react';
import {profileRoute} from "../../common";
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
    followUserHandler: (isFollowed: boolean, userId: number) => void
}

const Users: React.FC<UsersProps> = observer(({
                                                  smallScreenMode,
                                                  usersToShow,
                                                  isUsersLoaded,
                                                  followUserHandler,
                                              }) => {

    const testUserCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]


    // @ts-ignore
    return (
        <>
            <div className='
            w-full
            bg-gray-200
            grid
            mt-3
            p-5
            grid-cols-8
            grid-rows-2
            gap-3
            '>
                {isUsersLoaded ? usersToShow.map((user, index) =>
                    <div key={index} className='
                    flex
                    relative
                    flex-col
                    justify-center
                    items-center
                    border
                rounded-md
                p-5
                border-gray-400
                    '>
                        <div className='
                max-w-20
                max-h-20
                '>
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
                            {user.name && <div>{truncate(user.name, 10)}</div>}
                            <div>{user.status ? truncate(user.status, 10) : 'no status'}</div>
                            <Button
                                onClick={() => followUserHandler(user.followed || false, user.id || 0)}
                                shape={"round"}
                                size={'small'}
                                className={'bg-blue-400 absolute top-0 right-0'}
                                type="primary">{user.followed ? 'Unfollow' : 'Follow'}</Button>
                        </div>
                    </div>
                ) : testUserCount.map((index) =>
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