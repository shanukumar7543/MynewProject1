/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef, useState } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';

import { useAwayListener } from '@/utils/hooks';

type SelectProps = {
  options: {
    value: string;
    label: React.ReactNode | string;
  }[];
  onChange?: (value: string) => void;
  defaultValue?: string;
  className?: string;
};

const Select = ({ options, onChange, defaultValue }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue ?? '');

  const ref = useRef<HTMLDivElement>(null);

  useAwayListener(ref, () => {
    setIsOpen(false);
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    option !== '' && setIsOpen(false);
    option !== '' && onChange && onChange(option);
  };

  return (
    <div ref={ref} className="relative transition-all duration-700 ease-in-out">
      <button
        className="inline-flex items-center rounded-md bg-gray-200/70 px-3 py-2 font-semibold text-gray-700 transition-all duration-700 ease-in-out"
        onClick={toggleDropdown}
      >
        <span>{selectedOption || 'Select'}</span>
        <AiOutlineCaretDown className={`ml-1 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div
          className="animate-fade-in absolute z-10 w-full min-w-[120px] rounded-lg bg-white py-2 shadow-lg"
          onAnimationEnd={() => setIsOpen(true)}
        >
          {selectedOption && (
            <button
              className="border-0 bg-transparent px-4 py-0 text-red-500"
              onClick={() => handleOptionClick('')}
            >
              reset
            </button>
          )}
          {options.map((option) => (
            <button
              key={option.value}
              className={`block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 ${
                option.value === selectedOption && 'bg-gray-200/90'
              }`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
