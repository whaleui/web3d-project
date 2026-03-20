import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'motion/react';

const ParticleBackground = () => {
  const containerRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const controls = useAnimation();

  useEffect(() => {
    // 生成粒子
    const generateParticles = () => {
      const newParticles = [];
      const particleCount = 50;
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.3
        });
      }
      
      setParticles(newParticles);
    };

    generateParticles();

    // 动画粒子
    const animateParticles = () => {
      setParticles(prevParticles => {
        return prevParticles.map(particle => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;
          
          // 边界检查
          if (newX < 0 || newX > 100) {
            particle.speedX *= -1;
            newX = Math.max(0, Math.min(100, newX));
          }
          
          if (newY < 0 || newY > 100) {
            particle.speedY *= -1;
            newY = Math.max(0, Math.min(100, newY));
          }
          
          return {
            ...particle,
            x: newX,
            y: newY
          };
        });
      });
    };

    const animationInterval = setInterval(animateParticles, 50);
    return () => clearInterval(animationInterval);
  }, []);

  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: {
        duration: 1
      }
    });
  }, [controls]);

  return (
    <motion.div
      ref={containerRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={controls}
    >
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-500"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity
          }}
          animate={{
            x: particle.x,
            y: particle.y
          }}
          transition={{
            duration: 0.1,
            ease: "linear"
          }}
        />
      ))}
      
      {/* 添加连接线 */}
      {particles.map((particle, index) => {
        return particles.slice(index + 1).map(otherParticle => {
          const distance = Math.sqrt(
            Math.pow(particle.x - otherParticle.x, 2) + Math.pow(particle.y - otherParticle.y, 2)
          );
          
          if (distance < 15) {
            return (
              <motion.div
                key={`line-${particle.id}-${otherParticle.id}`}
                className="absolute bg-blue-500 opacity-20"
                style={{
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  width: `${distance}vw`,
                  height: '1px',
                  transformOrigin: '0 0',
                  transform: `rotate(${Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x)}rad)`
                }}
              />
            );
          }
          return null;
        });
      })}
    </motion.div>
  );
};

export default ParticleBackground;