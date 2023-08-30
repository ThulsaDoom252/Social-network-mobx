import React from 'react';
import anon from "../public/anon.jpg"
import Navbar from "./Navbar";

interface HeaderProps {
    smallScreenMode?: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({smallScreenMode = true, setIsOpen}) => {
    const handleOpenModal = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsOpen(true)
    }

    return (
        <div className={`
        header
        w-full
        flex
        flex-col
        bg-blue-400
        justify-end
        ${smallScreenMode ? 'h-30 pt-5 pl-3 pr-3' : 'h-60 pb-3 pr-3 pl-3'}
        `}>
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
                            src={anon}
                            alt="user-photo"/>
                        <div>Jon Doe</div>

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