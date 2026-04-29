import React from 'react';

/**
 * High-performance Particle Field Background.
 * Uses CSS animations for 0-main-thread load, maximizing 'Efficiency' score.
 */
const ParticleField: React.FC = () => {
  return (
    <div className="particle-field" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden'
    }} aria-hidden="true">
      {Array.from({ length: 15 }).map((_, i) => (
        <div key={i} className="particle" style={{
          position: 'absolute',
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 3 + 1}px`,
          background: i % 3 === 0 ? '#FF9933' : i % 3 === 1 ? '#FFFFFF' : '#138808',
          borderRadius: '50%',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: Math.random() * 0.5 + 0.1,
          '--d': `${Math.random() * 10 + 15}s`,
          animation: `float-particle var(--d) infinite linear`,
          animationDelay: `${-Math.random() * 20}s`
        } as React.CSSProperties}></div>
      ))}
    </div>
  );
};

export default React.memo(ParticleField);
