import React from 'react';
import {profileRoute, testFriends} from "../common";
import anon from "../public/anon.jpg";
import PageContainer from "../components/common/PageContainer";
import {User} from "../types";
import {Button} from "antd";
import {NavLink} from "react-router-dom";
import {truncate} from "../common/commonFuncs";
import {GiThreeFriends} from "react-icons/gi";
import {TbFriendsOff} from "react-icons/tb";
import SkeletonLoader from "../components/context/SkeletonLoader";

interface FriendsPageProps {
    smallScreen: boolean,
    friends: User[],
    handleUnfollowFriend: (id: number) => void
    isFriendsLoaded: boolean,
}

const Friends: React.FC<FriendsPageProps> = ({
                                                 smallScreen = true,
                                                 friends,
                                                 handleUnfollowFriend,
                                                 isFriendsLoaded,
                                             }) => {
    return (
        <PageContainer>
            {isFriendsLoaded && friends.length !== 0 && <h4 className='
            font-bold
            '>You have {friends.length} friends</h4>}
            {isFriendsLoaded && friends.length === 0 &&
                <div className={'w-96 mt-40 mx-auto flex justify-between'}>
                    <div><TbFriendsOff size={30}/></div>
                    <div>You got no friends yet..</div>
                </div>}
            {/*//List block*/}
            <div className={`
              w-full
            ${smallScreen ? 'mt-3' :  isFriendsLoaded ? 'mt-5 p-5 grid grid-cols-8 grid-rows-2 gap-2' : 'pl-40 grid grid-cols-4'}
            `}
            >
                {isFriendsLoaded ? friends.map((friend, index) => {
                        // Mobile screens layout
                        if (smallScreen) {
                            return (
                                //Main block
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
                                    {/*//Inner block*/}
                                    <div className={'w-full flex  justify-between items-center'}>
                                        <div className={'flex'}>

                                            {/*//Img container*/}
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
                                            {/*// Name and id block*/}
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
                                        {/*//Btn block*/}
                                        <div>
                                            <Button
                                                onClick={() => handleUnfollowFriend(friend.id || 0)}
                                                type={'primary'}

                                                className={'bg-blue-400'}>Unfollow</Button>
                                        </div>
                                    </div>


                                </div>
                            )
                            // Desktop screens layout
                        } else {
                            return (
                                //Main friend block
                                <div key={index} className='
                    flex
                    flex-col
                    justify-center
                    items-center
                    '>
                                    {/*Img container*/}
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
                                    {/*Name*/}
                                    <div>{truncate(friend.name || '', 10)}</div>
                                    {/*//Btn block*/}
                                    <Button
                                        size={'small'}
                                        onClick={() => handleUnfollowFriend(friend.id || 0)}
                                        type={'primary'}

                                        className={'bg-blue-400'}>Unfollow</Button>
                                </div>

                            )
                        }
                    }
                ) : testFriends.map(() => {
                    {
                        return (
                            <div className={'w-full h-29 mt-2 flex justify-center items-center'}>
                                <div>
                                    {smallScreen ?
                                        <SkeletonLoader width={'100%'}>
                                            <rect x="0" y="68" rx="3" ry="3" height="6" width={'100%'}/>
                                            <rect x="0" y="100" rx="3" ry="3" height="6" width={'80%'}/>
                                            <rect x="0" y="132" rx="3" ry="3" height="6" width={'60%'}/>
                                            <circle cx='20' cy="20" r="20"/>
                                        </SkeletonLoader> :
                                        <SkeletonLoader>
                                            <rect x="5" y="68" rx="3" ry="3" height="6" width={'140'}/>
                                            <rect x="20" y="100" rx="3" ry="3" height="6" width={'100'}/>
                                            <rect x="40" y="132" rx="3" ry="3" height="6" width={'50'}/>
                                            <circle cx='75' cy="30" r="20" height='20' width='20'/>
                                        </SkeletonLoader>
                                    }
                                </div>
                            </div>
                        )
                    }

                })}
            </div>
        </PageContainer>

    );
};

export default Friends;