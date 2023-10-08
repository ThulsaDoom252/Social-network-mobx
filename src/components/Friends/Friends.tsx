import React from 'react';
import {profileRoute, dummyUsers} from "../../common";
import anon from "../../public/anon.jpg";
import {User} from "../../types";
import {Button, Skeleton, Space} from "antd";
import {NavLink} from "react-router-dom";
import {truncate} from "../../common/commonFuncs";
import {TbFriendsOff} from "react-icons/tb";

interface FriendsPageProps {
    smallScreen: boolean,
    tinyScreenMode: boolean,
    friends: User[],
    handleUnfollowFriend: (id: number) => void
    isFriendsLoaded: boolean,
    noFriends: boolean,
    noFriendsSearchResults: boolean,
}

const Friends: React.FC<FriendsPageProps> = ({
                                                 smallScreen,
                                                 friends,
                                                 handleUnfollowFriend,
                                                 isFriendsLoaded,
                                                 tinyScreenMode,
                                                 noFriends,
                                                 noFriendsSearchResults,
                                             }) => {

    (window as any).s1 = noFriends
    return (
        <>
            {(noFriends || noFriendsSearchResults) &&
                <div className={'w-full mt-40 mx-auto flex justify-center'}>
                    <>
                        <div><TbFriendsOff size={30}/></div>
                        <div className={'ml-2'}>{noFriends ? 'No friends yet...' :
                            noFriendsSearchResults ? 'No results match your criteria'
                                : void 0}</div>
                    </>
                </div>}
            {/*//List block*/}
            <div className={`
              w-full
            ${smallScreen ? 'mt-3' : isFriendsLoaded ? 'mt-5 p-5 grid grid-cols-8 grid-rows-2 gap-2' : 'pl-40 grid grid-cols-4'}
            `}
            >
                {isFriendsLoaded ? friends.map((friend, index) => {
                        // Mobile screens layout
                        if (smallScreen) {
                            return (
                                //Main block
                                <div key={index} className={`
                    flex
                    mt-2
                    mx-auto
                    bg-gray-100
                    h-29
                    p-3
                    w-full
                    justify-center
                    items-center
                    `}>
                                    {/*//Inner block*/}
                                    <div className={`
                                    w-full 
                                    flex 
                                    justify-between 
                                    items-center
                                    ${tinyScreenMode && 'flex-col'}
                                    
                                    
                                    `}>
                                        <div
                                            className={`flex ${tinyScreenMode && 'flex-col items-center'}`}>

                                            {/*//Img container*/}
                                            <div
                                                className={` w-20 h-20`}>
                                                <NavLink to={`${profileRoute}/${friend.id}`}>
                                                    <img className={`
                                        rounded-full                  
                                        h-full
                                        w-full
                                        `}
                                                         src={friend.photos.large || anon}
                                                         alt={'friend-photo'}/>
                                                </NavLink>
                                            </div>
                                            {/*// Name and id block*/}
                                            <div className={`  flex
                                    
                                    flex-column
                                    justify-center
                                    h-full                                
                                    items-start
                                    ${!tinyScreenMode && 'ml-5'}
                                    `}>
                                                <div
                                                    className={`${tinyScreenMode && 'flex flex-col  items-center'}`}>
                                                    <div className='
                                            font-bold '
                                                    >{friend.name}
                                                    </div>
                                                    <div className={'text-gray-400'}>{friend.id}</div>
                                                </div>
                                            </div>
                                        </div>
                                        {/*//Btn block*/}
                                        <div className={`${tinyScreenMode && 'flex justify-center'}`}>
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
                ) : dummyUsers.map(() => {
                    {
                        return (
                            <div className={'w-full h-29 mt-2 flex justify-center items-center'}>
                                <div className={'w-full'}>
                                    {smallScreen && !tinyScreenMode ?
                                        <Space
                                            style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                                            <Space style={{display: 'flex'}}>
                                                <Skeleton.Avatar size={'large'} active/>
                                                <Space
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        position: 'relative',
                                                        top: '8px'
                                                    }}>
                                                    <Skeleton.Input active size={'small'}/>
                                                    <Skeleton.Button active size={'small'}/>
                                                </Space>
                                            </Space>
                                            <Space>
                                                <Skeleton.Button size={'large'} active/>
                                            </Space>
                                        </Space> : smallScreen && tinyScreenMode ?
                                            <Space
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center'
                                                }}>
                                                <Skeleton.Avatar active size={'large'}/>
                                                <Skeleton.Input active size={'small'}/>
                                                <Skeleton.Input active size={'small'}/>
                                                <Skeleton.Button size={'large'} active/>

                                            </Space> :
                                            <Space
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'center'
                                                }}>
                                                <Skeleton.Avatar size={'large'} active/>
                                                <Skeleton.Input size={'small'} active/>
                                                <Skeleton.Input size={'small'} active/>
                                                <Skeleton.Button size={'small'} active/>
                                            </Space>
                                    }
                                </div>
                            </div>
                        )
                    }

                })}
            </div>
        </>

    );
};

export default Friends;