'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// 3D camera controller for flying transition physics
function CameraController({ activeIndex, controlsRef }: { activeIndex: number; controlsRef: any }) {
  const { camera } = useThree();
  
  // Custom camera position & lookAt target configs for JDR Scroll-Storytelling steps
  const cameraConfigs = [
    { pos: [0, 2.2, 4.5], target: [0, -0.4, 0] },         // Step 0: Hero / Overview
    { pos: [-2.0, 0.3, 2.4], target: [-1.8, -0.5, 1.2] },  // Step 1: Entrance Arch Focus
    { pos: [2.0, 1.8, -1.2], target: [1.8, -0.2, -2.5] },  // Step 2: Temple View Sightline Focus
    { pos: [1.2, 0.4, 1.0], target: [0.8, -0.4, 0.2] },   // Step 3: Clubhouse & Pool Focus
    { pos: [-1.2, 0.8, 1.5], target: [-0.6, -0.8, -0.4] }  // Step 4: Central Park & Avenues Focus
  ];

  const config = cameraConfigs[activeIndex] || cameraConfigs[0];

  useFrame(() => {
    // Smooth Lerp Position (spring transition physics)
    camera.position.x += (config.pos[0] - camera.position.x) * 0.05;
    camera.position.y += (config.pos[1] - camera.position.y) * 0.05;
    camera.position.z += (config.pos[2] - camera.position.z) * 0.05;

    if (controlsRef.current) {
      // Smooth Lerp Target
      const target = controlsRef.current.target;
      target.x += (config.target[0] - target.x) * 0.05;
      target.y += (config.target[1] - target.y) * 0.05;
      target.z += (config.target[2] - target.z) * 0.05;
      controlsRef.current.update();
    }
  });

  return null;
}

// Tree model primitive
function WireframeTree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.02, 0.03, 0.3, 8]} />
        <meshStandardMaterial color="#8b5a2b" roughness={0.9} />
      </mesh>
      {/* Foliage */}
      <mesh position={[0, 0.38, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial color="#baf033" wireframe={true} transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

// 3D Layout Model Component representing the actual JDR Plotted Asset
function JdrLayoutModel() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle auto-rotation on the overall layout when in default view
      groupRef.current.rotation.y += 0.0012;
      
      // Mouse-reactive parallax tilt physics
      const targetX = state.pointer.y * 0.08;
      const targetY = state.pointer.x * 0.1;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetY - (groupRef.current.rotation.y % (Math.PI * 2))) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base Platform / Plot Land boundaries */}
      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[4.2, 0.15, 3.2]} />
        <meshStandardMaterial 
          color="#060c09" 
          roughness={0.9} 
          metalness={0.1}
        />
      </mesh>
      
      {/* Platform Chartreuse/Gold Border grid line */}
      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[4.22, 0.16, 3.22]} />
        <meshBasicMaterial color="#baf033" wireframe={true} transparent opacity={0.25} />
      </mesh>

      {/* 60-FEET MAIN AVENUE ROAD */}
      <mesh position={[0, -1.12, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.18, 0.45]} />
        <meshStandardMaterial color="#111c16" roughness={0.9} />
      </mesh>
      {/* Yellow dashed lane marker */}
      <mesh position={[0, -1.11, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.18, 0.015]} />
        <meshBasicMaterial color="#baf033" transparent opacity={0.4} />
      </mesh>

      {/* CROSS ROAD */}
      <mesh position={[-0.4, -1.12, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.3, 3.16]} />
        <meshStandardMaterial color="#111c16" roughness={0.9} />
      </mesh>

      {/* GRAND ENTRANCE ARCH (Phase 1 Target) */}
      <group position={[-1.9, -1.12, 0.2]}>
        {/* Left Column */}
        <mesh position={[0, 0.4, -0.22]}>
          <boxGeometry args={[0.08, 0.8, 0.08]} />
          <meshStandardMaterial color="#baf033" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Right Column */}
        <mesh position={[0, 0.4, 0.22]}>
          <boxGeometry args={[0.08, 0.8, 0.08]} />
          <meshStandardMaterial color="#baf033" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Curved Header Arch */}
        <mesh position={[0, 0.8, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.08, 0.06, 0.52]} />
          <meshBasicMaterial color="#baf033" wireframe={true} />
        </mesh>
      </group>

      {/* CENTRAL PARK & GREEN ZONE (Phase 4 Target) */}
      <group position={[-1.1, -1.125, -0.5]}>
        {/* Park grass base */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.0, 1.4]} />
          <meshBasicMaterial color="#15342a" transparent opacity={0.8} />
        </mesh>
        {/* Park border */}
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[1.02, 0.01, 1.42]} />
          <meshBasicMaterial color="#baf033" wireframe={true} transparent opacity={0.3} />
        </mesh>
        {/* Mini wireframe trees */}
        <WireframeTree position={[-0.3, 0, -0.4]} />
        <WireframeTree position={[0, 0, -0.4]} />
        <WireframeTree position={[0.3, 0, -0.4]} />
        <WireframeTree position={[-0.3, 0, 0.4]} />
        <WireframeTree position={[0, 0, 0.4]} />
        <WireframeTree position={[0.3, 0, 0.4]} />
      </group>

      {/* CLUBHOUSE & POOL (Phase 3 Target) */}
      <group position={[0.8, -1.12, -0.4]}>
        {/* Clubhouse Glass Pavilion Building */}
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.9, 0.7, 0.8]} />
          <meshStandardMaterial color="#0c1713" transparent opacity={0.65} metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Clubhouse gold outline */}
        <mesh position={[0, 0.35, 0]}>
          <boxGeometry args={[0.92, 0.72, 0.82]} />
          <meshBasicMaterial color="#baf033" wireframe={true} transparent opacity={0.4} />
        </mesh>
        
        {/* Swimming Pool */}
        <mesh position={[0.7, 0.005, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.4, 0.6]} />
          <meshStandardMaterial color="#0ea5e9" metalness={0.9} roughness={0.05} transparent opacity={0.7} />
        </mesh>
        <mesh position={[0.7, 0.005, 0.1]}>
          <boxGeometry args={[0.42, 0.01, 0.62]} />
          <meshBasicMaterial color="#ffffff" wireframe opacity={0.3} />
        </mesh>
      </group>

      {/* SIGHTLINE TO YADADRI TEMPLE (Phase 2 Target) */}
      <group position={[1.5, -1.12, -1.1]}>
        {/* Elevated plot hill zone */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.4, 0.5, 0.2, 8]} />
          <meshStandardMaterial color="#0c2016" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.41, 0.51, 0.21, 8]} />
          <meshBasicMaterial color="#baf033" wireframe opacity={0.2} />
        </mesh>
        
        {/* Floating Sightline Ray */}
        <line>
          <bufferGeometry attach="geometry" onUpdate={(self) => {
            const points = [
              new THREE.Vector3(0, 0.15, 0),
              new THREE.Vector3(0.5, 0.8, -1.5)
            ];
            self.setFromPoints(points);
          }} />
          <lineBasicMaterial attach="material" color="#baf033" linewidth={2} transparent opacity={0.6} />
        </line>

        {/* Outer Temple Gopuram outline silhouette in distance */}
        <group position={[0.5, 0.8, -1.5]}>
          {/* Temple base */}
          <mesh position={[0, 0.1, 0]}>
            <boxGeometry args={[0.4, 0.2, 0.4]} />
            <meshBasicMaterial color="#baf033" wireframe={true} />
          </mesh>
          {/* Gopuram tier 1 */}
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[0.3, 0.15, 0.3]} />
            <meshBasicMaterial color="#baf033" wireframe={true} />
          </mesh>
          {/* Gopuram tier 2 */}
          <mesh position={[0, 0.38, 0]}>
            <boxGeometry args={[0.2, 0.12, 0.2]} />
            <meshBasicMaterial color="#baf033" wireframe={true} />
          </mesh>
          {/* Kalasam spire */}
          <mesh position={[0, 0.5, 0]}>
            <coneGeometry args={[0.06, 0.15, 4]} />
            <meshBasicMaterial color="#baf033" wireframe={true} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

interface ThreeDShowcaseProps {
  activeIndex?: number;
}

export default function ThreeDShowcase({ activeIndex = 0 }: ThreeDShowcaseProps) {
  const controlsRef = useRef<any>(null);

  return (
    <div className="w-full h-full relative" style={{ minHeight: '350px' }}>
      {/* 3D Canvas Container */}
      <Canvas eventSource={typeof document !== 'undefined' ? document.getElementById('hero') || undefined : undefined}>
        {/* Lights configuration */}
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#fff" />
        <directionalLight position={[-5, 8, -5]} intensity={1.4} color="#baf033" />
        
        {/* Camera Setup */}
        <PerspectiveCamera makeDefault position={[0, 2.2, 4.5]} fov={45} />
        
        {/* Animated Camera controller listening to scroll/carousel indices */}
        <CameraController activeIndex={activeIndex} controlsRef={controlsRef} />
        
        {/* Stylized JDR Plotted Layout Model */}
        <JdrLayoutModel />

        {/* Orbit Controls (Interaction) */}
        <OrbitControls 
          ref={controlsRef}
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}
