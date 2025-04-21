import React from 'react';

const Skeleton = ({
  width,
  height,
  variant = 'rectangular',
  className = '',
  ...props
}) => {
  const skeletonClass = [
    'skeleton',
    `skeleton-${variant}`,
    'skeleton-animation',
    className
  ].filter(Boolean).join(' ');

  const style = {
    width,
    height,
    ...props.style
  };

  return (
    <div 
      className={skeletonClass}
      style={style}
      {...props}
    />
  );
};

// Preset variations
Skeleton.Text = (props) => (
  <Skeleton variant="text" height="1em" {...props} />
);

Skeleton.Circle = (props) => (
  <Skeleton variant="circle" {...props} />
);

Skeleton.Avatar = (props) => (
  <Skeleton variant="circle" width="40px" height="40px" {...props} />
);

export default Skeleton;