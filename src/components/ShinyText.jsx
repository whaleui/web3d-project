import React, { useState, useEffect, useRef } from 'react';

const ShinyText = ({
  text,
  color = '#b5b5b5',
  shineColor = '#ffffff',
  speed = 2,
  delay = 0,
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = 'left',
  disabled = false,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const textRef = useRef(null);

  useEffect(() => {
    if (!disabled) {
      const interval = setInterval(() => {
        if (!isHovered || !pauseOnHover) {
          setAnimationKey(prev => prev + 1);
        }
      }, (speed + delay) * 1000);

      return () => clearInterval(interval);
    }
  }, [disabled, isHovered, pauseOnHover, speed, delay]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const animationDirection = direction === 'left' ? 'to right' : 'to left';
  const animationIteration = yoyo ? 'alternate' : 'infinite';

  const gradientStyle = {
    background: `linear-gradient(
      ${direction === 'left' ? 90 : -90}deg,
      transparent 0%,
      transparent ${50 - spread / 2}%,
      ${shineColor} ${50 - spread / 4}%,
      ${shineColor} ${50 + spread / 4}%,
      transparent ${50 + spread / 2}%,
      transparent 100%
    )`,
    backgroundSize: '200% 100%',
    backgroundPosition: direction === 'left' ? '100% 0' : '0 0',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    color: color,
    animation: disabled || (pauseOnHover && isHovered)
      ? 'none'
      : `shine ${speed}s linear ${delay}s ${animationIteration}`,
    animationDirection: animationDirection
  };

  return (
    <span
      ref={textRef}
      className={`shiny-text ${className}`}
      style={gradientStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      key={animationKey}
    >
      {text}
    </span>
  );
};

export default ShinyText;