'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { createNoise3D } from 'simplex-noise';
import * as THREE from 'three';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

// Particle system for the background
const ParticleField = () => {
  const mesh = useRef<THREE.Points>(null);
  const noise3D = createNoise3D();

  // Create particles
  const particleCount = 2000;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 20;
    positions[i3 + 1] = (Math.random() - 0.5) * 20; 
    positions[i3 + 2] = (Math.random() - 0.5) * 20;

    // Colors - purples and blues
    colors[i3] = 0.5 + Math.random() * 0.5; // R
    colors[i3 + 1] = 0.2 + Math.random() * 0.3; // G
    colors[i3 + 2] = 0.8 + Math.random() * 0.2; // B

    // Sizes
    sizes[i] = Math.random() * 0.1;
  }

  useFrame(({ clock }) => {
    if (!mesh.current) return;

    const time = clock.getElapsedTime() * 0.1;

    // Animate particles with noise
    const positions = mesh.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = positions[i3];
      const y = positions[i3 + 1];
      const z = positions[i3 + 2];
      
      // Apply noise-based movement using simplex-noise instead of noisejs
      positions[i3] += noise3D(x * 0.01, y * 0.01, time) * 0.003;
      positions[i3 + 1] += noise3D(x * 0.01, y * 0.01, time + 100) * 0.003;
      positions[i3 + 2] += noise3D(x * 0.01, y * 0.01, time + 200) * 0.003;
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate entire particle system slowly
    mesh.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
};

// Shader-based background for depth
const BackgroundPlane = () => {
  const { viewport } = useThree();
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (mesh.current) {
      // Subtle animation for the background
      mesh.current.material.uniforms.time.value = clock.getElapsedTime() * 0.2;
    }
  });

  // Custom shader material for the background
  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      resolution: { value: new THREE.Vector2(viewport.width, viewport.height) }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      uniform vec2 resolution;
      varying vec2 vUv;
      
      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }
      
      void main() {
        vec2 uv = vUv;
        
        // Create gradient
        vec3 color1 = vec3(0.0, 0.0, 0.2); // Dark blue
        vec3 color2 = vec3(0.3, 0.0, 0.5); // Purple
        
        float noiseVal = noise(uv * 10.0 + time * 0.1) * 0.03;
        float gradient = uv.y + noiseVal;
        
        vec3 color = mix(color1, color2, gradient);
        
        // Add some subtle noise
        float noise1 = noise(uv * 100.0 + time * 0.05) * 0.03;
        color += noise1;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  });

  return (
    <mesh ref={mesh} position={[0, 0, -5]}>
      <planeGeometry args={[50, 50]} />
      <primitive object={shaderMaterial} />
    </mesh>
  );
};

const Scene = () => {
  return (
    <>
      <BackgroundPlane />
      <ParticleField />
      <ambientLight intensity={0.2} />
      <EffectComposer>
        <Bloom 
          intensity={0.5} 
          luminanceThreshold={0.2} 
          luminanceSmoothing={0.9} 
        />
        <Vignette
          offset={0.5}
          darkness={0.5}
          eskil={false}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </>
  );
};

const ThreeDBackground = () => {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 70 }}>
      <Scene />
    </Canvas>
  );
};

export default ThreeDBackground;