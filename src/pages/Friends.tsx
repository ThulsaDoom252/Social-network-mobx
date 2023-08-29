import React from 'react';
import {testFriends} from "../common";
import anon from "../public/anon.jpg";
import PageContainer from "../components/common/PageContainer";

const Friends = () => {
    return (
        <PageContainer>
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
                max-w-20
                max-h-20
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
        </PageContainer>

    );
};

export default Friends;