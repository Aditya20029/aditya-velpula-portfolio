"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Float, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";
import * as THREE from "three";

/**
 * Chrome centerpiece:
 * - Icosahedron (geodesic sphere) with heavy subdivision so we get a
 *   faceted yet smooth-ish surface — far more organic than a torus-knot
 * - MeshPhysicalMaterial with iridescence + clearcoat
 * - Per-frame vertex displacement for a slow "breathing" liquid-metal
 *   deformation
 */
function ChromeCore() {
  const mesh = useRef(null);
  const material = useRef(null);
  const geom = useRef(null);

  // Clone the geometry's original positions so we can displace each frame
  const basePositions = useRef(null);

  useFrame(({ clock, mouse }) => {
    if (!mesh.current || !geom.current) return;
    const t = clock.getElapsedTime();

    // Cache initial positions once
    if (!basePositions.current) {
      basePositions.current = geom.current.attributes.position.array.slice();
    }
    const posAttr = geom.current.attributes.position;
    const base = basePositions.current;
    const amp = 0.06;
    // Low-cost sinusoidal displacement by vertex index
    for (let i = 0; i < posAttr.count; i++) {
      const ix = i * 3;
      const bx = base[ix];
      const by = base[ix + 1];
      const bz = base[ix + 2];
      const n =
        Math.sin(bx * 2 + t * 0.8) *
        Math.sin(by * 2 + t * 0.6) *
        Math.sin(bz * 2 + t * 0.7);
      posAttr.array[ix] = bx + bx * n * amp;
      posAttr.array[ix + 1] = by + by * n * amp;
      posAttr.array[ix + 2] = bz + bz * n * amp;
    }
    posAttr.needsUpdate = true;
    geom.current.computeVertexNormals();

    // Slow rotation
    mesh.current.rotation.y = t * 0.08;
    mesh.current.rotation.x = Math.sin(t * 0.1) * 0.12;

    // Cursor parallax (very subtle)
    mesh.current.position.x = THREE.MathUtils.lerp(
      mesh.current.position.x,
      mouse.x * 0.18,
      0.04
    );
    mesh.current.position.y = THREE.MathUtils.lerp(
      mesh.current.position.y,
      mouse.y * 0.12,
      0.04
    );

    if (material.current) {
      material.current.iridescenceThicknessRange = [
        120 + Math.sin(t * 0.4) * 80,
        520 + Math.cos(t * 0.25) * 140,
      ];
    }
  });

  return (
    <Float
      speed={0.9}
      rotationIntensity={0.15}
      floatIntensity={0.35}
      floatingRange={[-0.06, 0.06]}
    >
      <mesh ref={mesh} scale={0.95}>
        <icosahedronGeometry ref={geom} args={[1, 24]} />
        <meshPhysicalMaterial
          ref={material}
          color="#c8c6d0"
          metalness={0.92}
          roughness={0.28}
          iridescence={1}
          iridescenceIOR={1.55}
          iridescenceThicknessRange={[120, 520]}
          clearcoat={0.8}
          clearcoatRoughness={0.22}
          envMapIntensity={0.7}
        />
      </mesh>
    </Float>
  );
}

function OrbitalAccents() {
  const g = useRef(null);
  useFrame(({ clock }) => {
    if (!g.current) return;
    g.current.rotation.y = clock.getElapsedTime() * 0.25;
  });
  return (
    <group ref={g}>
      <mesh position={[1.8, 0.25, 0.2]} scale={0.05}>
        <sphereGeometry args={[1, 20, 20]} />
        <meshStandardMaterial
          color="#ff9ae6"
          emissive="#ff9ae6"
          emissiveIntensity={1.4}
          toneMapped
        />
      </mesh>
      <mesh position={[-1.7, -0.35, 0.3]} scale={0.04}>
        <sphereGeometry args={[1, 20, 20]} />
        <meshStandardMaterial
          color="#7cd4ff"
          emissive="#7cd4ff"
          emissiveIntensity={1.4}
          toneMapped
        />
      </mesh>
      <mesh position={[0.2, 1.6, 0.2]} scale={0.035}>
        <sphereGeometry args={[1, 20, 20]} />
        <meshStandardMaterial
          color="#ffd88a"
          emissive="#ffd88a"
          emissiveIntensity={1.2}
          toneMapped
        />
      </mesh>
    </group>
  );
}

/* Rich Lightformer cage — 6 colored lights surround the object so the
   iridescent chrome catches pink, teal, lilac, amber, mint, coral from
   every angle. No external HDR fetch — everything is procedural. */
function EnvCage() {
  return (
    <Environment resolution={512} background={false} frames={1}>
      <Lightformer
        intensity={0.25}
        color="#1b1c27"
        position={[0, 0, -6]}
        scale={[20, 20, 1]}
      />
      <Lightformer
        form="rect"
        intensity={4.5}
        color="#ff9ae6"
        position={[0, 4, 3]}
        rotation={[-Math.PI / 4, 0, 0]}
        scale={[7, 2.4, 1]}
      />
      <Lightformer
        form="rect"
        intensity={4}
        color="#7cd4ff"
        position={[-5, 0.5, 2]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[6, 6, 1]}
      />
      <Lightformer
        form="rect"
        intensity={4}
        color="#c4a7ff"
        position={[5, 0.5, 2]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[6, 6, 1]}
      />
      <Lightformer
        form="rect"
        intensity={2.5}
        color="#ffd88a"
        position={[0, -3.5, 1]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[9, 3, 1]}
      />
      <Lightformer
        form="rect"
        intensity={2.2}
        color="#8bf5d0"
        position={[0, 0, 5]}
        scale={[6, 6, 1]}
      />
      <Lightformer
        form="ring"
        intensity={2.5}
        color="#ffb48a"
        position={[2.5, 1.2, 4]}
        scale={1.6}
      />
    </Environment>
  );
}

function ParticleField() {
  return (
    <group>
      {/* Particles pushed outward so they don't cover the center where text sits */}
      <Sparkles
        count={140}
        scale={[8, 6, 5]}
        size={3}
        speed={0.22}
        opacity={0.6}
        color="#ffb6f0"
        position={[0, 0, 0]}
      />
      <Sparkles
        count={100}
        scale={[10, 8, 6]}
        size={4}
        speed={0.15}
        opacity={0.55}
        color="#9ee0ff"
      />
      <Sparkles
        count={70}
        scale={[13, 11, 8]}
        size={6}
        speed={0.1}
        opacity={0.4}
        color="#d6c4ff"
      />
      <Sparkles
        count={30}
        scale={[11, 9, 7]}
        size={5}
        speed={0.12}
        opacity={0.45}
        color="#ffd88a"
      />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      camera={{ position: [0, 0, 5.5], fov: 32 }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Heavier fog pulls the chrome into the background so text sits on top */}
      <fog attach="fog" args={["#07070d", 4, 10]} />

      <ambientLight intensity={0.12} />

      <EnvCage />
      <ChromeCore />
      <OrbitalAccents />
      <ParticleField />

      {/* Subtle bloom — catches only the very brightest highlights on the
          chrome + emissive orbs. Kept tight so it doesn't wash out into a
          viewport-wide halo. */}
      <EffectComposer multisampling={0} disableNormalPass>
        <Bloom
          intensity={0.22}
          luminanceThreshold={0.85}
          luminanceSmoothing={0.15}
          kernelSize={KernelSize.SMALL}
        />
      </EffectComposer>
    </Canvas>
  );
}
