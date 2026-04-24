"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/**
 * Real WebGL version of the reel's hero: iridescent chrome centerpiece,
 * physically-based reflections + iridescence, GPU sparkle storm around it,
 * subtle cursor parallax on the camera.
 *
 * NOT a pixel match to Active Theory (that's months of custom shader work)
 * but uses Three.js's built-in iridescence + a procedural Lightformer rig
 * to get genuine PBR chrome with a reel-like feel.
 */

function ChromeKnot() {
  const mesh = useRef(null);
  const material = useRef(null);

  useFrame(({ clock, mouse }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.y = t * 0.12;
    mesh.current.rotation.x = Math.sin(t * 0.15) * 0.18;
    // Cursor parallax
    mesh.current.position.x = THREE.MathUtils.lerp(
      mesh.current.position.x,
      mouse.x * 0.35,
      0.05
    );
    mesh.current.position.y = THREE.MathUtils.lerp(
      mesh.current.position.y,
      mouse.y * 0.25,
      0.05
    );
    // Iridescence thickness drifts — makes the sheen feel alive
    if (material.current) {
      material.current.iridescenceThicknessRange = [
        100 + Math.sin(t * 0.5) * 60,
        500 + Math.cos(t * 0.3) * 120,
      ];
    }
  });

  return (
    <Float
      speed={1.1}
      rotationIntensity={0.25}
      floatIntensity={0.6}
      floatingRange={[-0.12, 0.12]}
    >
      <mesh ref={mesh} scale={1.05}>
        <torusKnotGeometry args={[1, 0.32, 220, 48, 2, 3]} />
        <meshPhysicalMaterial
          ref={material}
          color={"#e8e4f0"}
          metalness={1}
          roughness={0.08}
          iridescence={1}
          iridescenceIOR={1.7}
          iridescenceThicknessRange={[100, 500]}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={1.35}
        />
      </mesh>
    </Float>
  );
}

function InnerOrbs() {
  // Two small orbs orbiting the knot for extra depth
  const g = useRef(null);
  useFrame(({ clock }) => {
    if (!g.current) return;
    g.current.rotation.y = clock.getElapsedTime() * 0.4;
  });
  return (
    <group ref={g}>
      <mesh position={[1.7, 0.2, 0.3]} scale={0.08}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial
          color={"#ff9ae6"}
          emissive={"#ff9ae6"}
          emissiveIntensity={2.5}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[-1.6, -0.3, 0.4]} scale={0.06}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial
          color={"#7cd4ff"}
          emissive={"#7cd4ff"}
          emissiveIntensity={2.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

/**
 * Procedural HDRI via Lightformers — avoids fetching an external .hdr file
 * and gives us full control over the reflective environment colors.
 * The knot picks these up as pink/teal/lilac iridescent highlights.
 */
function EnvironmentRig() {
  return (
    <Environment resolution={256} background={false}>
      {/* Soft ambient dome */}
      <Lightformer
        intensity={0.35}
        color={"#23252e"}
        position={[0, 0, -6]}
        scale={[20, 20, 1]}
      />
      {/* Top key — pink */}
      <Lightformer
        form="rect"
        intensity={6}
        color={"#ff9ae6"}
        position={[0, 4, 3]}
        scale={[8, 2, 1]}
      />
      {/* Left rim — teal */}
      <Lightformer
        form="rect"
        intensity={5}
        color={"#7cd4ff"}
        position={[-5, 0, 2]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[6, 6, 1]}
      />
      {/* Right rim — lilac */}
      <Lightformer
        form="rect"
        intensity={5}
        color={"#c4a7ff"}
        position={[5, 0, 2]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[6, 6, 1]}
      />
      {/* Warm under-glow — amber */}
      <Lightformer
        form="rect"
        intensity={3}
        color={"#ffd88a"}
        position={[0, -4, 1]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[8, 3, 1]}
      />
    </Environment>
  );
}

/**
 * GPU particle cloud using drei's <Sparkles/>. Gives us the glittery haze
 * from the reel without hand-written shaders. Three layers at different
 * scales for depth.
 */
function ParticleField() {
  return (
    <group>
      {/* Inner dense sparkles around the knot */}
      <Sparkles
        count={220}
        scale={[5, 4, 4]}
        size={4}
        speed={0.35}
        opacity={0.85}
        color={"#ffb6f0"}
      />
      {/* Mid-layer teal */}
      <Sparkles
        count={140}
        scale={[8, 6, 5]}
        size={5}
        speed={0.2}
        opacity={0.7}
        color={"#9ee0ff"}
      />
      {/* Outer lilac drift */}
      <Sparkles
        count={90}
        scale={[12, 10, 8]}
        size={7}
        speed={0.12}
        opacity={0.45}
        color={"#d6c4ff"}
      />
      {/* A few amber highlights */}
      <Sparkles
        count={40}
        scale={[10, 8, 6]}
        size={6}
        speed={0.15}
        opacity={0.5}
        color={"#ffd88a"}
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
      camera={{ position: [0, 0, 5], fov: 38 }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Transparent background so the DOM glitter/aurora still reads through */}
      <color attach="background" args={["#00000000"]} />
      <fog attach="fog" args={["#07070d", 6, 14]} />

      <EnvironmentRig />

      <ChromeKnot />
      <InnerOrbs />
      <ParticleField />
    </Canvas>
  );
}
