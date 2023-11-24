import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface HeaderProps {
  name: string;
  showSetting: any;
  showContact: any;
}

const Header = (props: HeaderProps) => {
  const router = useRouter();

  const [showPreviewOption, setShowPreviewOption] = useState(false);

  const handleClick = () => {
    router.push('/home');
  };

  const handleSettings = () => {
    props.showSetting();
  };

  const handleContact = () => {
    props.showContact();
  };

  return (
    <div className="flex h-16 w-[100%] flex-row items-center justify-between bg-zinc-200">
      <div className="flex h-16 w-[50%] flex-row bg-zinc-200 pl-4 pt-4">
        <div>
          <button
            type="submit"
            className="w-30 ml-4 mt-4 h-8 rounded-lg bg-zinc-200 text-center text-lg font-medium text-gray-600 hover:bg-indigo-600 hover:text-white"
            onClick={handleClick}
          >
            `🡠 Inbox / {props?.name}
          </button>
        </div>
        <div>
          <input
            type="text"
            className="mt-4 w-36 rounded-lg bg-inherit px-2 py-1 text-lg font-light outline-none focus:bg-white focus:outline-none"
          />
        </div>
      </div>
      <div className="align-center flex items-center justify-center gap-[8px] rounded-xl pr-4 pt-4  drop-shadow-2xl lg:flex-row lg:gap-[8px]">
        <div className="flex w-[45px] flex-col items-center justify-center text-[12px]">
          <div className="flex h-[45px] w-[45px] items-center justify-center rounded-xl bg-white bg-opacity-[70%] transition-all duration-100 hover:scale-105">
            <img src="/question.svg" alt="screenRecording" />
          </div>
        </div>
        {showPreviewOption ? (
          <div className="z-50  mt-6 !bg-white">
            <ul className="absolute mt-4 h-28  rounded-xl  bg-white p-4 text-left text-sm font-semibold   text-black no-underline drop-shadow-2xl">
              <li className=" h-10 cursor-pointer flex-col  rounded-xl p-2 hover:bg-neutral-100 ">
                <h1>Preview mode</h1>
                <span className="">No data gets collected</span>
              </li>
              <li className="mt-2 h-10 cursor-pointer rounded-xl p-2 hover:bg-neutral-100 ">
                <h1>Live mode</h1>
                <span>Data does gets collected</span>
              </li>
            </ul>
          </div>
        ) : null}
        <div
          className="flex w-[45px] cursor-pointer flex-col items-center justify-center text-[12px]"
          onClick={handleSettings}
        >
          <div className="flex h-[45px] w-[45px] items-center justify-center rounded-xl bg-white bg-opacity-[70%] transition-all duration-100 hover:scale-105">
            <img src="/setting.svg" alt="screenRecording" />
          </div>
        </div>
        <div
          className="flex w-[45px] flex-col items-center justify-center text-[12px]"
          onClick={handleContact}
        >
          <div className="flex h-[45px] w-[45px] items-center justify-center rounded-xl bg-white bg-opacity-[70%] transition-all duration-100 hover:scale-105">
            <img src="/contentform.svg" className="mt-1" alt="library" />
          </div>
        </div>
        <div
          className="text-bold flex w-[100px] flex-col items-center justify-center text-[16px]"
          onClick={() => setShowPreviewOption(!showPreviewOption)}
        >
          <div className="flex h-[45px] w-[90px] items-center justify-center rounded-3xl bg-white py-4 transition-all duration-100 hover:scale-105">
            <img src="/play.svg" alt="upload" />
            <span>Preview</span>
          </div>
        </div>
        <div className="text-bold flex w-[100px] flex-col items-center justify-center text-[16px]">
          <div className="flex h-[45px] w-[90px] items-center justify-center rounded-3xl bg-black py-4 transition-all duration-100 hover:scale-105">
            <img src="/send.svg" alt="upload" />
            <span className="text-white">Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
