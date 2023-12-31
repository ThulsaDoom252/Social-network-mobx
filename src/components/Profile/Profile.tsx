import React from 'react'
import anon from '../../images/anon.jpg'
import {
  AiFillFacebook,
  AiFillGithub,
  AiFillInstagram,
  AiFillTwitterSquare,
  AiFillYoutube
} from 'react-icons/ai'
import { Button, Skeleton, Space } from 'antd'
import { contactUrlCheck } from '../../common/common'

interface ProfileProps {
  smallScreenMode?: boolean
  tinyScreenMode?: boolean
  profileProps: any
  currentUserStatus: string
  isProfileDataLoaded: boolean
  isUserFollowed: boolean
  noContacts: boolean
  handleOpenModal: (e: React.MouseEvent) => void
  handleFollowUser: (id: number, isFollowed: boolean) => void
}

const Profile: React.FC<ProfileProps> = ({
  smallScreenMode,
  profileProps,
  isProfileDataLoaded,
  currentUserStatus,
  isUserFollowed,
  tinyScreenMode,
  noContacts,
  handleOpenModal,
  handleFollowUser
}) => {
  const [userContacts, aboutMe,
    lookingForAJobDescription,
    isLookingForAJob, fullName,
    photos, handleOpenStatusModal,
    isCurrentUser, userId] = profileProps

  const [github, facebook, instagram, twitter, youtube] = userContacts

  const contacts = [
    { icon: <AiFillYoutube size={25}/>, src: youtube, color: 'text-red-400' },
    { icon: <AiFillInstagram size={25}/>, src: instagram, color: 'text-yellow-800' },
    { icon: <AiFillFacebook size={25}/>, src: facebook, color: 'text-blue-600' },
    { icon: <AiFillGithub size={25}/>, src: github, color: 'text-green-600' },
    { icon: <AiFillTwitterSquare size={25}/>, src: twitter, color: 'text-blue-300' }
  ]

  return (
        <div className={`
         bg-white
         rounded-md
        overflow-y-auto
        ${!smallScreenMode
? 'ml-2 mr-2 w-profile rounded-md'
            : 'w-full'}'}
        `}>
            {isProfileDataLoaded
              ? <div className={`
            flex            
            w-full
            p-2
            ${tinyScreenMode ? 'h-screen' : 'h-96'}
            ${tinyScreenMode && 'flex-col items-center'}
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
                        <div className={`
                    w-full
                    flex
                    items-center
                   ${tinyScreenMode ? 'justify-center flex-col' : 'justify-between'}
                    `}>
                            <div>
                                {fullName}
                            </div>
                            {tinyScreenMode && isCurrentUser &&
                                <Button type="primary"
                                        className='bg-blue-400'
                                        disabled={false}
                                        onClick={handleOpenModal}
                                >Edit Profile</Button>}
                            <div hidden={isCurrentUser || tinyScreenMode}>
                                <Button size={'small'} type={'primary'} className={'bg-blue-400'}
                                        onClick={() => { handleFollowUser(userId, isUserFollowed) }}>
                                    {isUserFollowed ? 'Unfollow' : 'Follow'}
                                </Button>
                            </div>
                        </div>
                        <div className={'w-full text-center font-semibold text-lg mb-3 mt-2'}>
                            {isLookingForAJob ? 'Looking for a job' : 'Not looking for a job'}
                        </div>
                        {smallScreenMode &&
                            <div className={`w-full  mb-2 ${tinyScreenMode && 'flex flex-col items-center'}`}>
                                <>
                                    {lookingForAJobDescription &&
                                        <h4 className={'font-bold'}>Desired job/ work skills</h4>}

                                    <div>{lookingForAJobDescription || 'No desired job / work skill info'}
                                    </div>
                                </>
                            </div>}
                        <div className={`
            w-full
            flex
            flex-col
            items-start
            justify-start
            p-2
            ${tinyScreenMode ? 'items-center justify-center' : 'items-start justify-start'}
            `}>
                            <>

                                <h4 className={`${aboutMe && 'font-bold'}`}>{aboutMe ? 'Little about me' : 'No personal info'}</h4>
                                <div className={`${tinyScreenMode && 'text-center'}`}>{aboutMe}
                                </div>
                            </>

                        </div>
                        <div className={'w-full flex flex-col items-center justify-center mt-2'}>
                            <div
                                className={`${!noContacts && 'font-bold'}`}>{!noContacts ? 'Contacts:' : 'No contacts'}</div>
                            <div className={`
                    flex
                     p-4
                     w-full  
                     justify-center 
                     h-fit
                    `}>
                                <div className={'w-1/2 flex justify-center'}>
                                    {isProfileDataLoaded && contacts.map((contact, index) =>
                                      (contact.src && contact.src !== '' && contactUrlCheck.test(contact.src))
                                        ? <a key={index} title={contact.src}
                                               className={`${contact.color} mr-2 ml-2`}
                                               href={contact.src}
                                               target={'_blank'}
                                            >{contact.icon}</a>
                                        : void 0)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

              : <div className={`mt-3 p-5 ${tinyScreenMode && 'h-screen'}`}>
                    {!tinyScreenMode
                      ? <Skeleton avatar active paragraph={{ rows: 6 }}/>
                      : <Space style={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                            <Skeleton.Image active/>
                            <Skeleton.Input active/>
                            <Skeleton.Input active/>
                            <Skeleton.Input active/>
                            <Skeleton.Input active/>
                            <Skeleton.Input active/>
                            <Space>
                                <Skeleton.Avatar active/>
                                <Skeleton.Avatar active/>
                                <Skeleton.Avatar active/>
                                <Skeleton.Avatar active/>
                            </Space>
                        </Space>}
                </div>}
        </div>
  )
}

export default Profile
