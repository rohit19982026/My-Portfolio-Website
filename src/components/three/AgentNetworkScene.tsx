"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { useInViewport } from "./useInViewport";

// Evenly distributes `count` points on a sphere of the given radius —
// cheap, deterministic, no randomness needed for a decorative node graph.
function fibonacciSphere(count: number, radius: number): [number, number, number][] {
  const points: [number, number, number][] = [];
  const offset = 2 / count;
  const increment = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * increment;
    points.push([Math.cos(phi) * r * radius, y * radius, Math.sin(phi) * r * radius]);
  }
  return points;
}

function Nodes({ accent, accent2, nodeCount, reduced }: { accent: string; accent2: string; nodeCount: number; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const points = useMemo(() => fibonacciSphere(nodeCount, 1.6), [nodeCount]);
  const edges = useMemo(() => {
    const es: [number, number][] = [];
    for (let i = 0; i < points.length; i++) {
      es.push([i, (i + 1) % points.length]);
      if (i % 2 === 0) es.push([i, (i + 3) % points.length]);
    }
    return es;
  }, [points]);
  const spokeIndices = useMemo(() => points.filter((_, i) => i % 2 === 0), [points]);

  useFrame((state, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.y += delta * 0.16;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.12;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[0.32, 1]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.9} roughness={0.25} metalness={0.15} />
      </mesh>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.075, 16, 16]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? accent2 : accent}
            emissive={i % 3 === 0 ? accent2 : accent}
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
      {edges.map(([a, b], i) => (
        <Line key={`edge-${i}`} points={[points[a], points[b]]} color={accent} transparent opacity={0.32} lineWidth={1} />
      ))}
      {spokeIndices.map((p, i) => (
        <Line key={`spoke-${i}`} points={[[0, 0, 0], p]} color={accent2} transparent opacity={0.16} lineWidth={1} />
      ))}
    </group>
  );
}

interface AgentNetworkSceneProps {
  accent?: string;
  accent2?: string;
  nodeCount?: number;
  className?: string;
}

// Orbiting node-and-edge network — a literal, decorative stand-in for "a
// network of AI agents". Fully unmounts off-screen (useInViewport) and
// freezes rotation under prefers-reduced-motion.
export default function AgentNetworkScene({ accent = "#0A84FF", accent2 = "#64D2FF", nodeCount = 9, className }: AgentNetworkSceneProps) {
  const { ref, inView } = useInViewport<HTMLDivElement>();
  const reduced = !!useReducedMotion();

  return (
    <div ref={ref} className={className} style={{ width: "100%", height: "100%", pointerEvents: "none" }} aria-hidden="true">
      {inView && (
        <Canvas
          dpr={[1, 1.75]}
          gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
          camera={{ position: [0, 0, 4.2], fov: 42 }}
        >
          <ambientLight intensity={0.7} />
          <pointLight position={[3, 3, 3]} intensity={40} color={accent} />
          <pointLight position={[-3, -2, -2]} intensity={20} color={accent2} />
          <Nodes accent={accent} accent2={accent2} nodeCount={nodeCount} reduced={reduced} />
        </Canvas>
      )}
    </div>
  );
}
