import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium', 
  className = '',
  ...props
}) => {
  const variants = {
    primary: {
      background: '#37352f',
      color: '#ffffff',
      border: 'none'
    },
    secondary: {
      background: '#f7f6f3',
      color: '#37352f',
      border: '1px solid #e9e9e7'
    },
    outline: {
      background: 'transparent',
      color: '#37352f',
      border: '1px solid #e9e9e7'
    },
    ghost: {
      background: 'transparent',
      color: '#37352f',
      border: 'none'
    }
  };

  const sizes = {
    small: {
      padding: '6px 12px',
      fontSize: '14px',
      borderRadius: '4px'
    },
    medium: {
      padding: '8px 16px',
      fontSize: '14px',
      borderRadius: '4px'
    },
    large: {
      padding: '10px 20px',
      fontSize: '16px',
      borderRadius: '4px'
    },
    xl: {
      padding: '12px 24px',
      fontSize: '16px',
      borderRadius: '4px'
    }
  };

  return (
    <motion.button
      onClick={onClick}
      className={`relative overflow-hidden font-medium transition-all ${className}`}
      style={{
        ...variants[variant],
        ...sizes[size],
        position: 'relative',
        zIndex: 1,
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        fontWeight: 500,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      whileHover={{ 
        scale: 1.01,
        boxShadow: variant === 'primary' 
          ? '0 2px 5px rgba(0, 0, 0, 0.2)' 
          : variant === 'outline'
          ? '0 2px 5px rgba(0, 0, 0, 0.08)'
          : '0 2px 5px rgba(0, 0, 0, 0.08)'
      }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      <motion.span
        className="absolute inset-0 bg-white/10"
        style={{ 
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          transform: 'translateX(-100%)',
          zIndex: -1
        }}
        whileHover={{ 
          transform: 'translateX(100%)',
          transition: { duration: 0.6, ease: 'easeInOut' }
        }}
      />
    </motion.button>
  );
};

export default AnimatedButton;
