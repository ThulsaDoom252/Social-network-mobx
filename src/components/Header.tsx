import React from 'react';
import anon from "../public/anon.jpg"
import Navbar from "./Navbar";

const Header = () => {
    return (
        <div className='
        h-60
        pl-3
        pr-3
        pb-3
        header
        w-screen
        flex
        flex-col
        bg-blue-400
        justify-end
        '>
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
                    <button>
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

                            <Navbar width={'w-80'}/>
                </div>
            </div>
        </div>
    );
};

export default Header;