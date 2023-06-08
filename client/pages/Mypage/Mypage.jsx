import {useEffect, useState } from "react";
import * as React from 'react';

//components
import Header from "../../components/Header.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Gallery from "../../components/Gallery.jsx";

function Mypage() {
    // const [imgData, setImgData] = useState(null);

    // useEffect(() =>{
    // fetch('http://localhost:3000/api/mypage')
    //     .then((response) => response.json())
    //     .then((data) => setImgData(data));
    // }, []);


    return(
        <div className="Mypage">
            <Header />
            <Sidebar />
            <Gallery />
        </div>
    )
}
export default Mypage;