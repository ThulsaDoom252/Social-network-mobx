import React from 'react';
import {testFriends} from "../common";
import anon from "../public/anon.jpg";

const Users = () => {
    return (
        <div className='
        w-full
        bg-white
        rounded
        p-2
        flex
        flex-col
        justify-start
        items-center
        '>
            <h4 className='
            w-full text-center font-bold
            '>Users(8)</h4>
            <div className='
            w-full
            grid
            mt-3
            p-5
            grid-cols-4
            grid-rows-2
            gap-1
            '>
                {testFriends.map(friend =>
                    <div className='
                    flex
                    flex-col
                    justify-center
                    items-center
                        border-1
                rounded
                border-gray-400
                    '>
                        <div className='
                max-w-20
                max-h-20
                '>
                            <img className='w-full h-full'
                                 src={anon}
                                 alt={'friend-photo'}/>
                        </div>
                        <div className='
                        w-full
                        text-center
                        '>
                            <div>UserName</div>
                            <div>Looking for a job</div>
                            <button>Follow</button>
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
};

export default Users;