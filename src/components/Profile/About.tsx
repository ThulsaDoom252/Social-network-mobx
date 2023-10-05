import React from 'react';
import {Skeleton} from "antd";

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
               <Skeleton/>
            }
        </div>
    );
};

export default About;