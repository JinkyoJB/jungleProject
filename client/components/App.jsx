//npm install react-router-dom

import React from 'react';
import { Routes, Route } from "react-router-dom"
import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query"

//pages
import Home from "../pages/Home.jsx";
import Mypage from "../pages/Mypage.jsx"
import Test from "../pages/Test.jsx"
import Test2 from "../pages/Test2.jsx"
import Test3 from "../pages/Test3.jsx"

//hojun
import Login from "../pages/Login/Login.jsx"
import Forgotpw from "../pages/Login/Forgotpw.jsx"
import Signup from "../pages/Login/SignUp.jsx"
import PasswordChange from "../pages/Login/PasswordChange.jsx"
import { useParams } from 'react-router-dom';

function App() {

    return (
    <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/test2" element={<Test2 />} />
            <Route path="/test3" element={<Test3 />} />
            <Route path="/mypage" element={<Mypage />} />

            <Route path="/login" element={<Login />} />
            <Route path="/forgotPW" element={<Forgotpw />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset/:token" element={<PasswordChange />} />
        </Routes>
    </div>
)}

export default App;