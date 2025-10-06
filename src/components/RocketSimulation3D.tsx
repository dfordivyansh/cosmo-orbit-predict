import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, Line } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { generateRocketTrajectory, generateWeatherZones, RocketTrajectory, WeatherZone } from '@/utils/dummyData';

// Enhanced Earth with realistic appearance
const Earth = () => {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0008;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      {/* Main Earth sphere */}
      <Sphere ref={earthRef} args={[2, 128, 128]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#1a4d7a"
          emissive="#0a2847"
          emissiveIntensity={0.3}
          roughness={0.7}
          metalness={0.2}
        />
      </Sphere>
      
      {/* Cloud layer */}
      <Sphere ref={cloudsRef} args={[2.05, 64, 64]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          roughness={1}
        />
      </Sphere>
      
      {/* Atmospheric glow */}
      <Sphere ref={atmosphereRef} args={[2.3, 64, 64]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#4a90e2"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
};

// Weather zones overlay on Earth
const WeatherZones = ({ zones, visible }: { zones: WeatherZone[], visible: boolean }) => {
  if (!visible) return null;
  
  const getColor = (severity: string) => {
    switch (severity) {
      case 'severe': return '#ff4444';
      case 'moderate': return '#ffaa44';
      case 'safe': return '#44ff44';
      default: return '#ffffff';
    }
  };

  return (
    <>
      {zones.map((zone, index) => (
        <Sphere key={index} args={[zone.radius, 32, 32]} position={zone.position}>
          <meshBasicMaterial
            color={getColor(zone.severity)}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
          />
        </Sphere>
      ))}
    </>
  );
};

// Particle system for cosmic dust and solar wind
const CosmicParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 2000;
  
  const positions = new Float32Array(particleCount * 3);
  const velocities = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    
    velocities[i * 3] = (Math.random() - 0.5) * 0.02;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
  }

  useFrame(() => {
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i * 3];
        positions[i * 3 + 1] += velocities[i * 3 + 1];
        positions[i * 3 + 2] += velocities[i * 3 + 2];
        
        // Reset particles that go too far
        if (Math.abs(positions[i * 3]) > 25) positions[i * 3] = (Math.random() - 0.5) * 50;
        if (Math.abs(positions[i * 3 + 1]) > 25) positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
        if (Math.abs(positions[i * 3 + 2]) > 25) positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#88ccff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Solar flare effect
const SolarFlare = ({ visible }: { visible: boolean }) => {
  const flareRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (flareRef.current && visible) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.3;
      flareRef.current.scale.set(scale, scale, scale);
    }
  });

  if (!visible) return null;

  return (
    <Sphere ref={flareRef} args={[0.5, 32, 32]} position={[8, 4, 2]}>
      <meshBasicMaterial
        color="#ff6600"
        transparent
        opacity={0.7}
      />
    </Sphere>
  );
};

// Enhanced rocket with metallic appearance
interface RocketProps {
  trajectory: RocketTrajectory[];
  pathType: 'original' | 'deviation' | 'alternative1' | 'alternative2';
  color: string;
  visible: boolean;
}

const Rocket = ({ trajectory, pathType, color, visible }: RocketProps) => {
  const rocketRef = useRef<THREE.Group>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useFrame(() => {
    if (rocketRef.current && visible && currentIndex < trajectory.length - 1) {
      const point = trajectory[currentIndex];
      const coords = point[pathType];
      rocketRef.current.position.set(coords[0], coords[1], coords[2]);
      
      // Look at next point
      const nextPoint = trajectory[currentIndex + 1];
      const nextCoords = nextPoint[pathType];
      rocketRef.current.lookAt(new THREE.Vector3(nextCoords[0], nextCoords[1], nextCoords[2]));
      
      setCurrentIndex((prev) => (prev + 1) % trajectory.length);
    }
  });

  if (!visible) return null;

  return (
    <group ref={rocketRef}>
      {/* Rocket body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4, 16]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Rocket nose cone */}
      <mesh position={[0, 0.25, 0]}>
        <coneGeometry args={[0.08, 0.15, 16]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.3}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </mesh>
      
      {/* Engine glow */}
      <pointLight position={[0, -0.3, 0]} intensity={0.5} color={color} distance={1} />
    </group>
  );
};

// Multiple trajectory paths
const TrajectoryLines = ({ 
  trajectory, 
  showAlternatives 
}: { 
  trajectory: RocketTrajectory[], 
  showAlternatives: boolean 
}) => {
  const originalPoints = trajectory.map(p => new THREE.Vector3(...p.original));
  const deviationPoints = trajectory.map(p => new THREE.Vector3(...p.deviation));
  const alt1Points = trajectory.map(p => new THREE.Vector3(...p.alternative1));
  const alt2Points = trajectory.map(p => new THREE.Vector3(...p.alternative2));

  return (
    <>
      {/* Original trajectory - Red */}
      <Line
        points={originalPoints}
        color="#ff4444"
        lineWidth={3}
        transparent
        opacity={0.7}
        dashed={false}
      />
      
      {showAlternatives && (
        <>
          {/* Safe deviation - Green */}
          <Line
            points={deviationPoints}
            color="#44ff44"
            lineWidth={3}
            transparent
            opacity={0.8}
          />
          
          {/* Alternative 1 - Yellow */}
          <Line
            points={alt1Points}
            color="#ffcc44"
            lineWidth={3}
            transparent
            opacity={0.8}
          />
          
          {/* Alternative 2 - Blue */}
          <Line
            points={alt2Points}
            color="#4488ff"
            lineWidth={3}
            transparent
            opacity={0.8}
          />
        </>
      )}
    </>
  );
};

const RocketSimulation3D = () => {
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [trajectory, setTrajectory] = useState<RocketTrajectory[]>([]);
  const [weatherZones] = useState<WeatherZone[]>(generateWeatherZones());
  const [selectedPath, setSelectedPath] = useState<'original' | 'deviation' | 'alternative1' | 'alternative2'>('original');

  useEffect(() => {
    setTrajectory(generateRocketTrajectory(showAlternatives));
  }, [showAlternatives]);

  const currentPoint = trajectory[Math.floor(trajectory.length * 0.5)] || trajectory[0];

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-2xl font-bold gradient-text">Ultra-Realistic 3D Rocket Simulation</h2>
          <Button
            onClick={() => setShowAlternatives(!showAlternatives)}
            className={showAlternatives ? 'shadow-glow-primary' : ''}
            size="lg"
          >
            {showAlternatives ? 'Reset Trajectories' : 'Simulate Deviation'}
          </Button>
        </div>

        {/* Info Panel */}
        {currentPoint && showAlternatives && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 glass-card rounded-lg">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Current Kp Index</p>
              <p className="text-lg font-bold">{currentPoint.kpIndex.toFixed(2)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Severity</p>
              <Badge variant={currentPoint.severity === 'high' ? 'destructive' : 'secondary'}>
                {currentPoint.severity.toUpperCase()}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Active Paths</p>
              <p className="text-lg font-bold">4</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Progress</p>
              <p className="text-lg font-bold">{Math.floor((currentPoint.time || 0) * 100)}%</p>
            </div>
          </div>
        )}

        <div className="h-[700px] rounded-lg overflow-hidden bg-gradient-to-b from-background via-background/95 to-muted border shadow-glow-accent">
          <Canvas camera={{ position: [12, 8, 12], fov: 50 }}>
            {/* Enhanced lighting */}
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
            <pointLight position={[-10, -5, -10]} intensity={0.5} color="#4a90e2" />
            <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
            
            {/* Star field */}
            <Stars radius={150} depth={100} count={8000} factor={5} fade speed={0.5} />
            
            {/* Cosmic particles */}
            <CosmicParticles />
            
            {/* Solar flare */}
            <SolarFlare visible={showAlternatives} />
            
            {/* Earth with zones */}
            <Earth />
            <WeatherZones zones={weatherZones} visible={showAlternatives} />
            
            {/* Trajectory lines */}
            {trajectory.length > 0 && (
              <>
                <TrajectoryLines trajectory={trajectory} showAlternatives={showAlternatives} />
                
                {/* Multiple rockets */}
                <Rocket 
                  trajectory={trajectory} 
                  pathType="original" 
                  color="#ff4444"
                  visible={!showAlternatives}
                />
                {showAlternatives && (
                  <>
                    <Rocket 
                      trajectory={trajectory} 
                      pathType="deviation" 
                      color="#44ff44"
                      visible={true}
                    />
                    <Rocket 
                      trajectory={trajectory} 
                      pathType="alternative1" 
                      color="#ffcc44"
                      visible={true}
                    />
                    <Rocket 
                      trajectory={trajectory} 
                      pathType="alternative2" 
                      color="#4488ff"
                      visible={true}
                    />
                  </>
                )}
              </>
            )}
            
            <OrbitControls
              enablePan
              enableZoom
              enableRotate
              minDistance={6}
              maxDistance={60}
              autoRotate={false}
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="flex items-center gap-2 p-2 glass-card rounded">
            <div className="w-6 h-1 bg-destructive rounded shadow-glow-primary" />
            <span>Original Path</span>
          </div>
          {showAlternatives && (
            <>
              <div className="flex items-center gap-2 p-2 glass-card rounded">
                <div className="w-6 h-1 bg-success rounded" />
                <span>Safe Deviation</span>
              </div>
              <div className="flex items-center gap-2 p-2 glass-card rounded">
                <div className="w-6 h-1 bg-warning rounded" />
                <span>Moderate Risk</span>
              </div>
              <div className="flex items-center gap-2 p-2 glass-card rounded">
                <div className="w-6 h-1 bg-info rounded" />
                <span>Optimal Efficiency</span>
              </div>
            </>
          )}
        </div>

        {/* Weather zones legend */}
        {showAlternatives && (
          <div className="p-4 glass-card rounded-lg">
            <h3 className="text-sm font-semibold mb-3">Space Weather Zones</h3>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-success/50 border border-success" />
                <span>Safe Zone</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-warning/50 border border-warning" />
                <span>Moderate Storm</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-destructive/50 border border-destructive" />
                <span>Severe Flare</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default RocketSimulation3D;
