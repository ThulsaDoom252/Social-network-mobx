import React from 'react';
import anon from "../../public/anon.jpg"
import {dummyUsers, friendsRoute, profileRoute} from "../../common";
import {User} from "../../types";
import {Button, Skeleton} from "antd";
import {NavLink} from "react-router-dom";

interface friendsListProps {
    friends: User[],
    isFriendsLoaded: boolean,
}

const FriendsList: React.FC<friendsListProps> = ({friends, isFriendsLoaded}) => {
    return (
        <div className='
        flex
        p-2
        w-40
        h-60
        rounded-md
        bg-white
        flex-col
        items-start
        justify-start
        '>
            {isFriendsLoaded && <div>{friends.length !== 0 ? `Friends(${friends.length})` : 'No friends yet'}</div>}
            <div className='
            w-full
            grid
            gap-1
            grid-cols-3
            '>{!isFriendsLoaded ? dummyUsers.map((friend, index) =>
                <div key={index} className='
                w-8
                h-8
                m-1
                '>
                    <Skeleton avatar active/>
                </div>
            ) : friends.map((friend, index) => index <= 11 ?
                <div key={index} className={`
            w-8
            h-8
            `}>
                    <NavLink to={`${profileRoute}/${friend.id}`}>
                        <img className={'w-full h-full m-2'} src={friend.photos.small || anon} alt="friend-photo"/>
                    </NavLink>

                </div> : void 0
            )}</div>
            {isFriendsLoaded &&   <>
                <hr className='
            mt-5
            border-2
            rounded
            border-gray-400
            w-full'/>
                <div className='
             h-full
             w-full
             flex
             items-center
             justify-center
             '>
                    {friends.length !== 0 &&
                        <NavLink to={friendsRoute}>
                            <Button type={'primary'} size={'small'} className={'bg-blue-400'}>Go to list</Button>
                        </NavLink>}
                </div>
            </>}


        </div>
    );
};

export default FriendsList;