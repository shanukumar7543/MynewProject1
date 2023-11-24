import React from 'react';

interface ButtonInterface {
  ButtonValue: any;
}

const ButtonField = (props: ButtonInterface) => {
  return (
    <div className="ml-[1px] flex h-[100%] w-[50%] flex-col items-center justify-center overflow-hidden text-[12px] font-semibold">
      <div className="mt-4 flex h-12 w-[100%] flex-row items-center justify-center gap-x-1.5">
        <button
          type="submit"
          className="h-12 w-56 rounded-md bg-violet-600 text-[18px] text-white transition duration-500 hover:scale-105"
        >
          {props.ButtonValue}
        </button>
      </div>
    </div>
  );
};

export default ButtonField;
