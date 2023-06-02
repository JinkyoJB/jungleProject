import quaka from '../stylesheets/quaka.jpeg'
import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';  
import { TextureLoader } from 'three';
import * as THREE from 'three';

const App = () => {
    // 장면
    const scene = new THREE.Scene();

    // 카메라
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);

    // 렌더러 
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.render(scene, camera);

    return (
      
    )
};


export default App;
