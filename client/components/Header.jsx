import React from 'react';
import styled from 'styled-components'

import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SettingsIcon from '@material-ui/icons/Settings';
import AppsIcon from '@material-ui/icons/Apps';
import { Avatar } from '@material-ui/core'

const HeaderContainer = styled.div`
    display: grid;
    grid-template-columns: 33% auto 200px;
    align-items: center;
    padding: 5px 20px;
    height: 70px;
    border-bottom: 1px solid lightgray;
    margin-right: 30px;
`

const HeaderLogo = styled.div`
    display: flex;
    align-items: center;
    img {
        width:40px;
    }
    span{
        font-size:22px;
        margin-left:10px;
        color: black;
    }
`

const HeaderSearch = styled.div`
    display: flex;
    align-items: center;
    width: 500px;
    justify-content: center;
    background-color: whitesmoke;
    padding: 12px;
    border-radius: 10px;
    input {
        background-color: transparent;
        border: 0;
        outline: 0;
        flex: 1;
    }

`

const HeaderIcons = styled.div`
    display: flex;
    align-items: center;
    span {
        diplay: flex;
        align-items: center;
        margin-left: 10px;
    }
    svg.MuiSvgIcon-root { margin: 0px 10px; }
`

const Header = () => {
    return (
    <div className='header'>
        <HeaderContainer>
        <HeaderLogo>
            <span>🍇PhoDo</span>
        </HeaderLogo>
        <HeaderSearch>
            <SearchIcon />
            <input type="text" placeholder='Search in your PhoDo' />
            <FormatAlignCenterIcon />
        </HeaderSearch>
            <HeaderIcons>
                <span>
                    <HelpOutlineIcon />
                </span>
                <span>
                    <SettingsIcon />
                </span>
                <span>
                    <AppsIcon />
                </span>
                <span>
                    <Avatar />
                </span>
            </HeaderIcons>
        </HeaderContainer>
    </div>
    )
};

export default Header