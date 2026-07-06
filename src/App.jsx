import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Import your music file here! Make sure the path matches your project structure.
import romanticMusic from './assets/romantic-music.mp3'; 

// --- OPTIMIZED BACKGROUND FIREWORKS ---
const FireworkBurst = ({ startPosition, color, delay }) => {
  const pointsRef = useRef();
  
  const [positions] = useMemo(() => {
    const count = 600; 
    const pos = new Float32Array(count * 3);
    for(let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      
      const r = 0.8 + Math.random() * 0.2; 
      
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return [pos];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const localTime = (time - delay) % 4; 
    
    if (pointsRef.current) {
      if (localTime < 0) {
        pointsRef.current.scale.set(0, 0, 0);
        return;
      }
      
      const easeOut = 1 - Math.pow(1 - (localTime / 4), 4);
      const scale = easeOut * 10; 
      pointsRef.current.scale.set(scale, scale, scale);

      pointsRef.current.position.y = startPosition[1] - (localTime * localTime * 0.5);

      const opacity = Math.max(0, 1 - (localTime / 3));
      pointsRef.current.material.opacity = opacity * 0.8;
    }
  });

  return (
    <points position={startPosition} ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={600} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.06} 
        color={color} 
        transparent 
        blending={THREE.AdditiveBlending} 
        depthWrite={false} 
      />
    </points>
  );
};

const FireworksSystem = () => {
  return (
    <group>
      <FireworkBurst startPosition={[-8, 6, -15]} color="#ff006e" delay={0.5} />
      <FireworkBurst startPosition={[10, 8, -20]} color="#ffb703" delay={1.8} />
      <FireworkBurst startPosition={[-5, 10, -18]} color="#00f5d4" delay={2.6} />
      <FireworkBurst startPosition={[7, 5, -16]} color="#8338ec" delay={3.4} />
      <FireworkBurst startPosition={[0, 9, -25]} color="#ffffff" delay={4.1} />
      <FireworkBurst startPosition={[-8, 6, -15]} color="#ff006e" delay={0.5} />
      <FireworkBurst startPosition={[10, 8, -20]} color="#ffb703" delay={1.8} />
      <FireworkBurst startPosition={[-5, 10, -18]} color="#00f5d4" delay={2.6} />
      <FireworkBurst startPosition={[7, 5, -16]} color="#8338ec" delay={3.4} />
      <FireworkBurst startPosition={[0, 9, -25]} color="#ffffff" delay={4.1} />
    </group>
  );
};

// --- THE ULTIMATE 5-MILLION PARTICLE BOUQUET ---
const DetailedBouquet = ({ particleCount = 5000000 }) => {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const posArray = new Float32Array(particleCount * 3);
    const colArray = new Float32Array(particleCount * 3);
    
    const cRoseDeep = new THREE.Color('#9d0208');
    const cRoseRed = new THREE.Color('#ff1919');
    const cRosePink = new THREE.Color('#d375ff');
    const cYellowBloom = new THREE.Color('#ffb703');
    const cWhiteBreath = new THREE.Color('#000000');
    const cStemGreen = new THREE.Color('#1b4332');
    const cLeafSilver = new THREE.Color('#74c69d');

    const countRoses = Math.floor(particleCount * 0.45);
    const countYellow = Math.floor(particleCount * 0.15); 
    const countWhite = Math.floor(particleCount * 0.15);  
    const countStems = particleCount - (countRoses + countYellow + countWhite); 

    let offset = 0;

    const numRoses = 24; 
    const roseCenters = Array.from({ length: numRoses }, (_, i) => {
      const phi = Math.acos(1 - 2 * (i + 0.5) / numRoses);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const rad = 1.0 + Math.random() * 0.8;
      return {
        x: Math.cos(theta) * Math.sin(phi) * rad,
        y: 1.5 + Math.cos(phi) * 0.8,
        z: Math.sin(theta) * Math.sin(phi) * rad,
        colorBase: Math.random() > 0.5 ? cRosePink : (Math.random() > 0.5 ? cRoseRed : cRoseDeep)
      };
    });

    const numYellow = 18;
    const yellowCenters = Array.from({ length: numYellow }, (_, i) => {
      const angle = (i / numYellow) * Math.PI * 2 + Math.random();
      const rad = 1.6 + Math.random() * 0.8;
      return {
        x: Math.cos(angle) * rad,
        y: 1.2 + Math.random() * 1.5,
        z: Math.sin(angle) * rad,
      };
    });

    const allCenters = [...roseCenters, ...yellowCenters];

    // ROSES
    for (let i = 0; i < countRoses; i++) {
      const rose = roseCenters[i % numRoses];
      const u = Math.random();
      const v = Math.random();
      const angle = v * Math.PI * 60; 
      const radius = Math.pow(u, 0.5) * 0.55; 
      const height = Math.cos(radius * Math.PI * 3) * 0.15; 

      posArray[offset * 3] = rose.x + Math.cos(angle) * radius;
      posArray[offset * 3 + 1] = rose.y + height;
      posArray[offset * 3 + 2] = rose.z + Math.sin(angle) * radius;

      const mix = Math.min(1, radius * 2.0);
      const finalColor = rose.colorBase.clone().lerp(cRoseDeep, 1 - mix);
      colArray[offset * 3] = finalColor.r; colArray[offset * 3 + 1] = finalColor.g; colArray[offset * 3 + 2] = finalColor.b;
      offset++;
    }

    // YELLOW BLOOMS
    for (let i = 0; i < countYellow; i++) {
      const center = yellowCenters[i % numYellow];
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const radius = 0.22 * Math.cbrt(Math.random()); 

      posArray[offset * 3] = center.x + radius * Math.sin(phi) * Math.cos(theta);
      posArray[offset * 3 + 1] = center.y + radius * Math.sin(phi) * Math.sin(theta);
      posArray[offset * 3 + 2] = center.z + radius * Math.cos(phi);

      colArray[offset * 3] = cYellowBloom.r; colArray[offset * 3 + 1] = cYellowBloom.g; colArray[offset * 3 + 2] = cYellowBloom.b;
      offset++;
    }

    // BABY'S BREATH
    for (let i = 0; i < countWhite; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 0.5 + Math.random() * 2.5;
      const height = 0.5 + Math.random() * 2.2;

      posArray[offset * 3] = Math.cos(angle) * dist + (Math.random() - 0.5) * 0.3;
      posArray[offset * 3 + 1] = height + (Math.random() - 0.5) * 0.3;
      posArray[offset * 3 + 2] = Math.sin(angle) * dist + (Math.random() - 0.5) * 0.3;

      const intensity = 0.7 + Math.random() * 0.3;
      colArray[offset * 3] = cWhiteBreath.r * intensity; colArray[offset * 3 + 1] = cWhiteBreath.g * intensity; colArray[offset * 3 + 2] = cWhiteBreath.b * intensity;
      offset++;
    }

    // STEMS
    for (let i = 0; i < countStems; i++) {
      const target = allCenters[Math.floor(Math.random() * allCenters.length)];
      const t = Math.pow(Math.random(), 0.8); 
      
      const baseRadius = 0.25;
      const baseAngle = Math.random() * Math.PI * 2;
      const baseX = Math.cos(baseAngle) * baseRadius;
      const baseY = -2.5; 
      const baseZ = Math.sin(baseAngle) * baseRadius;

      let x = baseX + (target.x - baseX) * t;
      let y = baseY + (target.y - baseY) * t;
      let z = baseZ + (target.z - baseZ) * t;

      const curve = Math.sin(t * Math.PI) * 0.4;
      x += (Math.random() - 0.5) * curve;
      z += (Math.random() - 0.5) * curve;

      if (Math.random() > 0.9 && t > 0.3 && t < 0.8) {
          x += (Math.random() - 0.5) * 1.5; z += (Math.random() - 0.5) * 1.5; y += (Math.random() - 0.5) * 0.5;
          colArray[offset * 3] = cLeafSilver.r; colArray[offset * 3 + 1] = cLeafSilver.g; colArray[offset * 3 + 2] = cLeafSilver.b;
      } else {
          const intensity = 0.4 + Math.random() * 0.6;
          colArray[offset * 3] = cStemGreen.r * intensity; colArray[offset * 3 + 1] = cStemGreen.g * intensity; colArray[offset * 3 + 2] = cStemGreen.b * intensity;
      }
      
      posArray[offset * 3] = x; posArray[offset * 3 + 1] = y; posArray[offset * 3 + 2] = z;
      offset++;
    }
    
    return [posArray, colArray];
  }, [particleCount]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      const bloomDuration = 4.0;
      const progress = Math.min(time / bloomDuration, 1.0);
      const ease = 1 - Math.pow(1 - progress, 3);
      
      pointsRef.current.scale.set(ease, ease, ease);
      pointsRef.current.rotation.y = time * 0.05; 
      
      // Shifted down slightly to balance the screen
      const targetY = (Math.sin(time * 0.5) * 0.1) - 1.5; 
      const startY = -4.0; 
      pointsRef.current.position.y = startY + (targetY - startY) * ease;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.0015} 
        vertexColors 
        transparent 
        opacity={0.1} 
        blending={THREE.AdditiveBlending} 
        depthWrite={false} 
      />
    </points>
  );
};

// --- MAIN APP WITH CINEMATIC SEQUENCE & MUSIC ---
export default function App() {
  const [stage, setStage] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(romanticMusic); 
    audioRef.current.loop = true; 
    audioRef.current.volume = 0.5; 
  }, []);

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error("Browser blocked audio playback:", error);
      });
    }

    setStage(1);
    
    setTimeout(() => {
      setStage(2);
    }, 3000);
  };

  return (
    <>
      <style>{`
        body { 
          margin: 0; 
          overflow: hidden; 
          background-color: #010103; 
        }
        
        .start-btn {
          padding: 15px 40px;
          background: transparent;
          color: #ff758f;
          border: 1px solid rgba(255, 117, 143, 0.5);
          border-radius: 30px;
          font-family: monospace;
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.1em;
          box-shadow: 0 0 20px rgba(255, 117, 143, 0.1);
        }
        
        .start-btn:hover {
          background: rgba(255, 117, 143, 0.1);
          box-shadow: 0 0 30px rgba(255, 117, 143, 0.3);
          border-color: #ff758f;
        }

        @keyframes textSequence {
          0%   { opacity: 0; filter: blur(10px); letter-spacing: 0.1em; transform: translateY(10px); }
          25%  { opacity: 1; filter: blur(0px); letter-spacing: 0.3em; transform: translateY(0px); }
          75%  { opacity: 1; filter: blur(0px); letter-spacing: 0.3em; transform: translateY(0px); }
          100% { opacity: 0; filter: blur(15px); letter-spacing: 0.6em; transform: translateY(-10px); }
        }
      `}</style>

      <div style={{ width: '100vw', height: '100vh', background: '#010103', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
        {/* STAGE 0 */}
        {stage === 0 && (
          <button className="start-btn" onClick={handleStart}>
            click me
          </button>
        )}

        {/* STAGE 1 */}
        {stage === 1 && (
          <div style={{
            color: '#ffffff',
            fontFamily: '"Georgia", "Playfair Display", serif',
            fontSize: 'clamp(2rem, 4vw, 4rem)', 
            textTransform: 'lowercase',
            textShadow: '0 0 20px rgba(255, 117, 143, 0.8), 0 0 40px rgba(220, 47, 2, 0.4)',
            animation: 'textSequence 3s ease-in-out forwards'
          }}>
            flowers for you
          </div>
        )}

        {/* STAGE 2 */}
        {stage === 2 && (
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <OrbitControls enableDamping dampingFactor={0.05} minDistance={1} maxDistance={20} />
            <ambientLight intensity={0.5} />
            <DetailedBouquet particleCount={5000000} />
            <FireworksSystem />
          </Canvas>
        )}
        
      </div>
    </>
  );
}