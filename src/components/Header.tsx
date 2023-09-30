import React from 'react';
import anon from "../public/anon.jpg"
import Navbar from "./Navbar";
import authStore from "../mobx/auth/auth"
import {Button, Skeleton, Space} from "antd";
import appStore from "../mobx/app";

interface HeaderProps {
    smallScreenMode: boolean,
    avatar?: string,
    currentUserName?: string
    userId: number,
    tinyScreenMode: boolean,
    isCurrentUserDataLoaded: boolean
}

const Header: React.FC<HeaderProps> = ({
                                           smallScreenMode = true,
                                           // setIsOpen,
                                           avatar,
                                           currentUserName,
                                           userId,
                                           tinyScreenMode,
                                           isCurrentUserDataLoaded,
                                       }) => {

    const handleOpenModal = (e: React.MouseEvent) => {
        e.stopPropagation()
        appStore.toggleIsEditProfileModalOpen(true)
    }

    const handleLogOut = () => {
        authStore.signOut()
    }

    const absoluteSpaceStyle: React.CSSProperties = {
        position: 'absolute',
        right: '2px',
        top: '2px'
    }

    const relativeSpaceStyle: React.CSSProperties = {
        position: 'relative',
        left: '50px',
    }


    return (
        <>

            {isCurrentUserDataLoaded ?
                <div
                    hidden={!authStore.isLogged}
                    className={`
        header
        w-full
        flex
        relative
        flex-col
        bg-blue-400
        justify-end
        ${smallScreenMode ? 'h-30 pt-5 pl-3 pr-3' : 'h-60 pb-3 pr-3 pl-3'}
        `}>
                    <div className='
              flex
              flex-col
              '>
                        {isCurrentUserDataLoaded ?
                            <div className='
                flex
                justify-between
                items-center
                '>
                                <div className='
                    flex
                    items-center
                    justify-between
                    w-40
                    h-10
                    '><img
                                    className={`rounded-full h-20 w-20 ${smallScreenMode && 'mt-2'}`}
                                    src={avatar || anon}
                                    alt="user-photo"/>

                                    <div
                                        className={`${smallScreenMode && "flex flex-col justify-center items-center"}`}>
                                        <div className={'ml-2 fontLato cursor-default'}>{currentUserName}</div>

                                        <Button
                                            className={`bg-blue-400 ${!smallScreenMode && 'absolute top-2 right-2 fontLato'}`}
                                            size={`${smallScreenMode ? 'small' : 'middle'}`} type={'primary'}
                                            onClick={handleLogOut}>Logout</Button>
                                    </div>

                                </div>
                                {!tinyScreenMode &&
                                    <Button type="primary"
                                            className='bg-blue-400'
                                            disabled={false}
                                            onClick={handleOpenModal}>Edit Profile</Button>}

                            </div> : <>
                                <Space>
                                    <Skeleton.Avatar active size={'large'} shape={'circle'}/>
                                    <Skeleton.Input active size={'large'} style={{height: '20px'}}/>
                                </Space>

                                <Space style={!smallScreenMode ? absoluteSpaceStyle : relativeSpaceStyle}>
                                    <Skeleton.Button active size={smallScreenMode ? 'small' : 'large'}/>
                                </Space>
                                <Space style={{position: 'absolute', bottom: '60px', right: '60px'}}>
                                    <Skeleton.Button active size={'large'}/>
                                </Space>
                            </>

                        }
                        <div className='
                flex
                w-full
                mt-10
                justify-center
                items-center
                '>
                            {!smallScreenMode && <Navbar userId={userId} width={'w-80'}/>}
                        </div>
                    </div>
                </div> : <></>}
        </>
    );
};

export default Header;