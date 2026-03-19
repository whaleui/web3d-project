import React from 'react';

const DynamicBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-white grid-bg" />
    </div>
  );
};

export default DynamicBackground;
