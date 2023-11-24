import React from 'react';

interface OpenEndedInterface {
  isAudioChecked?: boolean;
  isVideoChecked?: boolean;
  isTextChecked?: boolean;
}

const Openended = ({
  isAudioChecked,
  isVideoChecked,
  isTextChecked,
}: OpenEndedInterface) => {
  return (
    <div className="ml-[1px] flex h-[100%] w-[50%] flex-col items-center justify-center overflow-hidden text-[12px] font-semibold">
      How would you like to answer?
      <div className="mt-4 flex h-12 w-[100%] flex-row items-center justify-center gap-x-1.5">
        {isVideoChecked && (
          <div className="align-center flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-violet-600 text-[6px] font-semibold text-white transition duration-500 hover:scale-105 hover:text-[7px] ">
            <img
              src="/video2.svg"
              alt="mic"
              className="mb-2 h-[15px] w-[15px]"
            />
            Video
          </div>
        )}
        {isAudioChecked && (
          <div className="align-center flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-violet-600 text-[6px] font-semibold text-white transition duration-500 hover:scale-105 hover:text-[7px] ">
            <img src="/mic.svg" alt="mic" className="mb-2 h-[15px] w-[15px]" />
            Audio
          </div>
        )}
        {isTextChecked && (
          <div className="align-center flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-violet-600 text-[6px] font-semibold text-white transition duration-500 hover:scale-105 hover:text-[7px] ">
            <img src="/text.svg" alt="mic" className="mb-2 h-[15px] w-[15px]" />
            Text
          </div>
        )}
      </div>
    </div>
  );
};

export default Openended;
