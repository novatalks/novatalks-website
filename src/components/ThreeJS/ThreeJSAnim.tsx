import React, { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import Model from './Model';

export default function ThreeJSAnim() {
  return (
    <Canvas>
      <Suspense fallback={null}>
        <Model position={[0, 0, -80]} />
      </Suspense>
    </Canvas>
  );
}
