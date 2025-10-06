import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { generateRocketTrajectory, RocketTrajectory } from '@/utils/dummyData';

const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Sphere ref={earthRef} args={[2, 64, 64]} position={[0, 0, 0]}>
      <meshStandardMaterial
        color="#4a90e2"
        emissive="#1a5f9f"
        emissiveIntensity={0.5}
        roughness={0.8}
      />
    </Sphere>
  );
};

interface RocketProps {
  trajectory: RocketTrajectory[];
  useDeviation: boolean;
}

const Rocket = ({ trajectory, useDeviation }: RocketProps) => {
  const rocketRef = useRef<THREE.Mesh>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useFrame(() => {
    if (rocketRef.current && currentIndex < trajectory.length - 1) {
      const point = trajectory[currentIndex];
      const coords = useDeviation ? point.deviation : point.original;
      rocketRef.current.position.set(coords[0], coords[1], coords[2]);
      
      // Look at next point
      const nextPoint = trajectory[currentIndex + 1];
      const nextCoords = useDeviation ? nextPoint.deviation : nextPoint.original;
      rocketRef.current.lookAt(new THREE.Vector3(nextCoords[0], nextCoords[1], nextCoords[2]));
      
      setCurrentIndex((prev) => (prev + 1) % trajectory.length);
    }
  });

  return (
    <mesh ref={rocketRef}>
      <coneGeometry args={[0.15, 0.5, 8]} />
      <meshStandardMaterial color="#ff6b6b" emissive="#ff0000" emissiveIntensity={0.5} />
    </mesh>
  );
};

const TrajectoryLines = ({ trajectory, useDeviation }: { trajectory: RocketTrajectory[], useDeviation: boolean }) => {
  const originalPoints = trajectory.map(p => new THREE.Vector3(...p.original));
  const deviationPoints = trajectory.map(p => new THREE.Vector3(...p.deviation));

  return (
    <>
      <Line
        points={originalPoints}
        color="#ff4444"
        lineWidth={2}
        transparent
        opacity={0.6}
      />
      {useDeviation && (
        <Line
          points={deviationPoints}
          color="#44ff44"
          lineWidth={2}
          transparent
          opacity={0.8}
        />
      )}
    </>
  );
};

const RocketSimulation3D = () => {
  const [showDeviation, setShowDeviation] = useState(false);
  const [trajectory, setTrajectory] = useState<RocketTrajectory[]>([]);

  useEffect(() => {
    setTrajectory(generateRocketTrajectory(showDeviation));
  }, [showDeviation]);

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold gradient-text">3D Rocket Simulation</h2>
          <Button
            onClick={() => setShowDeviation(!showDeviation)}
            className={showDeviation ? 'bg-success hover:bg-success/90' : ''}
          >
            {showDeviation ? 'Reset Trajectory' : 'Simulate Deviation'}
          </Button>
        </div>

        <div className="h-[600px] rounded-lg overflow-hidden bg-gradient-to-b from-background to-muted border">
          <Canvas camera={{ position: [10, 10, 10], fov: 50 }}>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Stars radius={100} depth={50} count={5000} factor={4} fade speed={1} />
            
            <Earth />
            {trajectory.length > 0 && (
              <>
                <Rocket trajectory={trajectory} useDeviation={showDeviation} />
                <TrajectoryLines trajectory={trajectory} useDeviation={showDeviation} />
              </>
            )}
            
            <OrbitControls
              enablePan
              enableZoom
              enableRotate
              minDistance={5}
              maxDistance={50}
            />
          </Canvas>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-destructive rounded" />
            <span>Original Trajectory</span>
          </div>
          {showDeviation && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-success rounded" />
              <span>Safe Deviation Path</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default RocketSimulation3D;
