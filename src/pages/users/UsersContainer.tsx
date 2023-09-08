import React, {useEffect} from 'react';
import Users from "./Users";
import authHoc from "../../hoc/authHoc";
import {useSnackbar} from "notistack";
import usersStore from "../../mobx/users"
import {User} from "../../types";
import {ClipLoader} from "react-spinners";
import {observer} from "mobx-react-lite";

interface UsersContainerProps {
    smallScreenMode?: boolean
    isLogged: boolean,
}

const UsersContainer: React.FC<UsersContainerProps> = observer(({
                                                                    smallScreenMode,
                                                                    isLogged
                                                                }) => {

    const users: User[] = usersStore.users; // Убедитесь, что тип данных соответствует User[]
    const isUsersLoaded = usersStore.isUsersLoaded

    const {enqueueSnackbar, closeSnackbar} = useSnackbar()

    useEffect(() => {
        usersStore.getUsers(50, 5)
        // enqueueSnackbar('Users loaded')
    }, []);

    if (!isUsersLoaded) {
        return <ClipLoader/>
    }

    return <Users smallScreenMode={smallScreenMode} users={users}/>

});

export default authHoc(UsersContainer);