import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ children, className = '', hoverEffect = 'default', ...props }) => {
  const hoverVariants = {
    default: {
      y: -1,
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)'
    },
    elevate: {
      y: -2,
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    },
    glow: {
      y: -1,
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.08)'
    }
  };

  return (
    <motion.div
      style={{
        background: '#ffffff',
        border: '1px solid #e9e9e7',
        borderRadius: '4px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
      }}
      className={className}
      whileHover={hoverEffect === 'none' ? {} : hoverVariants[hoverEffect]}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader = ({ className, ...props }) => (
  <div 
    style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1rem' }}
    className={className} 
    {...props} 
  />
);

export const CardTitle = ({ className, ...props }) => (
  <h3 
    style={{ fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.01em', color: '#37352f' }}
    className={className} 
    {...props} 
  />
);

export const CardDescription = ({ className, ...props }) => (
  <p 
    style={{ fontSize: '0.875rem', color: '#6b6964' }}
    className={className} 
    {...props} 
  />
);

export const CardContent = ({ className, ...props }) => (
  <div 
    style={{ padding: '1rem', paddingTop: 0 }}
    className={className} 
    {...props} 
  />
);

export const CardFooter = ({ className, ...props }) => (
  <div 
    style={{ display: 'flex', alignItems: 'center', padding: '1rem', paddingTop: 0 }}
    className={className} 
    {...props} 
  />
);

export default AnimatedCard;
