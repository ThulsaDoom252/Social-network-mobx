import React, {useEffect} from 'react';
import Header from "./components/Header";
import Info from "./pages/Info";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import ProfilePage from "./components/Profile/ProfileContainer";
import MobileNavbar from "./components/MobileNavbar";
import {authRoute, friendsRoute, infoRoute, rootRoute, usersRoute} from "./common";
import EditProfileModal from "./components/Profile/EditProfileModal";
import authStore from "./mobx/auth/auth"
import profileStore from "./mobx/profile"
import appStore from "./mobx/app"
import {observer} from "mobx-react-lite";
import AuthContainer from "./components/Auth/AuthContainer";
import {initializeCurrentUser} from "./mobx/initializeCurrentUser";
import UsersContainer from "./pages/users/UsersContainer";
import Initialize from "./components/initialize";
import StatusModal from "./components/Profile/StatusModal";
import FriendsPageContainer from "./components/Friends/FriendsPageContainer";
import {closeSnackbar, useSnackbar} from "notistack";
import {Button} from "antd";

const App: React.FC = observer(() => {

    const {enqueueSnackbar} = useSnackbar()

    const isLogged = authStore.isLogged
    const profileData = profileStore.profileData
    const isAvatarUpdating = profileStore.isAvatarUpdating
    const isUserDataUpdating = profileStore.isUserDataUpdating
    const isCurrentUserDataLoaded = profileStore.isCurrentUserDataLoaded

    const isLoggedOutByUser = authStore.isLoggedOutByUser

    const apiError = appStore.apiError

    const successMessage = appStore.successMessage

    const currentUserId = authStore.id
    const userId = profileStore.currentUserId

    //Screen sizes
    const smallScreenMode = appStore.smallScreen
    const tinyScreenMode = appStore.tinyScreen

    const isEditDataModalOpen = appStore.isEditProfileModalOpen
    const currentUserEmail = authStore.email
    const isProfileDataLoaded = profileStore.isProfileDataLoaded
    const currentUserStatus = profileStore.currentUserStatus
    const currentUserProfileData = profileStore.currentUserProfileData
    const isStatusModalOpen = profileStore.isStatusModalOpen


    const handleCloseStatusModal = () => {
        profileStore.toggleStatusModal(false)
    }

    const handleOpenEditModal = (e: React.MouseEvent) => {
        e.stopPropagation()
        appStore.toggleIsEditProfileModalOpen(true)
    }
    const handleChangeStatus = (status: string) => {
        profileStore.updateStatus(status).finally(() => void 0)
    }

    // @ts-ignore
    const currentUsername = profileStore.currentUserProfileData?.fullName
    // @ts-ignore
    const currentUserAvatar = profileStore.currentUserProfileData?.photos?.large


    //Проверяем авторизацию пользователя, получаем данные пользователя если он авторизирован
    useEffect(() => {
        if (!isLoggedOutByUser) {
            initializeCurrentUser().then(() => void 0)
        }
    }, [isLogged]);

    useEffect(() => {
        if (apiError) {
            console.error(`Contacts developer for this error - ${apiError}`)
            enqueueSnackbar(`${apiError} . See console for details`, {

                autoHideDuration: 3000,
                variant: 'error',
            });
        }
    }, [apiError]);


    useEffect(() => {
        if (successMessage) {
            enqueueSnackbar(successMessage, {autoHideDuration: 1500})
            appStore.setSuccessMessage(null)
        }

    }, [successMessage]);


    //Подписуемся на изменения размеров экрана, переключая переменную smallScreen
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            appStore.toggleSmallScreen(screenWidth < 1000);
            appStore.toggleTinyScreen(screenWidth < 481)
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // проверяем размер экрана при первой загрузке компонента

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);


    // Закрываем модульное окно для редактирования данных
    const handleCloseModal = () => {
        isEditDataModalOpen && appStore.toggleIsEditProfileModalOpen(false)
    }

    if (!appStore.isInitialized) {
        return <Initialize/>
    }

    return (
        <BrowserRouter>
            <div className={`
              w-screen
        h-screen
        ${!isLogged && 'flex justify-center'}
            `}
                 onClick={handleCloseModal}
            >
                {isCurrentUserDataLoaded &&
                    <EditProfileModal
                        isCurrentUserDataLoaded={isCurrentUserDataLoaded}
                        isAvatarUpdating={isAvatarUpdating}
                        isUserDataUpdating={isUserDataUpdating}
                        currentUserProfileData={currentUserProfileData}
                        smallScreen={smallScreenMode}
                        // setIsOpen={setIsIsModalOpen}
                        isOpen={isEditDataModalOpen}/>}
                <StatusModal visible={isStatusModalOpen}
                             currentUserStatus={currentUserStatus}
                             onClose={handleCloseStatusModal}
                             handleChangeStatus={handleChangeStatus}/>
                <div className={`
                ${isLogged && `  
                mx-auto
                max-w-container
          container
            bg-blue-200
          min-h-full
          overflow-y-scroll`}
                    `}
                >
                    {isLogged && <Header
                        userId={userId}
                        handleOpenModal={handleOpenEditModal}
                        smallScreenMode={smallScreenMode}
                        avatar={currentUserAvatar}
                        currentUserName={currentUsername}
                        tinyScreenMode={tinyScreenMode}
                        isCurrentUserDataLoaded={isCurrentUserDataLoaded}/>
                    }
                    <div className={`
                         ${smallScreenMode ? 'p-0' : 'p-1'}
                        `}>
                        <div className={`
                    flex
                    justify-between
                    ${smallScreenMode ? 'flex-col' : 'pt-2'}
                    `}>
                            {isLogged && smallScreenMode && <div className={`
                            relative
                            w-full
                            h-12
                            `}>

                                {smallScreenMode && !isEditDataModalOpen &&
                                    <MobileNavbar currentUserId={currentUserId}/>}
                            </div>}
                            <Routes>
                                <Route path={rootRoute} element={<Navigate to={`/profile/${currentUserId}`}/>}/>
                                <Route path={authRoute} element={<AuthContainer isLogged={isLogged}
                                                                                smallScreenMode={smallScreenMode}/>}/>
                                <Route path={`/profile/:userid?`}
                                       element={<ProfilePage
                                           handleOpenModal={handleOpenEditModal}
                                           tinyScreenMode={tinyScreenMode}
                                           isLogged={isLogged}
                                           isCurrentUserDataLoaded={isCurrentUserDataLoaded}
                                           isProfileDataLoaded={isProfileDataLoaded}
                                           smallScreenMode={smallScreenMode}
                                           profileData={profileData}
                                           currentUserProfileData={currentUserProfileData}
                                           currentUserId={currentUserId}
                                           currentUserEmail={currentUserEmail}
                                           currentUserStatus={currentUserStatus}
                                       />}/>
                                <Route path={friendsRoute}
                                       element={<FriendsPageContainer mobileMode={smallScreenMode}
                                                                      isLogged={isLogged}
                                                                      tinyScreenMode={tinyScreenMode}

                                       />}/>
                                <Route path={usersRoute} element={<UsersContainer smallScreenMode={smallScreenMode}
                                                                                  tinyScreenMode={tinyScreenMode}
                                                                                  isLogged={isLogged}/>}/>
                                <Route path={infoRoute} element={<Info isLogged={isLogged}/>}/>
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </BrowserRouter>

    );
})

export default App;
