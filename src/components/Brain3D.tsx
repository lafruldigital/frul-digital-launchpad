import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";
import frulLabAi from "@/assets/frul-lab-ai.png";

const reducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

function BrainMesh() {
  const coreRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    const s = reducedMotion ? 0.05 : 0.3;
    if (coreRef.current) coreRef.current.rotation.y += delta * s;
    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * s * 0.6;
      wireRef.current.rotation.x += delta * s * 0.15;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
      {/* Organic glowing core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1, 24]} />
        <MeshDistortMaterial
          color={new THREE.Color("#ff1a2e")}
          emissive={new THREE.Color("#ff0018")}
          emissiveIntensity={1.2}
          roughness={0.25}
          metalness={0.6}
          distort={reducedMotion ? 0.25 : 0.45}
          speed={reducedMotion ? 0.5 : 2.2}
        />
      </mesh>

      {/* Neural wireframe shell */}
      <mesh ref={wireRef} scale={1.18}>
        <icosahedronGeometry args={[1, 3]} />
        <meshBasicMaterial
          color={new THREE.Color("#ff5566")}
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Outer hazy aura */}
      <mesh scale={1.35}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={new THREE.Color("#ff0022")}
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>
    </Float>
  );
}

function hasWebGL() {
  if (typeof window === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl2") || c.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

export const Brain3D = () => {
  if (!hasWebGL()) {
    return (
      <img
        src={frulLabAi}
        alt="FRUL'LAB AI - Cerveau IA"
        className="w-full h-full object-contain drop-shadow-[0_0_40px_hsl(0_85%_50%/0.7)]"
      />
    );
  }

  return (
    <div className="w-full h-full">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 3.2], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.35} />
        <pointLight position={[0, 0, 0]} intensity={2.5} color="#ff0018" distance={6} />
        <pointLight position={[3, 2, 3]} intensity={1.2} color="#ff4060" />
        <pointLight position={[-3, -2, 2]} intensity={0.8} color="#ff8090" />
        <Suspense fallback={null}>
          <BrainMesh />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Brain3D;