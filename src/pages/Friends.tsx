import React from 'react';
import {profileRoute, testFriends} from "../common";
import anon from "../public/anon.jpg";
import PageContainer from "../components/common/PageContainer";
import {User} from "../types";
import {Button} from "antd";
import {NavLink} from "react-router-dom";

interface FriendsPageProps {
    mobileMode: boolean,
    friends: User[],
    handleUnfollowFriend: (id: number) => void
}

const Friends: React.FC<FriendsPageProps> = ({
                                                 mobileMode = true,
                                                 friends,
                                                 handleUnfollowFriend,
                                             }) => {
    return (
        <PageContainer>
            <h4 className='
            font-bold
            '>You have {friends.length} friends</h4>
            <div className={`
              w-full
            ${mobileMode ? 'mt-3' : 'mt-5 p-5 grid grid-cols-8 grid-rows-2 gap-1'}
            `}
            >
                {friends.length !== 0 && friends.map((friend, index) => {
                        if (mobileMode) {
                            return (
                                <div key={index} className='
                    flex
                    mt-2
                    mx-auto
                    bg-gray-100
                    h-29
                    p-3
                    w-full
                    justify-center
                    items-center
                    '>
                                    <div className={'w-full flex  justify-between items-center'}>
                                        <div className={'flex'}>

                                            <div className='
                w-20
                h-20
                '><NavLink to={`${profileRoute}/${friend.id}`}>
                                                <img className='
                                        rounded-full
                                        w-full
                                        h-full'
                                                     src={friend.photos.large || anon}
                                                     alt={'friend-photo'}/>
                                            </NavLink>
                                            </div>
                                            <div className='
                                    flex
                                    ml-5
                                    flex-column
                                    justify-between
                                    h-full
                                    items-start
                                    '>
                                                <div>
                                                    <div className='
                                            font-bold
                                        '>{friend.name}
                                                    </div>
                                                    <div className={'text-gray-400'}>{friend.id}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <Button
                                                onClick={() => handleUnfollowFriend(friend.id || 0)}
                                                type={'primary'}

                                                className={'bg-blue-400'}>Unfollow</Button>
                                        </div>
                                    </div>


                                </div>
                            )

                        } else {
                            return (
                                <div key={index} className='
                    flex
                    flex-col
                    justify-center
                    items-center
                    '>
                                    <div className='
                max-w-20
                max-h-20
                '>
                                        <NavLink to={`${profileRoute}/${friend.id}`}>
                                        <img className='w-full h-full'
                                             src={friend.photos.small || anon}
                                             alt={'friend-photo'}/>
                                        </NavLink>
                                    </div>
                                    <div>{friend.name}</div>
                                    <Button className='bg-blue-400' type={'primary'} size={'small'}>
                                        Unfollow

                                    </Button>
                                </div>

                            )
                        }
                    }
                )}
            </div>
        </PageContainer>

    );
};

export default Friends;