import React from 'react';

const About = () => {
    return (
        <div className='
        bg-white
        p-3
        rounded-md
        w-60
        flex
        flex-col
        justify-start
        items-start
        '>
            <div>
                <h4 className='font-bold'>Id</h4>
                <div>123456</div>

            </div>
            <div className='
            mt-3'>
                <h4 className='font-bold'>Looking for a job</h4>
            </div>
            <div className='
            mt-4'>
                <h4 className='font-bold'>Skills/job related info</h4>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dolore dolorem, ipsam labore
                    laborum perferendis provident quo soluta voluptas voluptate.
                </div>
            </div>
            <div className='
            mt-4
            '>
                <h4 className='font-bold'>Email</h4>
                <div>www.test.com
                </div>

            </div>
            <div className='
            mt-4
            '>
                <h4 className='font-bold'>Website</h4>
                www.test.com

            </div>

        </div>
    );
};

export default About;