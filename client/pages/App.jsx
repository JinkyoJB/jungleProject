import React from 'react';
import { Router, Route, Routes, Link } from 'react-router-dom';

//components
import Header from "../components/Header.jsx"


//pages
import Home from "./Home";
import Mypage from "../pages/Mypage/Mypage.jsx"
import Login from "./Login/Login.jsx"
import Forgotpw from "./Login/Forgotpw.jsx"
import Signup from "./Login/SignUp.jsx"
import PasswordChange from "./Login/PasswordChange.jsx"

function App() {
    return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Mypage" element={<Mypage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotPW" element={<Forgotpw />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/passwordchange" element={<PasswordChange />} />
        </Routes>
    </div>
)
}
export default App;
