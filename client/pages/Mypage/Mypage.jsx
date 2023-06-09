import React from "react";

//components
import Header from "../../components/Header.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Gallery from "../../components/Gallery.jsx";

function Mypage() {
    return(
        <div className="Mypage">
            <Header />
            <Sidebar />
            <Gallery />
        </div>
    )
}
export default Mypage;