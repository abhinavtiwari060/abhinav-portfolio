import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useEffect, Suspense } from 'react';
import { Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function ProfileCard() {
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

  const texture = useTexture(`/avatar.jpg`);

  useFrame((state) => {
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, mouse.current.y * 0.3, 0.05);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, mouse.current.x * 0.3, 0.05);
  });

  return (
    <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.8}>
      <group ref={meshRef}>
        
        {/* Glow neon ring around the 3D coin edge */}
        <mesh position={[0, 0, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.35, 1.35, 0.1, 64]} />
          <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.3} />
        </mesh>

        {/* Solid heavy base coin */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.3, 1.3, 0.15, 64]} />
          <meshStandardMaterial color="#0b0b1a" metalness={0.6} roughness={0.3} />
        </mesh>

        {/* Circular photo magically floating inside the frame */}
        <mesh position={[0, 0, 0.08]}>
          <circleGeometry args={[1.25, 64]} />
          <meshBasicMaterial map={texture} />
        </mesh>

      </group>
    </Float>
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
      <Suspense fallback={null}>
        <ProfileCard />
      </Suspense>
    </Canvas>
  );
}
