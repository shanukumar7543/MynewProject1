import React from 'react';

const Sidebar = () => {
  return (
    <div className="absolute z-40 ml-4 flex h-[90%] w-24 items-center justify-center bg-transparent align-middle">
      <div className="align-center absolute  hidden w-24 items-center justify-center gap-[10px] rounded-xl bg-white py-4 text-white drop-shadow-2xl lg:flex lg:flex-col lg:gap-[10px]">
        <div className="flex w-[45px] flex-col items-center justify-center text-[12px]">
          <div className="flex h-[45px] w-[45px] items-center justify-center rounded-xl  border-2 border-black bg-white bg-opacity-[70%] transition-all duration-100 hover:scale-105">
            <img src="/video.svg" alt="screenRecording" />
          </div>
        </div>
        <div className="flex w-[45px] flex-col items-center justify-center text-[12px]">
          <div className="flex h-[45px] w-[45px] items-center justify-center rounded-xl  border-2 border-black bg-white bg-opacity-[70%] transition-all duration-100 hover:scale-105">
            <img src="/message.svg" alt="screenRecording" />
          </div>
        </div>
        <div className="flex w-[45px] flex-col items-center justify-center text-[12px]">
          <div className="flex h-[45px] w-[45px] items-center justify-center rounded-xl  border-2 border-black bg-white bg-opacity-[70%] transition-all duration-100 hover:scale-105">
            <img src="/options.svg" className="mt-1" alt="library" />
          </div>
        </div>
        <div className="flex w-[45px] flex-col items-center justify-center text-[12px]">
          <div className="flex h-[45px] w-[45px] items-center justify-center rounded-xl  border-2 border-black bg-white bg-opacity-[70%] transition-all duration-100 hover:scale-105">
            <img src="/button.svg" alt="upload" />
          </div>
        </div>
        <div className="flex w-[45px] flex-col items-center justify-center text-[12px]">
          <div className="flex h-[45px] w-[45px] items-center justify-center rounded-xl border-2 border-black bg-white bg-opacity-[70%] transition-all duration-100 hover:scale-105">
            <img src="/ComputerProfile.svg" alt="camara" />
          </div>
        </div>
        <div className="flex w-[45px] flex-col items-center justify-center text-[12px]">
          <div className="flex h-[45px] w-[45px] items-center justify-center rounded-xl border-2 border-black bg-white bg-opacity-[70%] transition-all duration-100 hover:scale-105">
            <img src="/smile.svg" alt="camara" />
          </div>
        </div>
        <div className="flex w-[45px] flex-col items-center justify-center text-[12px]">
          <div className="flex h-[45px] w-[45px] items-center justify-center rounded-xl border-2 border-black bg-white bg-opacity-[70%] transition-all duration-100 hover:scale-105">
            <img src="/upload2.svg" alt="camara" />
          </div>
        </div>
        <div className="flex w-[45px] flex-col items-center justify-center text-[12px]">
          <div className="flex h-[45px] w-[45px] items-center justify-center rounded-xl border-2 border-black bg-white bg-opacity-[70%] transition-all duration-100 hover:scale-105">
            <img src="/calander.svg" alt="camara" />
          </div>
        </div>
        <div className="flex w-[45px] flex-col items-center justify-center text-[12px]">
          <div className="flex h-[45px] w-[45px] items-center justify-center rounded-xl border-2 border-black bg-white bg-opacity-[70%] transition-all duration-100 hover:scale-105">
            <img src="/payment.svg" alt="mic" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
