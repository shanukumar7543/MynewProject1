import type { ReactNode } from 'react';
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

interface OutputNodeProps {
  data: {
    emoji: ReactNode; // Change the type as appropriate for your emoji component
  };
}

const OutputNode: React.FC<OutputNodeProps> = () => {
  return (
    <div className="flex h-[100%] w-[100%] flex-col overflow-hidden rounded-lg border-2 bg-white shadow-md transition duration-300 ease-in-out hover:bg-zinc-200">
      <div className="flex h-[10%] w-[100%] bg-zinc-300 px-2 pt-2 font-bold text-black">
        2. End Screen
      </div>
      <div className="flex h-[90%] w-[100%]">
        <img src="/endpage.png" alt="img" className="h-full w-full" />
      </div>
      <Handle
        type="target"
        position={Position.Left}
        className="w-16 !bg-black"
      />
    </div>
  );
};

export default memo(OutputNode);
