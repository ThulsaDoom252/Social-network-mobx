import React from 'react';
import Header from "./components/Header";
import About from "./components/Profile/About";
import Profile from "./components/Profile/Profile";
import FriendsList from "./components/Profile/FriendsList";
import Friends from "./pages/Friends";
import 'bootstrap/dist/css/bootstrap.css';
import Users from "./pages/Users";

function App() {


    return (
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
                    <Users/>

                </div>


            </div>


        </div>
    );
}

export default App;
