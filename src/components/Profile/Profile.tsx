import React from 'react';
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
                   p-2
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
                    <div className='
                    flex
                    flex-col
                    items-center
                    '>
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

                    </div>

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
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur blanditiis cum dolore dolorum
                    ducimus et exercitationem expedita facilis hic ipsam laboriosam magni molestiae necessitatibus nemo
                    nihil, nulla numquam obcaecati quae quibusdam quidem quos rem rerum sint voluptas voluptates.
                    Accusamus accusantium cum dolore ipsum saepe. Alias delectus est hic illum itaque iusto quibusdam,
                    sint ullam vel voluptatibus! Accusamus commodi cupiditate debitis dolorum earum fugit hic incidunt
                    inventore ipsum, labore libero nostrum obcaecati officia officiis quod repudiandae similique
                    suscipit tempora voluptas voluptatum. Ducimus earum et excepturi explicabo iste laboriosam
                    laudantium modi ratione reiciendis vero? Atque, commodi cum doloremque laborum molestias nihil
                    reprehenderit.
                </div>

            </div>

        </div>
    );
};

export default Profile;