import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const Box = () => {
  const ref = useRef();
  useFrame(state => {
    ref.current.rotation.x += 0.02;
    ref.current.rotation.y += 0.01;
    
  })
  return(
    <mesh ref={ref}>
      <boxBufferGeometry/>
      <meshDepthMaterial color='blue'/>
    </mesh>
  )
}
// DEFINE APP AS FUNCTIONAL COMPONENT AND RENDER
const App = () => {
  return (
    <div style= {{height: '100vh', width: '100wh'}}>
      <Canvas style={{background: 'gray'}}>
          <Box/>
      </Canvas>
    </div>
  );
};

// EXPORT STATEMENT
export default App;

