import React from 'react';
import "./Header.scss";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
    <div className='header'>
        <nav>
            <span>Get the App</span>
            <div className='right'>
                <span>Investor Relations</span>
                <span>Add restaurant</span>
                <span>Log in</span>
                <sapn>Sign in</sapn>
            </div>
        </nav>
    </div>
    )
};

export default Header