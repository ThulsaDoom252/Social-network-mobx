import React, {useRef, useState} from 'react';
import anon from "../public/anon.jpg"
import Navbar from "./Navbar";
import authStore from "../mobx/auth/auth"
import {ClipLoader} from "react-spinners";
import {Button} from "antd";
import profileStore from "../mobx/profile";
import appStore from "../mobx/app";

interface HeaderProps {
    smallScreenMode?: boolean,
    // setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    avatar?: string,
    currentUserName?: string
}

const Header: React.FC<HeaderProps> = ({
                                           smallScreenMode = true,
                                           // setIsOpen,
                                           avatar,
                                           currentUserName,
                                       }) => {
    const handleOpenModal = (e: React.MouseEvent) => {
        e.stopPropagation()
        appStore.toggleIsEditProfileModalOpen(true)
    }

    const handleLogOut = () => {
        authStore.signOut()
    }
    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const updateAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files && e.target.files[0];
        if (selectedFile) {
            profileStore.updateAvatar(selectedFile);
        }
    };

    const handleAvatarClick = (event: React.MouseEvent) => hiddenFileInput.current && hiddenFileInput.current.click()

    const [isAvatarHovered, setIsAvatarHovered] = useState(false)

    const handleMouseEnterAvatar = () => setIsAvatarHovered(true)
    const handleMouseLeaveAvatar = () => setIsAvatarHovered(false)

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
                <Button className='absolute top-2 right-2 bg-blue-400 fontLato' type="primary"
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
                            onMouseEnter={handleMouseEnterAvatar}
                            onMouseLeave={handleMouseLeaveAvatar}
                            onClick={handleAvatarClick}
                            className={`rounded-full h-20 w-20 cursor-pointer ${isAvatarHovered && 'border-blue-300 border-2 transition-all duration-100'}`}
                            title={'click to change avatar'}
                            src={avatar || anon}
                            alt="user-photo"/>
                        <input ref={hiddenFileInput}
                               hidden={true} type={'file'}
                               onChange={updateAvatar}/>
                        <div className={`${smallScreenMode && "flex flex-col justify-center items-center"}`}>
                            <div className={'ml-2 fontLato cursor-default'}>{currentUserName || <ClipLoader/>}</div>
                            {smallScreenMode && <div onClick={handleLogOut}>Logout</div>}

                        </div>

                    </div>
                    <Button type="primary"
                            className='bg-blue-400'
                            disabled={true}
                            onClick={handleOpenModal}>Edit Profile</Button>

                </div>
                <div className='
                flex
                w-full
                mt-10
                justify-center
                items-center
                '>
                    {!smallScreenMode && <Navbar width={'w-80'}/>}
                </div>
            </div>
        </div>
    );
};

export default Header;