import {useEffect, useState } from "react";
import * as React from 'react';
import axios from 'axios';

//components
import Header from "../../components/Header.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Gallery from "../../components/Gallery.jsx";

const SERVER_URL = 'http:localhost:5000/api/todo';

function Mypage() {
    const [imgData, setImgData] = useState(null);

    const fetchData = async () => {
        const response = await axios.get(SERVER_URL);
        setImgData(response.data);
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    // const onSubmitHandler = async (e) => {
    //     e.preventDefault();
    //     const url = e.target.text.value;
    //     axios.post(SERVER_URL, { url });
    //     fetchData();
    // };

    return(
        <div className="Mypage">
            <Header />
            <Sidebar />
            {imgData.map((imgD) => (
                    <div key={(imgD.url)}>
                        <div>{ imgD.url }</div>
                    </div>
            ))}
            <Gallery />
        </div>
    );
}
export default Mypage;