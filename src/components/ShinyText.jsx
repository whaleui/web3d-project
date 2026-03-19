import React from 'react';

const ShinyText = ({ 
  text, 
  className = '',
  variant = 'default',
  ...props
}) => {
  const variants = {
    default: 'text-foreground',
    primary: 'text-primary',
    gradient: 'bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent',
  };

  return (
    <span 
      className={`relative inline-block font-semibold ${variants[variant]} ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
      }}
      {...props}
    >
      {text}
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
          backgroundSize: '200% 100%',
          backgroundPosition: '-200% 0',
          pointerEvents: 'none',
          mixBlendMode: 'overlay',
          animation: 'shine 3s linear infinite',
        }}
      />
    </span>
  );
};

export default ShinyText;
