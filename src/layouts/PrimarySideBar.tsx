import React from 'react';

import Profile from './Profile';

type Props = {
  userData: any;
};

const PrimarySideBar = (props: Props) => {
  return (
    <div className="bg-black">
      <div className="flex h-full flex-col items-center justify-between px-[0.5rem] py-[1.25rem]">
        <img
          src="/whitelogo.png"
          className="h-[40px] w-[40px] cursor-pointer"
        />
        <div className="w-10 space-y-3 ">
          <img
            className="h-[40px] w-[40px] rounded-full bg-amber-500"
            src="/helpSideBar.svg"
            alt="help"
          />

          <Profile userData={props?.userData} />
        </div>
      </div>
    </div>
  );
};

export default PrimarySideBar;
