"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Sparkles, Sphere } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { useInViewport } from "./useInViewport";
import { useScrollDrift } from "./useScrollDrift";

function Blob({ color, reduced, interactive }: { color: string; reduced: boolean; interactive: boolean }) {
  const group = useRef<THREE.Group>(null);
  const scrollDrift = useScrollDrift();

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const pointer = interactive ? state.pointer : { x: 0, y: 0 };
    if (!reduced) {
      group.current.rotation.y += delta * 0.13;
      group.current.rotation.x += delta * 0.05;
      group.current.position.y = Math.sin(t * 0.6) * 0.14;
    }
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, scrollDrift.current + pointer.x * 0.12, 0.06);
  });

  return (
    <group ref={group}>
      {/* glass core — real refraction/transmission, not a flat distort shader */}
      <Sphere args={[1, 96, 96]}>
        <MeshTransmissionMaterial
          color={color}
          distortion={0.4}
          distortionScale={0.5}
          temporalDistortion={reduced ? 0 : 0.15}
          thickness={1.2}
          roughness={0.08}
          chromaticAberration={0.04}
          anisotropy={0.15}
          samples={4}
          resolution={192}
          transmission={1}
          ior={1.3}
        />
      </Sphere>
      {/* soft outer rim glow — additive, cheap fresnel stand-in */}
      <Sphere args={[1.14, 32, 32]}>
        <meshBasicMaterial color={color} transparent opacity={0.12} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
      </Sphere>
      <Sparkles count={36} scale={2.6} size={2} speed={reduced ? 0 : 0.3} color={color} opacity={0.5} />
    </group>
  );
}

interface GlassBlobSceneProps {
  color?: string;
  className?: string;
  interactive?: boolean;
}

// A slow-drifting, real-refraction liquid-glass sphere (drei's
// MeshTransmissionMaterial) wrapped in a soft additive rim glow and ambient
// sparkle dust, with bloom post-processing — the site's glass-material
// language taken into actual 3D. Unmounts off-screen, freezes under
// reduced motion.
export default function GlassBlobScene({ color = "#0A84FF", className, interactive = false }: GlassBlobSceneProps) {
  const { ref, inView } = useInViewport<HTMLDivElement>();
  const reduced = !!useReducedMotion();

  return (
    <div ref={ref} className={className} style={{ width: "100%", height: "100%", pointerEvents: interactive ? "auto" : "none" }} aria-hidden="true">
      {inView && (
        <Canvas
          dpr={[1, 1.75]}
          gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
          camera={{ position: [0, 0, 3.4], fov: 40 }}
        >
          <ambientLight intensity={0.9} />
          <pointLight position={[3, 2, 3]} intensity={30} color={color} />
          <pointLight position={[-2, -2, -2]} intensity={15} color="#ffffff" />
          <Blob color={color} reduced={reduced} interactive={interactive} />
          <EffectComposer enableNormalPass={false}>
            <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={0.9} mipmapBlur radius={0.6} />
          </EffectComposer>
        </Canvas>
      )}
    </div>
  );
}
