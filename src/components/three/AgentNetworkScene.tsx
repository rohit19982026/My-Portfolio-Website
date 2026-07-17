"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { useInViewport } from "./useInViewport";
import { useScrollDrift } from "./useScrollDrift";

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

function NodeMesh({ position, color, reduced, phase }: { position: [number, number, number]; color: string; reduced: boolean; phase: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current || reduced) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 1.4 + phase) * 0.14;
    ref.current.scale.setScalar(s);
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.075, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.1} />
    </mesh>
  );
}

// A small glowing point that travels back and forth along an edge — the
// same "data flowing through the pipeline" idea already used elsewhere on
// the site (SolutionDesignTeaser's connector pulses), brought into 3D.
function TravelingPulse({ from, to, color, delay, reduced }: { from: [number, number, number]; to: [number, number, number]; color: string; delay: number; reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!ref.current || !mat.current) return;
    if (reduced) {
      ref.current.position.set(...from);
      mat.current.opacity = 0.6;
      return;
    }
    const t = ((state.clock.elapsedTime + delay) * 0.28) % 1;
    ref.current.position.set(
      THREE.MathUtils.lerp(from[0], to[0], t),
      THREE.MathUtils.lerp(from[1], to[1], t),
      THREE.MathUtils.lerp(from[2], to[2], t)
    );
    mat.current.opacity = Math.sin(Math.PI * t) * 0.95;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial ref={mat} color={color} emissive={color} emissiveIntensity={2.4} transparent opacity={0.8} />
    </mesh>
  );
}

function Nodes({ accent, accent2, nodeCount, reduced, interactive }: { accent: string; accent2: string; nodeCount: number; reduced: boolean; interactive: boolean }) {
  const group = useRef<THREE.Group>(null);
  const scrollDrift = useScrollDrift();
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
  const pulseEdges = useMemo(() => edges.slice(0, 3), [edges]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const pointer = interactive ? state.pointer : { x: 0, y: 0 };
    if (!reduced) {
      group.current.rotation.y += delta * 0.16;
    }
    const wobble = reduced ? 0 : Math.sin(t * 0.25) * 0.12;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, wobble + pointer.y * 0.2, 0.06);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, scrollDrift.current - pointer.x * 0.15, 0.06);
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[0.32, 1]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={1.1} roughness={0.25} metalness={0.15} />
      </mesh>
      {points.map((p, i) => (
        <NodeMesh key={i} position={p} color={i % 3 === 0 ? accent2 : accent} reduced={reduced} phase={i * 0.7} />
      ))}
      {edges.map(([a, b], i) => (
        <Line key={`edge-${i}`} points={[points[a], points[b]]} color={accent} transparent opacity={0.32} lineWidth={1} />
      ))}
      {spokeIndices.map((p, i) => (
        <Line key={`spoke-${i}`} points={[[0, 0, 0], p]} color={accent2} transparent opacity={0.16} lineWidth={1} />
      ))}
      {pulseEdges.map(([a, b], i) => (
        <TravelingPulse key={`pulse-${i}`} from={points[a]} to={points[b]} color={accent2} delay={i * 0.6} reduced={reduced} />
      ))}
      <Sparkles count={30} scale={2.6} size={1.6} speed={reduced ? 0 : 0.25} color={accent2} opacity={0.45} />
    </group>
  );
}

interface AgentNetworkSceneProps {
  accent?: string;
  accent2?: string;
  nodeCount?: number;
  className?: string;
  interactive?: boolean;
}

// Orbiting node-and-edge network with glow (bloom), ambient particle dust,
// and traveling data pulses along a few edges — a literal, decorative
// stand-in for "a network of AI agents". Fully unmounts off-screen
// (useInViewport) and freezes all motion under prefers-reduced-motion.
export default function AgentNetworkScene({ accent = "#0A84FF", accent2 = "#64D2FF", nodeCount = 9, className, interactive = false }: AgentNetworkSceneProps) {
  const { ref, inView } = useInViewport<HTMLDivElement>();
  const reduced = !!useReducedMotion();

  return (
    <div ref={ref} className={className} style={{ width: "100%", height: "100%", pointerEvents: interactive ? "auto" : "none" }} aria-hidden="true">
      {inView && (
        <Canvas
          dpr={[1, 1.75]}
          gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
          camera={{ position: [0, 0, 4.2], fov: 42 }}
        >
          <ambientLight intensity={0.7} />
          <pointLight position={[3, 3, 3]} intensity={40} color={accent} />
          <pointLight position={[-3, -2, -2]} intensity={20} color={accent2} />
          <Nodes accent={accent} accent2={accent2} nodeCount={nodeCount} reduced={reduced} interactive={interactive} />
          <EffectComposer enableNormalPass={false}>
            <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.9} intensity={1.1} mipmapBlur radius={0.6} />
          </EffectComposer>
        </Canvas>
      )}
    </div>
  );
}
