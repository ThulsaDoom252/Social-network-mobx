import React from 'react';
import {testFriends} from "../common";
import anon from "../public/anon.jpg";

const Friends = () => {
    return (
        <div
            className='
        w-full
        h-full
        bg-white
        flex
        rounded-md
        flex-col
        justify-start
        items-center
        '>
            <h4 className='
            font-bold
            '>You have 8 friends</h4>
            <div className='
            w-full
            mt-5
            p-5
            grid
            grid-cols-8
            grid-rows-2
            gap-1
            '>
                {testFriends.map(friend =>
                    <div className='
                    flex
                    flex-col
                    justify-center
                    items-center
                    '>
                        <div className='
                w-20
                h-20
                '>
                            <img className='w-full h-full'
                                 src={anon}
                                 alt={'friend-photo'}/>
                        </div>
                        <div>Friend name</div>
                        <div>Looking for a job</div>
                        <button>Unfollow</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Friends;