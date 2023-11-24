import type { ReactNode } from 'react';
import React, { memo, useEffect, useState } from 'react';
import { Handle, Position } from 'reactflow';

import { getVideo } from '@/apihelpers/api';

interface CustomNodeProps {
  data: {
    thumbnail: ReactNode; // Change the type as appropriate for your emoji component
    stepnumber: number;
    name: string;
  };
}

const CustomNode: React.FC<CustomNodeProps> = (props) => {
  const [videoSrc, setVideoSrc] = useState('');

  useEffect(() => {
    const fetchVideo = async () => {
      if (props?.data?.thumbnail) {
        try {
          const response = await getVideo({
            Key: props?.data?.thumbnail,
          });

          // Assuming your getVideo response contains a property "videoUrl"
          if (response.status === 200) {
            setVideoSrc(response?.data?.url);
          }
        } catch (error) {
          console.error('Error fetching video:', error);
        }
      }
    };

    fetchVideo();
  }, [props?.data?.thumbnail]);

  return (
    <div className="flex h-[100%] w-[100%] border-spacing-4 flex-col overflow-hidden rounded-lg border-2 bg-white shadow-md transition duration-300 hover:scale-105 hover:border-violet-600 hover:bg-zinc-200">
      <div className="flex h-[15%] w-[100%] items-center bg-zinc-300 px-2 text-[9px] font-semibold">
        {props?.data?.stepnumber} {props?.data?.name}
      </div>
      <div className="flex h-[85%] w-[100%] flex-row">
        <div className="flex h-[100%] w-[50%]  items-center justify-center bg-black">
          {videoSrc ? (
            <img src={videoSrc} alt="mic" className="h-100 w-100" />
          ) : (
            <div className="text-white">Generating</div>
          )}
        </div>
        <div className="ml-[1px] mt-5 flex h-[100%] w-[50%] flex-col items-center justify-center overflow-hidden text-[8px] font-semibold">
          <div className="mb-1 flex h-[2px] w-[50%] rounded-md bg-zinc-400" />
          <div className="flex h-12 w-[100%] flex-row justify-center gap-x-1">
            <div className="align-center flex h-4 w-4 flex-col items-center justify-center bg-violet-700 font-semibold text-white transition duration-500 hover:scale-105 ">
              <img src="/video2.svg" alt="mic" className="h-2 w-2" />
            </div>
            <div className="align-center flex h-4 w-4 flex-col items-center justify-center bg-violet-700 font-semibold text-white transition duration-500 hover:scale-105 ">
              <img src="/mic.svg" alt="mic" className="h-2 w-2" />
            </div>
            <div className="align-center flex h-4 w-4 flex-col items-center justify-center bg-violet-700 font-semibold text-white transition duration-500 hover:scale-105 ">
              <img src="/text.svg" alt="mic" className="h-2 w-2" />
            </div>
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        className="w-16 !bg-black"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-16 !bg-black"
      />
    </div>
  );
};

export default memo(CustomNode);
