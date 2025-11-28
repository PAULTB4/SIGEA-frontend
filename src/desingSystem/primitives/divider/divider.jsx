import React from 'react';
import { colors, typography, spacing, shadows } from '../../tokens';

export const Divider = ({
  orientation = 'horizontal',
  spacing: spacingSize = 'medium',
  color = colors.borders.light,
  thickness = '1px',
  className = '',
}) => {
  const spacings = {
    small: spacing.spacing[2],
    medium: spacing.spacing[4],
    large: spacing.spacing[6],
  };

  const spacingValue = spacings[spacingSize] || spacings.medium;

  const styles = orientation === 'horizontal'
    ? {
        width: '100%',
        height: thickness,
        marginTop: spacingValue,
        marginBottom: spacingValue,
      }
    : {
        width: thickness,
        height: '100%',
        marginLeft: spacingValue,
        marginRight: spacingValue,
      };

  return (
    <hr
      className={className}
      role="separator"
      aria-orientation={orientation}
      style={{
        border: 'none',
        backgroundColor: color,
        ...styles,
      }}
    />
  );
};