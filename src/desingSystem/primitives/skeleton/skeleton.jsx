import React from 'react';
import { colors, typography, spacing, shadows } from '../../tokens';

export const Skeleton = ({
  width = '100%',
  height = '1rem',
  variant = 'rectangular',
  animation = 'pulse',
  className = '',
}) => {
  const variants = {
    rectangular: spacing.borderRadius.base,
    circular: '50%',
    rounded: spacing.borderRadius.xl,
  };

  const animations = {
    pulse: `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `,
    wave: `
      @keyframes wave {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
    `,
  };

  return (
    <>
      <div
        className={className}
        aria-hidden="true"
        style={{
          width,
          height,
          backgroundColor: colors.neutral[200],
          borderRadius: variants[variant],
          animation: animation === 'pulse' ? 'pulse 1.5s ease-in-out infinite' : 'none',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {animation === 'wave' && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(90deg, transparent, ${colors.neutral[50]}, transparent)`,
              animation: 'wave 1.5s ease-in-out infinite',
            }}
          />
        )}
      </div>
      <style>{animations[animation]}</style>
    </>
  );
};