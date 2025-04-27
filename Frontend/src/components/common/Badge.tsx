import React from 'react';
import { Badge as MuiBadge, BadgeProps as MuiBadgeProps } from '@mui/material';

interface BadgeProps extends Omit<MuiBadgeProps, 'variant'> {
  count?: number;
  variant?: 'standard' | 'dot';
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'success';
  max?: number;
  showZero?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  count,
  variant = 'standard',
  color = 'primary',
  max = 99,
  showZero = false,
  children,
  ...props
}) => {
  return (
    <MuiBadge
      badgeContent={count}
      variant={variant}
      color={color}
      max={max}
      showZero={showZero}
      {...props}
    >
      {children}
    </MuiBadge>
  );
};

export default Badge;