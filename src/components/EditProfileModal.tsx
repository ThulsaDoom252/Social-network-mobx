import React from 'react';
import {Dialog} from '@headlessui/react';
import {IoClose} from "react-icons/io5";
import {stopPropagation} from "../common";
import anon from "../public/anon.jpg"
import appStore from "../mobx/app"

interface EditProfileModalProps {
    isOpen: boolean,
    // setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    smallScreen?: boolean,
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
                                                               isOpen,
                                                               smallScreen = false,
                                                               // setIsOpen,
                                                           }) => {
    const handleClose = () => appStore.toggleIsEditProfileModalOpen(false);


    const mainTitleStyle: string = `bg-gray-200 w-full border-b border-gray-400`

    const titlesStyle: string = `font-semibold mt-2`

    const errorStyle: string = 'text-red-600'

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            className="fixed inset-0 z-10 overflow-y-auto"
        >
            <div className="flex items-center justify-center min-h-screen">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30"/>
                {/*********************Main container*/}
                <div style={{background: 'rgb(191,191,218)'}}
                     className={` w-editModal ${smallScreen ? 'm-1' : 'h-fit p-4'} 
                     rounded-lg  
                     overflow-y-auto 
                     z-20 
                     relative 
                     `}
                     onClick={stopPropagation}
                >
                    <div
                        className="mr-2 hover:cursor-pointer transition absolute right-2"
                        onClick={handleClose}
                    >
                        <IoClose/>
                    </div>
                    {/**Inner flex block Desktop only*/}
                    <div className={`${!smallScreen && 'flex'}`}>
                        {/*************Profile Picture block*/}
                        <div className={`
                        flex-col
                        ${!smallScreen ? `w-1/3 mr-2` : 'w-full'}
                        `}>
                            <h4 className={`${mainTitleStyle} rounded-t-md`}>Profile Picture</h4>
                            <div className={`
                               flex
                               justify-center
                               items-center
                               rounded-b-md
                               h-60
                               bg-white
                               w-full
                               ${!smallScreen && 'p-1'}
                            `}>
                                <div className='flex flex-col items-center justify-center'>
                                    <img src={anon} alt="profile-picture" className='rounded-full h-24 w-24'/>
                                    <div className={`${!smallScreen && 'text-center'}`}>JPG or PNG no larger then 5 MB
                                    </div>
                                    <button type="button"
                                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">

                                        Upload new image
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/**Info block*/}
                        <div className={`
                        flex 
                        flex-col 
                        bg-white 
                        p-1 
                        pb-14
                        rounded-md 
                        relative
                        ${!smallScreen ? 'w-full h-full' : 'mt-3'}
                        `}>
                            <div className={'w-full'}>
                                <h5 className={mainTitleStyle}>Your Personal Data</h5>
                                {/*Personal/work info flex container (desktop only)*/}
                                <div className={`
                                ${!smallScreen && 'w-full flex justify-between mt-2'}
                                `}>
                                    {/*Personal info*/}
                                    <div className="mb-4">
                                        <h6 className={titlesStyle}>About You</h6>
                                        <div>
                                            <label htmlFor="username">Username*:</label>
                                            <input
                                                type="text"
                                                id="username"
                                                className="border w-full p-1"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="about">About:</label>
                                            <textarea
                                                id="about"
                                                rows={4}
                                                className="border w-full p-1 resize-none"
                                            ></textarea>
                                        </div>
                                    </div>
                                    {/*Work info*/}
                                    <div>
                                        <h6 className={titlesStyle}>Work Information</h6>
                                        <div>
                                            <label htmlFor="lookingForJob">Are you looking for a job?</label>
                                            <select id="lookingForJob" className="border w-full p-1">
                                                <option value="yes">Yes</option>
                                                <option value="no">No</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="workInfo">Work/ Skills info*:</label>
                                            <textarea id="workInfo" rows={4}
                                                      className="border w-full p-1 resize-none"></textarea>
                                        </div>
                                    </div>
                                </div>
                                {/*Contacts info*/}
                                <div className="mb-8">
                                    <h6 className={mainTitleStyle}>Contacts</h6>
                                    <div>
                                        <label htmlFor="instagram">Instagram:</label>
                                        <input type="text" id="instagram" className="border w-full p-1"/>
                                    </div>
                                    <div>
                                        <label htmlFor="twitter">Twitter:</label>
                                        <input type="text" id="twitter" className="border w-full p-1"/>
                                    </div>
                                    <div>
                                        <label htmlFor="youtube">Youtube:</label>
                                        <input type="text" id="youtube" className="border w-full p-1"/>
                                    </div>
                                    <div>
                                        <label htmlFor="github">Github:</label>
                                        <input type="text" id="github" className="border w-full p-1"/>
                                    </div>
                                    <div>
                                        <label htmlFor="facebook">Facebook:</label>
                                        <input type="text" id="facebook" className="border w-full p-1"/>
                                    </div>
                                    <div>
                                        <label htmlFor="website">Website:</label>
                                        <input type="text" id="website" className="border w-full p-1"/>
                                    </div>
                                </div>
                                <div
                                    className={'absolute bottom-0 flex h-20 flex-col inset-x-1/2 translate-x-1/2 items-center justify-start'}>
                                    <div className={errorStyle}>Error</div>
                                    <div className={errorStyle}>Error</div>
                                    <div className={errorStyle}>Error</div>
                                </div>

                                <div className="absolute right-2 bottom-2">
                                    <button
                                        type="button"
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Update Data
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Dialog>
    );
};

export default EditProfileModal;