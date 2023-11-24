import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

import ArrowIcon from '@/icons/arrowIcon';

const InputNode: React.FC = () => {
  return (
    <div className="flex h-[100%] w-[100%] items-center justify-center rounded-lg bg-white transition duration-300 ease-in-out">
      <ArrowIcon />
      <h1 className="absolute bottom-2">Start</h1>
      <Handle
        type="source"
        position={Position.Right}
        className="w-16 !bg-black"
      />
    </div>
  );
};

export default memo(InputNode);
