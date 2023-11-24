import React, { useMemo } from 'react';

interface MultipleChoiceProps {
  answer: any;
}

interface Option {
  option: string;
  selected?: boolean;
}

const MultipleChoice = ({ answer }: MultipleChoiceProps) => {
  //
  const options: Option[] = useMemo(() => {
    return answer.answer?.response?.map((option: string) => ({
      option,
      selected: false,
    }));
  }, [answer]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        {options.map((option, index) => (
          <div
            key={`option-${index}`}
            className={`max-w-max rounded-full border-2 border-gray-300 px-12 py-2 hover:border-gray-500 ${
              option.selected
                ? 'bg-purple-500 text-white'
                : 'bg-white text-gray-500'
            }`}
          >
            {option.option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoice;
