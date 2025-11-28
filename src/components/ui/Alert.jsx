import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import { colors, spacing } from '../../desingSystem/tokens';

export const Alert = ({ 
  variant = 'info', 
  children, 
  className = '',
  icon: CustomIcon 
}) => {
  const variants = {
    error: {
      bg: `${colors.semantic.error}15`,
      border: colors.semantic.error,
      text: colors.semantic.errorLight,
      icon: AlertCircle
    },
    success: {
      bg: `${colors.semantic.success}15`,
      border: colors.semantic.success,
      text: colors.semantic.successLight,
      icon: CheckCircle2
    },
    warning: {
      bg: `${colors.semantic.warning}15`,
      border: colors.semantic.warning,
      text: colors.semantic.warningLight,
      icon: AlertTriangle
    },
    info: {
      bg: `${colors.semantic.info}15`,
      border: colors.semantic.info,
      text: colors.semantic.infoLight,
      icon: Info
    }
  };

  const config = variants[variant];
  const IconComponent = CustomIcon || config.icon;

  return (
    <div
      className={className}
      style={{
        padding: spacing.spacing[3],
        borderRadius: spacing.borderRadius.lg,
        backgroundColor: config.bg,
        borderLeft: `4px solid ${config.border}`,
        color: config.text
      }}
    >
      <div style={{ display: 'flex', gap: spacing.spacing[2], alignItems: 'flex-start' }}>
        <IconComponent size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ flex: 1, fontSize: '0.875rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
};