import React from 'react';
import anon from "../public/anon.jpg"
import Navbar from "./Navbar";
import authStore from "../mobx/auth/auth"
import {ClipLoader} from "react-spinners";
import {Button} from "antd";
import appStore from "../mobx/app";

interface HeaderProps {
    smallScreenMode?: boolean,
    // setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    avatar?: string,
    currentUserName?: string
    userId: number
}

const Header: React.FC<HeaderProps> = ({
                                           smallScreenMode = true,
                                           // setIsOpen,
                                           avatar,
                                           currentUserName,
                                           userId,
                                       }) => {

    const handleOpenModal = (e: React.MouseEvent) => {
        e.stopPropagation()
        appStore.toggleIsEditProfileModalOpen(true)
    }

    const handleLogOut = () => {
        authStore.signOut()
    }

    return (
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
            {!smallScreenMode &&
                <Button className='absolute top-2 right-2 bg-blue-400 fontLato'
                        size={'middle'}
                        type="primary"
                        onClick={handleLogOut}>Logout</Button>}
            <div className='
              flex
              flex-col
              '>
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
                    '>
                        <img
                            className={`rounded-full h-20 w-20`}
                            src={avatar || anon}
                            alt="user-photo"/>
                        <div className={`${smallScreenMode && "flex flex-col justify-center items-center"}`}>
                            <div className={'ml-2 fontLato cursor-default'}>{currentUserName ||
                                <ClipLoader/>}</div>
                            {smallScreenMode && <Button className={'bg-blue-400'} size={'small'} type={'primary'} onClick={handleLogOut}>Logout</Button>}

                        </div>

                    </div>
                    <Button type="primary"
                            className='bg-blue-400'
                            disabled={false}
                            onClick={handleOpenModal}>Edit Profile</Button>

                </div>
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
        </div>
    );
};

export default Header;