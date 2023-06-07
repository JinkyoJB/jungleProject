import React from 'react';
import { Router, Route, Routes, Link } from 'react-router-dom';

//components
import Header from "../components/Header/Header.jsx"


//pages
import Home from "./Home";
import Mypage from "../pages/Mypage/Mypage.jsx"

function App() {
    return (
    <div className="App">
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Mypage" element={<Mypage />} />
        </Routes>
    </div>
)
}
export default App;
