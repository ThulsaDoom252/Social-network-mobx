import React, {useEffect} from 'react';
import Header from "./components/Header";
import Info from "./pages/Info";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import ProfilePage from "./pages/ProfileContainer";
import MobileNavbar from "./components/MobileNavbar";
import {authRoute, friendsRoute, infoRoute, rootRoute, usersRoute} from "./common";
import EditProfileModal from "./components/Profile/EditProfileModal";
import authStore from "./mobx/auth/auth"
import profileStore from "./mobx/profile"
import appStore from "./mobx/app"
import {observer} from "mobx-react-lite";
import Auth from "./pages/Auth";
import {initializeProfile} from "./mobx/initializeProfile";
import UsersContainer from "./pages/users/UsersContainer";
import Initialize from "./components/initialize";
import StatusModal from "./components/Profile/StatusModal";
import FriendsPageContainer from "./components/Friends/FriendsPageContainer";

const App: React.FC = observer(() => {
    const isLogged = authStore.isLogged
    const profileData = profileStore.profileData
    const isAvatarUpdating = profileStore.isAvatarUpdating
    const isUserDataUpdating = profileStore.isUserDataUpdating
    const isCurrentUserDataLoaded = profileStore.isCurrentUserDataLoaded

    const currentUserId = authStore.id
    const userId = profileStore.userId

    const smallScreenMode = appStore.smallScreen
    const isEditDataModalOpen = appStore.isEditProfileModalOpen
    const currentUserEmail = authStore.email
    const isProfileDataLoaded = profileStore.isProfileDataLoaded
    const currentUserStatus = profileStore.currentUserStatus
    const currentUserProfileData = profileStore.currentUserProfileData
    const isStatusModalOpen = profileStore.isStatusModalOpen


    const handleCloseStatusModal = () => {
        profileStore.toggleStatusModal(false)
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
        initializeProfile().then(() => void 0)
    }, []);


    //Подписуемся на изменения размеров экрана, переключая переменную smallScreen
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            appStore.toggleSmallScreen(screenWidth < 1000);
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
                <EditProfileModal
                    isCurrentUserDataLoaded={isCurrentUserDataLoaded}
                    isAvatarUpdating={isAvatarUpdating}
                    isUserDataUpdating={isUserDataUpdating}
                    currentUserProfileData={currentUserProfileData}
                    smallScreen={smallScreenMode}
                    // setIsOpen={setIsIsModalOpen}
                    isOpen={isEditDataModalOpen}/>
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
                        // setIsOpen={setIsIsModalOpen}
                        userId={userId}
                        smallScreenMode={smallScreenMode}
                        avatar={currentUserAvatar}
                        currentUserName={currentUsername}
                    />}
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

                                {smallScreenMode && <MobileNavbar currentUserId={currentUserId}/>}
                            </div>}
                            <Routes>
                                <Route path={rootRoute} element={<Navigate to={`/profile/${currentUserId}`}/>}/>
                                <Route path={authRoute} element={<Auth isLogged={isLogged}
                                                                       smallScreenMode={smallScreenMode}/>}/>
                                <Route path={`/profile/:userid?`}
                                       element={<ProfilePage
                                           isLogged={isLogged}
                                           isProfileDataLoaded={isProfileDataLoaded}
                                           smallScreenMode={smallScreenMode}
                                           profileData={profileData}
                                           currentUserId={currentUserId}
                                           currentUserEmail={currentUserEmail}
                                           currentUserStatus={currentUserStatus}
                                       />}/>
                                <Route path={friendsRoute}
                                       element={<FriendsPageContainer mobileMode={smallScreenMode}
                                                                      isLogged={isLogged}/>}/>
                                <Route path={usersRoute} element={<UsersContainer smallScreenMode={smallScreenMode} isLogged={isLogged}/>}/>
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
