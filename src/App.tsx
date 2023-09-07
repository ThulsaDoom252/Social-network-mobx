import React, {useEffect, useState} from 'react';
import Header from "./components/Header";
import Friends from "./pages/Friends";
import Users from "./pages/Users";
import Info from "./pages/Info";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import MobileNavbar from "./components/MobileNavbar";
import {authRoute, friendsRoute, infoRoute, profileRoute, usersRoute} from "./common";
import EditProfileModal from "./components/EditProfileModal";
import authStore from "./mobx/auth/auth"
import profileStore from "./mobx/profile"
import appStore from "./mobx/app"
import {observer} from "mobx-react-lite";
import Auth from "./pages/Auth";
import {initializeProfile} from "./mobx/initializeProfile";

const App: React.FC = observer(() => {
    const isLogged = authStore.isLogged
    const profileData = profileStore.profileData
    const avatar = profileStore.currentUserAvatar
    const currentUsername = profileStore.profileData?.fullName
    const smallScreenMode = appStore.smallScreen
    const isModalOpen = appStore.isEditProfileModalOpen

    useEffect(() => {
        initializeProfile().then(() => void 0)
    }, []);


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


    const handleCloseModal = () => {
        isModalOpen && appStore.toggleIsEditProfileModalOpen(false)
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
                    smallScreen={smallScreenMode}
                    // setIsOpen={setIsIsModalOpen}
                    isOpen={isModalOpen}/>
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
                        smallScreenMode={smallScreenMode}
                        avatar={avatar}
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

                                {smallScreenMode && <MobileNavbar/>}
                            </div>}
                            <Routes>
                                <Route path={authRoute} element={<Auth isLogged={isLogged}
                                                                       smallScreenMode={smallScreenMode}/>}/>
                                <Route path={profileRoute}
                                       element={<ProfilePage isLogged={isLogged} smallScreenMode={smallScreenMode}/>}/>
                                <Route path={friendsRoute}
                                       element={<Friends mobileMode={smallScreenMode} isLogged={isLogged}/>}/>
                                <Route path={usersRoute} element={<Users isLogged={isLogged}/>}/>
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
