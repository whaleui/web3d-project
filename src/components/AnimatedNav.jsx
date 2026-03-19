import React from 'react';
import { motion } from 'framer-motion';

const AnimatedNav = ({ label, active, onClick, className, icon, ...props }) => {
  return (
    <motion.button
      onClick={onClick}
      style={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        gap: '0.75rem',
        borderRadius: '4px',
        padding: '0.5rem 0.75rem',
        fontSize: '0.875rem',
        fontWeight: 500,
        transition: 'background-color 0.2s, color 0.2s',
        backgroundColor: active ? '#f7f6f3' : 'transparent',
        color: active ? '#37352f' : '#6b6964'
      }}
      className={className}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = '#f7f6f3';
          e.currentTarget.style.color = '#37352f';
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#6b6964';
        }
      }}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      {...props}
    >
      {icon && <span style={{ fontSize: '1rem' }}>{icon}</span>}
      <span>{label}</span>
      {active && (
        <motion.div
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            height: '1.25rem',
            width: '0.2rem',
            transform: 'translateY(-50%)',
            borderTopRightRadius: '4px',
            borderBottomRightRadius: '4px',
            backgroundColor: '#37352f'
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </motion.button>
  );
};

export default AnimatedNav;
