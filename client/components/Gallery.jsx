import React from 'react';
import styled from 'styled-components';

import TitlebarBelowImageList from './TitlebarBelowImageList.jsx'

const GelleryContainer = styled.div`
    position: absolute;
    align-items: center;
    width:100vw;
    background-color: #F1E3E1;
    padding: 20px;
    bottom: 0px;
    left: 200px;
`

const Gallery = () => {
    return (
    <div className='gallery'>
        <GelleryContainer>
        <TitlebarBelowImageList />
        </GelleryContainer>
    </div>
    )
};

export default Gallery