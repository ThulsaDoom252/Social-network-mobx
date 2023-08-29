import React from 'react';
import Header from "./components/Header";
import About from "./components/Profile/About";
import Profile from "./components/Profile/Profile";
import FriendsList from "./components/Profile/FriendsList";
import Friends from "./pages/Friends";
import 'bootstrap/dist/css/bootstrap.css';
import Users from "./pages/Users";
import Info from "./pages/Info";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";

function App() {


    return (
        <BrowserRouter>
            <div className='
    w-scren
    bg-white
    h-screen
    '>
                <div className='
            mx-auto
            max-w-container
      container
      h-full
      bg-blue-200
      '>
                    <Header/>
                    <div className='
                flex
                p-2
                justify-between

                '>
                        <Routes>
                            <Route path={'/profile'} element={<ProfilePage/>}/>
                            <Route path={'/friends'} element={<Friends/>}/>
                            <Route path={'/users'} element={<Users/>}/>
                            <Route path={'/info'} element={<Info/>}/>
                        </Routes>
                    </div>
                </div>
            </div>

        </BrowserRouter>

    );
}

export default App;
