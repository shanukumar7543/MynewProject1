import React from 'react';
import { AiOutlineTag } from 'react-icons/ai';
import { BsCloudArrowDown } from 'react-icons/bs';
import { CgTranscript } from 'react-icons/cg';
import { RxShare2 } from 'react-icons/rx';

const btnClass = `rounded-full bg-black/80 p-2 text-white shadow-lg shadow-purple-500/20 transition-all duration-150 ease-in-out hover:scale-110`;

const FloatingBar = () => {
  return (
    <div className="absolute right-0 top-10 z-50 mt-10 flex max-w-max flex-col gap-y-8 px-3">
      <button type="button" className={btnClass}>
        <AiOutlineTag size={28} />
      </button>
      <button type="button" className={btnClass}>
        <BsCloudArrowDown size={28} />
      </button>
      <button type="button" className={btnClass}>
        <CgTranscript size={28} />
      </button>
      <button type="button" className={btnClass}>
        <RxShare2 size={28} />
      </button>
    </div>
  );
};

export default FloatingBar;
