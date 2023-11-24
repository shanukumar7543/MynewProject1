import React from 'react';

import styles from '@/styles/LoadingDot.module.css';

type LoadingDotProps = {
  size?: number;
  color?: string;
};

const LoadingDot = ({
  size = 40,
}: // color = 'rgba(255, 0, 0, 0.5)',
LoadingDotProps) => {
  return (
    <div className={styles['loading-dot-container']}>
      <div
        className={styles.loader}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          // backgroundColor: color,
        }}
        // data-bg-color={color}
      />
    </div>
  );
};

export default LoadingDot;
