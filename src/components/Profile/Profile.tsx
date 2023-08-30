import React, {useEffect} from 'react';
import anon from "../../public/anon.jpg"
import {AiFillFacebook, AiFillGithub, AiFillInstagram, AiFillYoutube} from "react-icons/ai";
import Navbar from "../Navbar";

interface ProfileProps {
    smallScreenMode?: boolean
}

const Profile: React.FC<ProfileProps> = ({smallScreenMode}) => {
    return (
        <div className={`
         bg-white
        flex
        flex-col
        justify-start
        ${!smallScreenMode ? 'ml-2 mr-2 w-profile rounded-md'
            : 'w-full'}'}
        `}>
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
                        src={anon}
                        alt={'user-photo'}/>
                    <div>
                        User status here
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
                            John Doe
                        </div>
                        <div>
                            <button>
                                Follow
                            </button>
                        </div>
                    </div>
                    {smallScreenMode && <>
                        <div className={'w-full text-center font-semibold text-lg mb-3 mt-2'}>
                            looking for a job?
                        </div>
                        <div className={'w-full  mb-2'}>
                            <h4 className={'font-bold'}>Desired job/ work skills</h4>
                            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi commodi dignissimos
                                eius enim est, excepturi id mollitia numquam quibusdam unde.
                            </div>
                        </div>
                        <div className='
            w-full
            flex
            flex-col
            items-start
            justify-start
            '>
                            <h4 className='font-bold'>Little about me</h4>
                            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur blanditiis cum
                                dolore dolorum
                                ducimus et exercitationem expedita facilis hic ipsam laboriosam magni molestiae
                                necessitatibus nemo
                                nihil, nulla numquam obcaecati quae quibusdam quidem quos rem rerum sint voluptas
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
                                <div className={'w-full flex justify-between flex-wrap'}>
                                    <a href="#"><AiFillYoutube size={25}/></a>
                                    <a href="#"><AiFillInstagram size={25}/></a>
                                    <a href="#"> <AiFillGithub size={25}/></a>
                                    <a href="#"><AiFillFacebook size={25}/></a>
                                </div>
                            </div>
                        </div>
                    </>}
                    {!smallScreenMode &&
                        <div className={`
                    flex
                    flex-col 
                    items-center
                    `}>
                            <div>
                                <div className='
                        flex
                        items-center'>
                                    <AiFillYoutube/>
                                    <div>www.youtube.com</div>

                                </div>
                                <div className='
                        flex
                        items-center'>
                                    <AiFillInstagram/>
                                    <div>www.instagram.com</div>

                                </div>
                                <div className='
                        flex
                        items-center'>
                                    <AiFillGithub/>
                                    <div>www.github.com</div>

                                </div>
                                <div className='
                        flex
                        items-center'>
                                    <AiFillFacebook/>
                                    <div>www.facebook.com</div>
                                </div>
                            </div>
                        </div>}

                </div>
            </div>
            {!smallScreenMode && <div className='
            w-full
            flex
            flex-col
            items-start
            justify-start
            '>
                <h4 className='font-bold'>Little about me</h4>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur blanditiis cum dolore dolorum
                    ducimus et exercitationem expedita facilis hic ipsam laboriosam magni molestiae necessitatibus nemo
                    nihil, nulla numquam obcaecati quae quibusdam quidem quos rem rerum sint voluptas voluptates.
                    Accusamus accusantium cum dolore ipsum saepe. Alias delectus est hic illum itaque iusto quibusdam,
                </div>

            </div>}

        </div>
    );
};

export default Profile;