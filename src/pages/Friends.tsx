import React from 'react';
import {testFriends} from "../common";
import anon from "../public/anon.jpg";
import PageContainer from "../components/common/PageContainer";

interface FriendsPageProps {
    mobileMode?: boolean
}

const Friends: React.FC<FriendsPageProps> = ({mobileMode = true}) => {
    return (
        <PageContainer>
            <h4 className='
            font-bold
            '>You have 8 friends</h4>
            <div className={`
              w-full
            ${mobileMode ? 'mt-3' : 'mt-5 p-5'}
            ${!mobileMode && 'grid grid-cols-8  grid-rows-2 gap-1'}
            `}
            >
                {testFriends.map((friend, index) => {
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
                                    <div className='
                w-20
                h-20
                '>
                                        <img className='
                                        rounded-full
                                        w-full
                                        h-full'
                                             src={anon}
                                             alt={'friend-photo'}/>
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
                                        '>Friend name
                                            </div>
                                            <div className={'text-gray-400'}>Id 12345</div>
                                        </div>
                                        <div>
                                            <div>Looking for a job</div>
                                            <button>Unfollow</button>
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
                                        <img className='w-full h-full'
                                             src={anon}
                                             alt={'friend-photo'}/>
                                    </div>
                                    <div>Friend name</div>
                                    <div>Looking for a job</div>
                                    <button>Unfollow</button>
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