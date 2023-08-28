import React from 'react';
import Header from "./components/Header";
import About from "./components/Profile/About";
import Profile from "./components/Profile/Profile";

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

                '>
                    <About/>
                    <Profile/>

                </div>


            </div>


        </div>
    );
}

export default App;
