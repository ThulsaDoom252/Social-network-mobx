import React from 'react';
import {testFriends} from "../common";
import anon from "../public/anon.jpg";
import PageContainer from "../components/common/PageContainer";
import {observer} from "mobx-react-lite";


interface UsersProps {
    smallScreenMode?: boolean
    isLogged: boolean,
}


const Users:React.FC<UsersProps> = observer(({smallScreenMode, isLogged}) => {
    return (
        <PageContainer>
            <h4 className='
            w-full text-center font-bold
            '>Users(8)</h4>
            <div className='
            w-full
            grid
            mt-3
            p-5
            grid-cols-4
            grid-rows-2
            gap-1
            '>
                {testFriends.map((friend, index) =>
                    <div key={index} className='
                    flex
                    flex-col
                    justify-center
                    items-center
                        border-1
                rounded
                border-gray-400
                    '>
                        <div className='
                max-w-20
                max-h-20
                '>
                            <img className='w-full h-full'
                                 src={anon}
                                 alt={'friend-photo'}/>
                        </div>
                        <div className='
                        w-full
                        text-center
                        '>
                            <div>UserName</div>
                            <div>Looking for a job</div>
                            <button>Follow</button>
                        </div>

                    </div>
                )}

            </div>
        </PageContainer>


    );
});

export default Users;