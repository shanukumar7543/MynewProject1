import React from 'react';

interface MultiChoiceInterface {
  choices: string[] | undefined;
}

const Multichoice = ({ choices }: MultiChoiceInterface) => {
  return (
    <div className="ml-[1px] flex h-[100%] w-[50%] flex-col items-center justify-center overflow-hidden text-[12px] font-semibold">
      <div className="mt-4 flex h-5 w-[100%] flex-col items-center justify-center gap-y-1.5">
        {choices?.map((choice, index) => (
          <button
            key={`choice_${choice}`} // Use a unique key based on the choice text
            type="submit"
            className="flex h-5 w-48 flex-row items-center rounded-2xl border-2 bg-gray-300 pl-1 text-[12px] text-black hover:border-2 hover:border-violet-600"
          >
            <div className="left-[2px] mr-[10px] h-[95%] w-[16px] items-center justify-center rounded-full border-2 bg-gray-400 bg-violet-600 text-[8px] text-white">
              {String.fromCharCode(65 + index)}
            </div>
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Multichoice;
