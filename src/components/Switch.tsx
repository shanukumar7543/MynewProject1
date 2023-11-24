import React from 'react';

interface SwitchProps {
  isOn: boolean;
  handleToggle: () => void;
  colorOne: string;
  colorTwo: string;
}

const Switch: React.FC<SwitchProps> = ({
  isOn,
  handleToggle,
  colorOne,
  colorTwo,
}) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="switch-checkbox"
        id="switch"
        type="checkbox"
      />
      <label
        style={{ background: isOn ? colorOne : colorTwo }}
        className="switch-label relative flex h-12 w-24 cursor-pointer items-center justify-between rounded-full bg-gray-400 transition-all duration-200"
        htmlFor="switch"
      >
        <span className="switch-button absolute left-1 top-1 h-11 w-11 rounded-full bg-white shadow-sm transition-all duration-200" />
      </label>
    </>
  );
};

export default Switch;
