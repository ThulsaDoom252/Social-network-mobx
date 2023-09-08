import React from 'react';
import anon from "../../public/anon.jpg"
import {AiFillFacebook, AiFillGithub, AiFillInstagram, AiFillTwitterCircle, AiFillYoutube} from "react-icons/ai";

interface ProfileProps {
    smallScreenMode?: boolean
    profileProps: any,
    currentUserStatus: string,
}

const Profile: React.FC<ProfileProps> = ({smallScreenMode, profileProps, currentUserStatus}) => {
    const [github, facebook, instagram, twitter, youtube,
        aboutMe, lookingForAJobDescription, isLookingForAJob, fullName, photos] = profileProps
    return (
        <div className={`
         bg-white
        flex
        flex-col
        justify-start
        ${!smallScreenMode ? 'ml-2 mr-2 w-profile rounded-md'
            : 'w-full'}'}
        `}>
            <div className={`
            flex
            w-full
            p-2
            border-t
            border-black
            ${smallScreenMode && 'pt-4'}
            `}>
                <div className='
                flex
                w-60
                flex-col
                justify-start
                items-center
                '>
                    <img
                        className='
                        w-40
                        h-40
                        '
                        src={photos?.large || anon}
                        alt={'user-photo'}/>
                    <div>
                        {currentUserStatus}
                    </div>

                </div>

                <div className='
                flex
                w-full
                ml-5
                flex-col
                justify-start
                '>
                    <div className='
                    w-full
                    flex
                    items-center
                   justify-between
                    '>
                        <div>
                            {fullName}
                        </div>
                        <div>
                            <button>
                                Follow
                            </button>
                        </div>
                    </div>
                    {smallScreenMode && <>
                        <div className={'w-full text-center font-semibold text-lg mb-3 mt-2'}>
                            {isLookingForAJob ? 'Looking for a job' : 'Not looking for a job'}
                        </div>
                        <div className={'w-full  mb-2'}>
                            <h4 className={'font-bold'}>Desired job/ work skills</h4>
                            <div>{lookingForAJobDescription}
                            </div>
                        </div>
                        <div className='
            w-full
            flex
            flex-col
            items-start
            justify-start
            '>
                            <h4 className='font-bold'>Little about me</h4>
                            <div>{aboutMe}
                            </div>

                        </div>
                        <div className={'w-full flex flex-col items-center justify-center mt-2'}>
                            <div className={'font-bold'}>Contact me</div>
                            <div className={`
                    flex
                     p-4
                     w-full  
                     justify-center 
                     h-fit
                    `}>
                                <div className={'w-full flex justify-between flex-wrap'}>
                                    <a href="#"><AiFillYoutube size={25}/></a>
                                    <a href="#"><AiFillInstagram size={25}/></a>
                                    <a href="#"> <AiFillGithub size={25}/></a>
                                    <a href="#"> <AiFillTwitterCircle size={25}/></a>
                                    <a href="#"><AiFillFacebook size={25}/></a>
                                </div>
                            </div>
                        </div>
                    </>}
                    {!smallScreenMode &&
                        <div className={`
                    flex
                    flex-col 
                    items-center
                    `}>
                            <div>
                                <div className='
                        flex
                        items-center'>
                                    <AiFillYoutube/>
                                    <div>{youtube}</div>

                                </div>
                                <div className='
                        flex
                        items-center'>
                                    <AiFillInstagram/>
                                    <div>{instagram}</div>

                                </div>
                                <div className='
                        flex
                        items-center'>
                                    <AiFillGithub/>
                                    <div>{github}</div>

                                </div>
                                <div className='
                        flex
                        items-center'>
                                    <AiFillTwitterCircle/>
                                    <div>{twitter}</div>

                                </div>
                                <div className='
                        flex
                        items-center'>
                                    <AiFillFacebook/>
                                    <div>{facebook}</div>
                                </div>
                            </div>
                        </div>}

                </div>
            </div>
            {!smallScreenMode && <div className='
            w-full
            flex
            flex-col
            items-start
            justify-start
            '>
                <h4 className='font-bold'>Little about me</h4>
                <div>{aboutMe}
                </div>

            </div>}

        </div>
    );
};

export default Profile;