import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

interface AnatomyModelProps {
  scrollY?: number;
  className?: string;
}

function JointNode({
  position,
  size = 0.12,
  color = "#5eead4",
}: {
  position: [number, number, number];
  size?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.elapsedTime;
      ref.current.scale.setScalar(1 + Math.sin(t * 1.5 + position[0] * 3) * 0.15);
    }
  });
  return (
    <Sphere ref={ref} position={position} args={[size, 16, 16]}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

function SkeletalFigure({ scrollY = 0 }: { scrollY?: number }) {
  const group = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    // Subtle rotation responding to mouse + scroll
    group.current.rotation.y =
      Math.sin(t * 0.3) * 0.15 + mouse.x * 0.3 + scrollY * 0.0002;
    group.current.rotation.x =
      Math.sin(t * 0.2) * 0.05 - mouse.y * 0.15 - scrollY * 0.0001;
    group.current.position.y = Math.sin(t * 0.5) * 0.08;
  });

  // Skeletal joints positions (anatomically inspired abstract positions)
  const joints = useMemo(
    () => [
      // Head
      { pos: [0, 2.4, 0] as [number, number, number], size: 0.22 },
      // Neck
      { pos: [0, 1.95, 0] as [number, number, number], size: 0.08 },
      // Shoulders
      { pos: [-0.65, 1.7, 0] as [number, number, number], size: 0.14 },
      { pos: [0.65, 1.7, 0] as [number, number, number], size: 0.14 },
      // Elbows
      { pos: [-0.95, 1.0, 0] as [number, number, number], size: 0.1 },
      { pos: [0.95, 1.0, 0] as [number, number, number], size: 0.1 },
      // Wrists
      { pos: [-1.15, 0.4, 0] as [number, number, number], size: 0.08 },
      { pos: [1.15, 0.4, 0] as [number, number, number], size: 0.08 },
      // Spine center
      { pos: [0, 1.0, -0.05] as [number, number, number], size: 0.1 },
      // Hips
      { pos: [-0.35, 0.1, 0] as [number, number, number], size: 0.14 },
      { pos: [0.35, 0.1, 0] as [number, number, number], size: 0.14 },
      // Knees
      { pos: [-0.4, -0.85, 0] as [number, number, number], size: 0.13 },
      { pos: [0.4, -0.85, 0] as [number, number, number], size: 0.13 },
      // Ankles
      { pos: [-0.4, -1.7, 0] as [number, number, number], size: 0.1 },
      { pos: [0.4, -1.7, 0] as [number, number, number], size: 0.1 },
    ],
    [],
  );

  // Bone connections (lines between joints)
  const bones = useMemo(() => {
    const connections: [number, number][] = [
      [0, 1], // head-neck
      [1, 2],
      [1, 3], // neck-shoulders
      [2, 4],
      [3, 5], // shoulders-elbows
      [4, 6],
      [5, 7], // elbows-wrists
      [1, 9], // neck-spine
      [9, 10],
      [9, 11], // spine-hips
      [11, 13],
      [12, 14], // hips-knees
      [13, 15],
      [14, 16], // knees-ankles
    ];
    return connections.map(([a, b]) => ({
      start: joints[a].pos,
      end: joints[b].pos,
    }));
  }, [joints]);

  return (
    <group ref={group} scale={0.85}>
      {/* Joints */}
      {joints.map((j, i) => (
        <JointNode key={i} position={j.pos} size={j.size} />
      ))}

      {/* Bones */}
      {bones.map((b, i) => {
        const start = new THREE.Vector3(...b.start);
        const end = new THREE.Vector3(...b.end);
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const length = start.distanceTo(end);
        const dir = end.clone().sub(start).normalize();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir,
        );
        return (
          <mesh key={i} position={mid} quaternion={quat}>
            <cylinderGeometry args={[0.025, 0.025, length, 8]} />
            <meshStandardMaterial
              color="#67e8f9"
              emissive="#0ea5b7"
              emissiveIntensity={0.4}
              roughness={0.3}
              metalness={0.9}
              transparent
              opacity={0.85}
            />
          </mesh>
        );
      })}

      {/* Central spine ring */}
      <mesh position={[0, 1.0, -0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.18, 0.22, 32]} />
        <meshBasicMaterial color="#5eead4" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* Scanning ring around figure */}
      <mesh position={[0, 0.3, 0]} rotation={[Math.PI / 2.5, 0, 0]}>
        <ringGeometry args={[1.7, 1.72, 64]} />
        <meshBasicMaterial color="#5eead4" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function ScanningRing() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.elapsedTime * 0.3;
      const t = clock.elapsedTime;
      ref.current.position.y = Math.sin(t * 0.5) * 0.4;
    }
  });
  return (
    <group>
      <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.1, 2.15, 64]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Particles({ count = 200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.5 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = radius * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.03;
      ref.current.rotation.x = clock.elapsedTime * 0.015;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#5eead4"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

function CentralOrb() {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh>
        <icosahedronGeometry args={[0.5, 1]} />
        <MeshDistortMaterial
          color="#0ea5b7"
          emissive="#5eead4"
          emissiveIntensity={0.3}
          distort={0.3}
          speed={1.2}
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.4}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export default function AnatomyModel({ scrollY = 0, className = "" }: AnatomyModelProps) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0.3, 5.5], fov: 45 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#5eead4" />
        <pointLight position={[-5, -2, 3]} intensity={0.6} color="#67e8f9" />
        <pointLight position={[0, 0, 5]} intensity={0.4} color="#a5f3fc" />
        <directionalLight position={[0, 5, 5]} intensity={0.3} />

        <SkeletalFigure scrollY={scrollY} />
        <ScanningRing />
        <Particles count={180} />
        <CentralOrb />
      </Canvas>
    </div>
  );
}
