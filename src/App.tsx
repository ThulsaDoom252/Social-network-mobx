import React from 'react';
import Header from "./components/Header";
import About from "./components/Profile/About";
import Profile from "./components/Profile/Profile";
import FriendsList from "./components/Profile/FriendsList";
import Friends from "./pages/Friends";
// import 'bootstrap/dist/css/bootstrap.css';
import Users from "./pages/Users";
import Info from "./pages/Info";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import MobileNavbar from "./components/MobileNavbar";
import {friendsRoute, infoRoute, profileRoute, usersRoute} from "./common";

function App() {

    const smallScreenMode: boolean = true


    return (
        <BrowserRouter>
            <div className='
    w-scren
    bg-white
    h-screen
    '>
                <div className={`
                 mx-auto
            max-w-container
      container
      min-h-full
      bg-blue-200
      overflow-y-s
      ${smallScreenMode && 'p-0'}
                
                `}
                >
                    <Header smallScreenMode={smallScreenMode}/>
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

        </BrowserRouter>

    );
}

export default App;
