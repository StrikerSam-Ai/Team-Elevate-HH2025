import React from 'react';
import { Avatar as MuiAvatar } from '@mui/material';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt = 'user avatar',
  size = 40,
  className 
}) => {
  return (
    <MuiAvatar
      src={src}
      alt={alt}
      sx={{ 
        width: size, 
        height: size 
      }}
      className={className}
    >
      {!src && alt?.charAt(0).toUpperCase()}
    </MuiAvatar>
  );
};

export default Avatar;