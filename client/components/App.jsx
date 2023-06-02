import quaka from '../stylesheets/quaka.jpeg'
import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';  
import { TextureLoader } from 'three';

const Box = ({ handleClick }) => {
  const ref = useRef();
  useFrame(state => {
    ref.current.rotation.x += 0.001;
    ref.current.rotation.y += 0.001;
  });

  const texture = new TextureLoader().load(quaka);

  return (
    <mesh ref={ref} onClick={handleClick}>
      <boxBufferGeometry />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
};

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const loginRef = useRef();

  const handleClickBox = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  useEffect(() => {
    if (showLogin) {
      loginRef.current.focus();
    }
  }, [showLogin]);

  return (
    <div style={{ height: '100vh', width: '100wh' }}>
      <Canvas>
        <OrbitControls/>
        <ambientLight intensity={0.1} />
        <directionalLight position={[0, 0, 2]} />
        <Box handleClick={handleClickBox} />
      </Canvas>

      {showLogin && (
        <div className="login-modal" style={styles.loginModal}>
          <div className="login-content" style={styles.loginContent} ref={loginRef} tabIndex={-1}>
            {/* Your login form or content goes here */}
            <h2>Login</h2>
            <form>
              {/* Login form fields */}
              <button onClick={handleCloseLogin}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  loginModal: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(0, 0, 0, 0.5)',
    width: '400px',
    padding: '20px',
    borderRadius: '4px',
    zIndex: '9999',
  },
  loginContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
};

export default App;
