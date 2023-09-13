import React from 'react';
import anon from "../../public/anon.jpg"
import {
    AiFillFacebook,
    AiFillGithub,
    AiFillInstagram,
    AiFillTwitterSquare,
    AiFillYoutube
} from "react-icons/ai";
import SkeletonLoader from "../context/SkeletonLoader";
import {Button} from "antd";

interface ProfileProps {
    smallScreenMode?: boolean
    profileProps: any,
    currentUserStatus: string,
    isProfileDataLoaded: boolean,
    isUserFollowed: boolean,
}

const Profile: React.FC<ProfileProps> = ({
                                             smallScreenMode,
                                             profileProps,
                                             isProfileDataLoaded,
                                             currentUserStatus,
                                             isUserFollowed,
                                         }) => {


    const [github, facebook, instagram, twitter, youtube,
        aboutMe, lookingForAJobDescription, isLookingForAJob, fullName, photos, handleOpenStatusModal, isCurrentUser] = profileProps

    const contacts = [
        {icon: <AiFillYoutube size={25}/>, src: youtube, color: 'text-red-400'},
        {icon: <AiFillInstagram size={25}/>, src: instagram, color: 'text-yellow-800'},
        {icon: <AiFillFacebook size={25}/>, src: facebook, color: 'text-blue-600'},
        {icon: <AiFillGithub size={25}/>, src: github, color: 'text-green-600'},
        {icon: <AiFillTwitterSquare size={25}/>, src: twitter, color: 'text-blue-300'},
    ]


    return (
        <div className={`
         bg-white
        flex
        flex-col
        h-96
        overflow-y-auto
        justify-start
        ${!smallScreenMode ? 'ml-2 mr-2 w-profile rounded-md'
            : 'w-full'}'}
        `}>
            {isProfileDataLoaded ? <>
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
                        <div onClick={isCurrentUser ? handleOpenStatusModal : void 0}
                             className={`
                             mt-1
                             w-40
                             h-20
                             whitespace-normal
                             break-words
                             text-center
                             ${isCurrentUser && 'hover:cursor-pointer'}
                             `}>
                            {currentUserStatus || 'No status'}
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
                            <div hidden={isCurrentUser}>
                                <Button size={'small'} type={'primary'} className={'bg-blue-400'}>
                                    {isUserFollowed ? 'Unfollow' : 'Follow'}
                                </Button>
                            </div>
                        </div>
                        <div className={'w-full text-center font-semibold text-lg mb-3 mt-2'}>
                            {isLookingForAJob ? 'Looking for a job' : 'Not looking for a job'}
                        </div>
                        {smallScreenMode &&
                            <div className={'w-full  mb-2'}>
                                <h4 className={'font-bold'}>Desired job/ work skills</h4>
                                <div>{lookingForAJobDescription}
                                </div>
                            </div>}
                        <div className='
            w-full
            flex
            flex-col
            items-start
            justify-start
            p-2
            '>
                            <h4 className='font-bold'>{aboutMe ? 'Little about me' : 'No info'}</h4>
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
                                <div className={'w-1/2 flex justify-between flex-wrap '}>
                                    {contacts.map((contact) => contact.src !== null ? <a title={contact.src}
                                                                                       className={`${contact.color}`}
                                                                                       href={contact.src}
                                                                                       target={'_blank'}
                                    >{contact.icon}</a> : void 0)}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </> : <SkeletonLoader width={'100%'}>
                <rect x="140" y="20" rx="3" ry="3" width="30%" height="10"/>
                <rect x="140" y="50" rx="3" ry="3" width="70%" height="10"/>
                <rect x="140" y="100" rx="3" ry="3" width="30%" height="10"/>
                <rect x="140" y="120" rx="3" ry="3" width="70%" height="8"/>
                <rect x="140" y="140" rx="3" ry="3" width="70%" height="8"/>
                <rect x='10' y={'20'} ry='60' width='100' height='100'/>

            </SkeletonLoader>}

        </div>
    );
};

export default Profile;