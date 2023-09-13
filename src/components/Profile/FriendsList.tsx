import React from 'react';
import anon from "../../public/anon.jpg"
import {dummyUsers} from "../../common";

const FriendsList = () => {
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
            <div>Friends list</div>
            <div className='
            w-full
            grid
            gap-1
            grid-cols-3
            '>{dummyUsers.map((friend, index) =>
                <div key={index} className='
                w-8
                h-8
                '>
                    <img className='w-full h-full m-2'
                         src={anon}
                         alt={'friend-photo'}/>
                </div>
            )}</div>
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
                <button>Show all</button>

            </div>

        </div>
    );
};

export default FriendsList;