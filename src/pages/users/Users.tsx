import React from 'react';
import {testFriends} from "../../common";
import anon from "../../public/anon.jpg";
import PageContainer from "../../components/common/PageContainer";
import {observer} from "mobx-react-lite";
import {User} from "../../types";
import {Navigate, useNavigate} from "react-router-dom";


interface UsersProps {
    smallScreenMode?: boolean
    users: User[]
}


const Users: React.FC<UsersProps> = observer(({smallScreenMode, users}) => {

    const navigate = useNavigate()
    const handleUserClick = (id: any) => {
        navigate(`profile${id}`)
    }


    // @ts-ignore
    return (
        <PageContainer>
            <h4 className='
            w-full text-center font-bold
            '>Users({users.length})</h4>
            <div className='
            w-full
            grid
            mt-3
            p-5
            grid-cols-8
            grid-rows-2
            gap-1
            '>
                {users.map((user, index) =>
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
                            <img className='w-full h-full cursor-pointer'
                                 onClick={() => handleUserClick(user.id)}
                                 src={user.photos.small || anon}
                                 alt={'friend-photo'}/>
                        </div>
                        <div className='
                        w-full
                        text-center
                        '>
                            <div>{user.name}</div>
                            <div>{user.status || 'no status'}</div>
                            <button>Follow</button>
                        </div>

                    </div>
                )}

            </div>
        </PageContainer>


    );
});

export default Users;