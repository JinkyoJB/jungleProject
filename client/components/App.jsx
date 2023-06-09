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

function App() {
    return (
    <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/test2" element={<Test2 />} />
            <Route path="/test3" element={<Test3 />} />
            <Route path="/mypage" element={<Mypage />} />
        </Routes>
    </div>
)}

export default App;