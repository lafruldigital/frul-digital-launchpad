import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useRef, useState, Suspense } from "react";
import * as THREE from "three";
import logoAsset from "@/assets/frulcars-logo.jpg.asset.json";

function Coin({ hovered }: { hovered: boolean }) {
  const group = useRef<THREE.Group>(null);
  const texture = useTexture(logoAsset.url);
  texture.anisotropy = 8;

  useFrame((_, delta) => {
    if (!group.current) return;
    const target = hovered ? 3.2 : 0.35;
    // accelerate to target speed
    (group.current.userData.speed ??= 0.35);
    group.current.userData.speed += (target - group.current.userData.speed) * 0.08;
    group.current.rotation.y += delta * group.current.userData.speed;
  });

  return (
    <group ref={group}>
      {/* Edge of the coin */}
      <mesh>
        <cylinderGeometry args={[1.05, 1.05, 0.08, 64]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.85} roughness={0.35} />
      </mesh>
      {/* Front face */}
      <mesh position={[0, 0, 0.041]} rotation={[0, 0, 0]}>
        <circleGeometry args={[1.0, 64]} />
        <meshStandardMaterial map={texture} metalness={0.2} roughness={0.55} />
      </mesh>
      {/* Back face */}
      <mesh position={[0, 0, -0.041]} rotation={[0, Math.PI, 0]}>
        <circleGeometry args={[1.0, 64]} />
        <meshStandardMaterial map={texture} metalness={0.2} roughness={0.55} />
      </mesh>
    </group>
  );
}

export const FrulCarsLogo3D = ({ hovered }: { hovered: boolean }) => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 3.2], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 4]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-3, -2, 2]} intensity={1.4} color="#ef4444" />
      <Suspense fallback={null}>
        <group rotation={[0, 0, 0]}>
          <Coin hovered={hovered} />
        </group>
      </Suspense>
    </Canvas>
  );
};

function FallbackImage() {
  return (
    <img
      src={logoAsset.url}
      alt="FRUL'CARS"
      className="w-2/3 h-2/3 object-contain mx-auto"
    />
  );
}

export { FallbackImage as FrulCarsLogoFallback };