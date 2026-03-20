import React from 'react';

const BorderGlow = ({ 
  children, 
  className = '',
  color = '#0070f3',
  size = 'md',
  intensity = 'medium',
  animate = true
}) => {
  const sizeClasses = {
    sm: 'p-[1px]',
    md: 'p-[2px]',
    lg: 'p-[3px]'
  };

  const intensityClasses = {
    low: 'blur-sm',
    medium: 'blur-md',
    high: 'blur-lg'
  };

  const animationClasses = animate ? 'animate-pulse' : '';

  return (
    <div 
      className={`relative ${sizeClasses[size]} rounded-lg overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(45deg, ${color}, transparent, ${color})`,
        backgroundSize: '200% 200%',
        animation: animate ? 'gradient-shift 3s ease-in-out infinite' : 'none'
      }}
    >
      <div className={`bg-black/90 backdrop-blur-sm rounded-md w-full h-full ${intensityClasses[intensity]}`}>
        {children}
      </div>
    </div>
  );
};

export default BorderGlow;