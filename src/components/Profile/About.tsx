import React from 'react';
import SkeletonLoader from "../context/SkeletonLoader";

interface AboutProps {
    aboutProps: any
    isProfileDataLoaded: boolean
}

const About: React.FC<AboutProps> = ({aboutProps, isProfileDataLoaded}) => {

    //Destructuring  props
    const [userId, lookingForAJobDescription, website, currentUserEmail, isCurrentUser] = aboutProps

    return (
        //Main block
        <div className='
        bg-white
        p-3
        rounded-md
        w-60
        flex
        flex-col
        justify-start
        items-start
        '>
            {isProfileDataLoaded ?
                <>
                    {/*// Id*/}
                    <div>
                        <h4 className='font-bold'>Id</h4>
                        <div>{userId}</div>
                    </div>
                    {/*Job description*/}
                    <div className='
            mt-4'>

                        <h4 className='font-bold'>{lookingForAJobDescription ? 'Skills/job related info' : 'No Skills/job related info'}</h4>
                        <div>{lookingForAJobDescription}
                        </div>
                    </div>
                    <div className='
            mt-4
            '>
                        {isCurrentUser &&
                            // Email
                            <>
                                <h4 className={'font-bold'}>Email</h4>
                                <div>{currentUserEmail}
                                </div>
                            </>}
                    </div>
                    {/*// Website*/}
                    <div className='
            mt-4
            '>
                        {website ?
                            <>
                                <h4 className={'font-bold'}>Website</h4>
                                <p>{website}</p>
                            </> : <h4 className={'font-bold'}>No website</h4>
                        }
                    </div>
                </> :
                //Skeleton loader
                <SkeletonLoader width={'100%'} height={'100%'} viewBox={'0 0 100% 100%'}>
                    <rect x="0" y="20" width="30%" height="10"/>
                    <rect x="0" y="40" width="50%" height="10"/>
                    <rect x="0" y="70" width="80%" height="10"/>
                    <rect x="0" y="90" width="90%" height="10"/>
                    <rect x="0" y="110" width="60%" height="10"/>
                    <rect x="0" y="140" width="50%" height="10"/>
                    <rect x="0" y="160" width="90%" height="10"/>
                    <rect x="0" y="200" width="50%" height="10"/>
                    <rect x="0" y="220" width="90%" height="10"/>
                    <rect x="0" y="250" width="50%" height="10"/>
                    <rect x="0" y="270" width="90%" height="10"/>
                </SkeletonLoader>
            }
        </div>
    );
};

export default About;