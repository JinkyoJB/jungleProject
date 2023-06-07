import React from 'react';
import "./Header.scss";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
    <div className='header'>
        <nav>
            <span>Logo</span>
            <div className='right'>
                <span>Investor Relations</span>
                <span>Add restaurant</span>
                <sapn>Sign in</sapn>
            </div>
        </nav>
    </div>
    )
};

export default Header