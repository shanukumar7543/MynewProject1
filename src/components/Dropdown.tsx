import React, { useRef, useState } from 'react';

import { useAwayListener } from '@/utils/hooks';

type DropdownProps = {
  title?: React.ReactNode | string;
  children: React.ReactNode;
  buttonClassName?: string;
  button?: React.ReactNode;
};

const Dropdown = ({ title, children, button }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useAwayListener(dropdownRef, () => {
    setIsOpen(false);
  });

  return (
    <div className="relative" ref={dropdownRef}>
      {button ? (
        <button
          onClick={(e: any) => {
            e.stopPropagation();
            toggleDropdown();
          }}
        >
          {button}
        </button>
      ) : (
        <button
          className="inline-flex items-center rounded bg-gray-100 px-4 py-2 font-semibold text-gray-700"
          onClick={toggleDropdown}
        >
          <span> {title} </span>
          <svg
            className={`ml-2 h-4 w-4 fill-current ${
              isOpen ? 'rotate-90' : '-rotate-90'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M14.293 7.293a1 1 0 0 0-1.414-1.414l-3 3a1 1 0 0 0 0 1.414l3 3a1 1 0 1 0 1.414-1.414L11.414 10l2.879-2.879z" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="absolute mt-1 w-full min-w-[150px] rounded-lg bg-white py-2 shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
