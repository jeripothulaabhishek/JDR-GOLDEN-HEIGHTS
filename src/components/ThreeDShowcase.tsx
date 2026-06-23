'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// 3D Villa Model Component
function VillaModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Auto-rotation around Y axis
      groupRef.current.rotation.y += 0.003;
      
      // Smooth parallax tilt based on normalized mouse pointer coordinates
      const targetX = state.pointer.y * 0.15;
      const targetY = state.pointer.x * 0.2;
      
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
      // Blend auto-rotation and mouse panning
      groupRef.current.rotation.y += (targetY - (groupRef.current.rotation.y % (Math.PI * 2))) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base Platform / Plot Land */}
      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[4.2, 0.15, 3.2]} />
        <meshStandardMaterial 
          color="#0d0d0d" 
          roughness={0.8} 
          metalness={0.2}
          wireframe={false}
        />
      </mesh>
      
      {/* Base Platform Gold Border */}
      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[4.22, 0.16, 3.22]} />
        <meshBasicMaterial color="#d4af37" wireframe={true} />
      </mesh>

      {/* Villa Ground Floor Main Block */}
      <mesh position={[-0.6, -0.5, 0]}>
        <boxGeometry args={[2.4, 1.2, 2.2]} />
        <meshStandardMaterial 
          color="#161616" 
          roughness={0.5} 
          metalness={0.8} 
          transparent={true} 
          opacity={0.7}
        />
      </mesh>
      <mesh position={[-0.6, -0.5, 0]}>
        <boxGeometry args={[2.41, 1.21, 2.21]} />
        <meshBasicMaterial color="#d4af37" wireframe={true} opacity={0.3} transparent={true} />
      </mesh>

      {/* Ground Floor Large Glass Facade (Gold transparent) */}
      <mesh position={[-0.6, -0.5, 1.11]}>
        <planeGeometry args={[2.0, 1.0]} />
        <meshStandardMaterial 
          color="#c5a880" 
          roughness={0.1} 
          metalness={0.9} 
          transparent={true} 
          opacity={0.4} 
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* First Floor Cantilever Overhang Block (Apple-style architect offset) */}
      <mesh position={[0.4, 0.6, 0.2]}>
        <boxGeometry args={[2.2, 1.0, 2.0]} />
        <meshStandardMaterial 
          color="#1f1f1f" 
          roughness={0.4} 
          metalness={0.9} 
          transparent={true} 
          opacity={0.8}
        />
      </mesh>
      <mesh position={[0.4, 0.6, 0.2]}>
        <boxGeometry args={[2.21, 1.01, 2.01]} />
        <meshBasicMaterial color="#d4af37" wireframe={true} opacity={0.5} transparent={true} />
      </mesh>

      {/* First Floor Panoramic Window */}
      <mesh position={[0.4, 0.6, 1.21]}>
        <planeGeometry args={[1.8, 0.8]} />
        <meshStandardMaterial 
          color="#d4af37" 
          roughness={0.05} 
          metalness={0.95} 
          transparent={true} 
          opacity={0.5} 
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Thin Architectural Columns / Pillars */}
      {[
        [-1.6, -0.5, 0.9],
        [-1.6, -0.5, -0.9],
        [1.3, 0.1, 1.0],
        [1.3, 0.1, -1.0]
      ].map((pos, idx) => (
        <mesh key={idx} position={[pos[0], pos[1], pos[2]]}>
          <cylinderGeometry args={[0.04, 0.04, pos[1] > 0 ? 1.0 : 1.2, 8]} />
          <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Miniature Pool Area on Base */}
      <mesh position={[1.2, -1.12, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.2, 1.6]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          roughness={0.05} 
          metalness={0.9} 
          transparent={true} 
          opacity={0.6}
        />
      </mesh>
      {/* Pool border */}
      <mesh position={[1.2, -1.12, -0.5]}>
        <boxGeometry args={[1.22, 0.02, 1.62]} />
        <meshBasicMaterial color="#ffffff" wireframe={true} opacity={0.2} transparent={true} />
      </mesh>
    </group>
  );
}

export default function ThreeDShowcase() {
  return (
    <div className="w-full h-full relative" style={{ minHeight: '350px' }}>
      {/* 3D Canvas Container */}
      <Canvas eventSource={typeof document !== 'undefined' ? document.getElementById('hero') || undefined : undefined}>
        {/* Lights configuration */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#fff" />
        <directionalLight position={[-5, 8, -5]} intensity={1.2} color="#d4af37" />
        
        {/* Camera Setup */}
        <PerspectiveCamera makeDefault position={[0, 0.5, 5.5]} fov={50} />
        
        {/* Villa Model */}
        <VillaModel />

        {/* Orbit Controls (Interaction) - Disable zoom to prevent scroll hijacking */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}
