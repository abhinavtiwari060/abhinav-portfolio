import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import { MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedOrb() {
  const meshRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouse.current.y * 0.3, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.current.x * 0.3 + t * 0.15, 0.05);
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.15;
  });

  return (
    <Sphere ref={meshRef} args={[1.4, 100, 100]}>
      <MeshDistortMaterial
        color="#7c3aed"
        attach="material"
        distort={0.45}
        speed={2.5}
        roughness={0.1}
        metalness={0.8}
        emissive="#4c1d95"
        emissiveIntensity={0.4}
        wireframe={false}
      />
    </Sphere>
  );
}

function WireOrb() {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    ref.current.rotation.x = state.clock.getElapsedTime() * 0.15;
  });
  return (
    <Sphere ref={ref} args={[1.65, 18, 18]}>
      <meshBasicMaterial color="#06b6d4" wireframe opacity={0.15} transparent />
    </Sphere>
  );
}

export default function ThreeDOrb() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#a855f7" />
      <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#06b6d4" />
      <pointLight position={[0, 0, 3]} intensity={2} color="#a855f7" />
      <AnimatedOrb />
      <WireOrb />
    </Canvas>
  );
}
