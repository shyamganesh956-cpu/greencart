import React from 'react';
import logoSvg from '../assets/logo/greencart-logo.svg';

export default function Logo({ className = '', height = 44 }) {
  return (
    <div className={`logo-container ${className}`} style={{ display: 'flex', alignItems: 'center' }}>
      <img 
        src={logoSvg} 
        alt="GreenCart - Fresh & Organic" 
        style={{ height: `${height}px`, width: 'auto', display: 'block' }} 
      />
    </div>
  );
}
