import React from "react";
// import "./Login.scss";
// import LoginBox from "../../components/LoginBox.jsx";
import PasswordchangeBox from "../../components/PasswordchangeBox.jsx";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function PasswordChange() {
    const { token } = useParams();
    console.log(token);
    
    return (

        <div className="pwchange">
            <PasswordchangeBox/>
        </div>
    )
}
export default PasswordChange;