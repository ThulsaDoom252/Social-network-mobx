import React from 'react';
import anon from "../public/anon.jpg"
import Navbar from "./Navbar";
import authStore from "../mobx/auth/auth"
import {ClipLoader} from "react-spinners";

interface HeaderProps {
    smallScreenMode?: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    avatar?: string,
    currentUserName?: string
}

const Header: React.FC<HeaderProps> = ({
                                           smallScreenMode = true,
                                           setIsOpen,
                                           avatar,
                                           currentUserName,
                                       }) => {
    const handleOpenModal = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsOpen(true)
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
            {!smallScreenMode && <div className='absolute top-2 right-2'
                                      onClick={handleLogOut}>Logout</div>}
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
                            className='rounded-full h-20 w-20'
                            src={avatar || anon}
                            alt="user-photo"/>
                        <div className={`${smallScreenMode && "flex flex-col justify-center items-center"}`}>
                            <div>{currentUserName || <ClipLoader/>}</div>
                            {smallScreenMode && <div onClick={handleLogOut}>Logout</div>}

                        </div>

                    </div>
                    <button onClick={handleOpenModal}>
                        Edit profile
                    </button>

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