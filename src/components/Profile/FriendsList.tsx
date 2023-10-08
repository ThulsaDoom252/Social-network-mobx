import React from 'react';
import anon from "../../public/anon.jpg"
import {dummyUsers, friendsRoute, profileRoute} from "../../common";
import {User} from "../../types";
import {Button, Skeleton} from "antd";
import {NavLink} from "react-router-dom";

// Props interface for the FriendsList component
interface FriendsListProps {
    friends: User[];            // List зof friends
    isFriendsLoaded: boolean;   // Flag indicating if friends data is loaded
}

const FriendsList: React.FC<FriendsListProps> = ({friends, isFriendsLoaded}) => {
    const noFriends = isFriendsLoaded && friends.length === 0

    return (
        <div className={`
            flex
            p-2
            w-60
            h-80
            rounded-md
            bg-white
            flex-col
            ${noFriends ? 'items-center justify-center' : 'items-start justify-start'}
        `}>
            {isFriendsLoaded && <div
                className={'w-full text-center'}>{friends.length !== 0 ? `Friends(${friends.length})` : 'No friends yet'}</div>}

            {/* Grid layout for friend avatars */}
            <div className='
                w-full
                grid
                gap-1
                grid-cols-3
            '>
                {!isFriendsLoaded ? dummyUsers.map((_, index) =>
                    <div key={index} className='
                        w-12
                        h-12
                        m-1
                    '>
                        <Skeleton avatar active/>
                    </div>
                ) : friends.map((friend, index) => index <= 11 ?
                    <div key={index} className={`
                        w-12
                        h-12
                    `}>
                        <NavLink to={`${profileRoute}/${friend.id}`}>
                            <img className={'w-full h-full m-2'} src={friend.photos.small || anon} alt="friend-photo"/>
                        </NavLink>
                    </div> : void 0
                )}
            </div>

            {/* Display "Go to list" button if friends are loaded */}
            {isFriendsLoaded && <>
                {!noFriends &&
                    <hr className='
                    mt-5
                    border
                    rounded
                    border-gray-400
                    w-full
                '/>}
                <div className='
                    h-full
                    w-full
                    flex
                    items-end
                    justify-center
                '>
                    {!noFriends &&
                        <NavLink to={friendsRoute} className={'mt-2'}>
                            <Button type={'primary'} size={'middle'} className={'bg-blue-400'}>Go to list</Button>
                        </NavLink>}
                </div>
            </>}
        </div>
    );
};

export default FriendsList;
