import React from 'react';
import { Router, Route, Routes, Link } from 'react-router-dom';

//components
import Header from "../components/Header/Header.jsx"

//pages
import Home from "./Home";


function App() {
    return (
    <div className="App">
        <Header />
        <h1>test</h1>
        <nav>
            <ul>
                <li>
                    <Link to="/"> Home </Link>
                </li>
                <li>
                    <Link to="/Room"> Room </Link>
                </li>
            </ul>
        </nav>
    <Routes>
        <Route path="/" element={<Home />}/>
    </Routes>
    </div>
)
}
export default App;
