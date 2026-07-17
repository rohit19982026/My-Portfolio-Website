"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { useInViewport } from "./useInViewport";

function Blob({ color, reduced }: { color: string; reduced: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!mesh.current || reduced) return;
    mesh.current.rotation.y += delta * 0.12;
    mesh.current.rotation.x += delta * 0.05;
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.14;
  });

  return (
    <Sphere ref={mesh} args={[1, 64, 64]}>
      <MeshDistortMaterial
        color={color}
        distort={0.35}
        speed={reduced ? 0 : 1.4}
        roughness={0.05}
        metalness={0.1}
        transparent
        opacity={0.55}
      />
    </Sphere>
  );
}

interface GlassBlobSceneProps {
  color?: string;
  className?: string;
}

// A slow-drifting, liquid-glass distorted sphere — a literal 3D extension
// of the site's glass-material language (GlassSurface, Navbar). Purely
// decorative: unmounts off-screen, freezes under reduced motion.
export default function GlassBlobScene({ color = "#0A84FF", className }: GlassBlobSceneProps) {
  const { ref, inView } = useInViewport<HTMLDivElement>();
  const reduced = !!useReducedMotion();

  return (
    <div ref={ref} className={className} style={{ width: "100%", height: "100%", pointerEvents: "none" }} aria-hidden="true">
      {inView && (
        <Canvas
          dpr={[1, 1.75]}
          gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
          camera={{ position: [0, 0, 3.4], fov: 40 }}
        >
          <ambientLight intensity={0.9} />
          <pointLight position={[3, 2, 3]} intensity={30} color={color} />
          <pointLight position={[-2, -2, -2]} intensity={15} color="#ffffff" />
          <Blob color={color} reduced={reduced} />
        </Canvas>
      )}
    </div>
  );
}
