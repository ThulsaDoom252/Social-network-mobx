import React from 'react';

const About = () => {
    return (
        <div className='
        bg-white
        p-5
        rounded-md
        w-60
        flex
        flex-col
        justify-start
        items-start
        '>
            <div className='mt-5 '>
                <h4 className='font-bold'>Id</h4>
                <div>123456</div>

            </div>
            <div className='
            mt-5'>
                <h4 className='font-bold'>About</h4>
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam fugiat nemo nostrum numquam
                    veritatis? Accusamus beatae fugiat ipsa saepe ullam.
                </div>

            </div>
            <div className='
            mt-5
            '>
                <h4 className='font-bold'>Email</h4>
                <div>www.test.com
                </div>

            </div>
            <div className='
            mt-5
            '>
                <h4 className='font-bold'>Website</h4>
                www.test.com

            </div>

        </div>
    );
};

export default About;