import React from 'react';
import {ImProfile} from "react-icons/im";
import {FaInfo, FaUserFriends, FaUsers} from "react-icons/fa";
import {BsInfo} from "react-icons/bs";
import {FaCircleInfo} from "react-icons/fa6";

interface NavbarProps {
    width?: string,
}

const Navbar: React.FC<NavbarProps> = ({width}) => {
    return (
        <div className={`       
        flex
        justify-between
        items-center
        ${width}
        `
        }

        >
            <p className='
            flex
            items-center
            '>
                <ImProfile/>
                <button>
                    Profile
                </button>
            </p>
            <p className='
            flex
            items-center'>
                <FaUserFriends/>
                <button>
                    Friends
                </button>
            </p>
            <p className='
            flex
            items-center'>
                <FaUsers/>
                <button>
                    Users
                </button>
            </p>
            <p className='
            flex
            items-center'>
                <FaCircleInfo/>
                <button>
                    Info
                </button>
            </p>
        </div>
    );
};

export default Navbar;