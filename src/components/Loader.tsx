import Image from 'next/image';
import React from 'react';

import loader from '../../public/assets/loading.gif';

interface LoaderProps {
  width?: number;
  height?: number;
  className?: string;
  children?: React.ReactNode;
}

const Loader = ({ width, height, className, children }: LoaderProps) => {
  return (
    <div className="max-h-max max-w-max">
      <Image
        src={loader}
        alt="loader"
        className={`mx-auto ${className ?? ''}`}
        {...(width ? { width } : {})}
        {...(height ? { height } : {})}
      />

      {children && children}
    </div>
  );
};

export default Loader;
