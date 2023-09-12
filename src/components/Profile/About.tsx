import React from 'react';


interface AboutProps {
    aboutProps: any

}

const About: React.FC<AboutProps> = ({aboutProps}) => {
    const [userId, lookingForAJobDescription,  website, currentUserEmail, isCurrentUser] = aboutProps

    return (
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
            <div>
                <h4 className='font-bold'>Id</h4>
                <div>{userId}</div>

            </div>
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
                    <>
                        <h4 className={'font-bold'}>Email</h4>
                        <div>{currentUserEmail}
                        </div>
                    </>}
            </div>
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

        </div>
    );
};

export default About;