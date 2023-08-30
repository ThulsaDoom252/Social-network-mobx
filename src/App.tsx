import React, {useEffect, useState} from 'react';
import Header from "./components/Header";
import Friends from "./pages/Friends";
import Users from "./pages/Users";
import Info from "./pages/Info";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import MobileNavbar from "./components/MobileNavbar";
import {friendsRoute, infoRoute, profileRoute, usersRoute} from "./common";
import EditProfileModal from "./components/EditProfileModal";
import Auth from "./pages/Auth";

function App() {
    const [smallScreenMode, toggleSmallScreenMode] = useState(false)
    const [isLogged, toggleLoggedStatus] = useState(false)
    const [isModalOpen, setIsIsModalOpen] = useState<boolean>(false)

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            toggleSmallScreenMode(screenWidth < 1000);
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // проверяем размер экрана при первой загрузке компонента

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);


    if (!isLogged) {
        return <Auth smallScreenMode={smallScreenMode} toggleLoggedStatus={toggleLoggedStatus}/>
    }

    const handleCloseModal = () => {
        isModalOpen && setIsIsModalOpen(false)
    }


    return (
        <BrowserRouter>
            <div className='
        w-scren
        h-screen
        '
                 onClick={handleCloseModal}
            >
                <EditProfileModal
                    smallScreen={smallScreenMode}
                    setIsOpen={setIsIsModalOpen}
                    isOpen={isModalOpen}/>
                <div className={`
                     mx-auto
                max-w-container
          container
            bg-blue-200
          min-h-full
          overflow-y-scroll
                    `}
                >
                    <Header
                        setIsOpen={setIsIsModalOpen}
                        smallScreenMode={smallScreenMode}
                        toggleLogOutStatus={toggleLoggedStatus}
                    />
                    <div className={`
                         ${smallScreenMode ? 'p-0' : 'p-1'}
                        `}>
                        <div className={`
                    flex
                    justify-between
                    ${smallScreenMode ? 'flex-col' : 'pt-2'}
                    `}>
                            {smallScreenMode && <div className={`
                            relative
                            w-full
                            h-12
                            `}>

                                {smallScreenMode && <MobileNavbar/>}
                            </div>}


                            <Routes>
                                <Route path={profileRoute} element={<ProfilePage smallScreenMode={smallScreenMode}/>}/>
                                <Route path={friendsRoute} element={<Friends mobileMode={smallScreenMode}/>}/>
                                <Route path={usersRoute} element={<Users/>}/>
                                <Route path={infoRoute} element={<Info/>}/>
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>

        </BrowserRouter>

    );
}

export default App;
