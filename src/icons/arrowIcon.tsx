import React from 'react';

const ArrowIcon = () => {
  return (
    <div>
      <div className="flex flex-col justify-items-end align-baseline">
        <svg
          fill="none"
          height="40"
          width="50"
          xmlns="http://www.w3.org/2000/svg"
          x="56"
          y="56"
        >
          <path
            clip-rule="evenodd"
            d="M30.876 36.694a2.264 2.264 0 103.202 3.202l13.65-13.65a2.264 2.264 0 000-3.201l-13.65-13.65a2.264 2.264 0 00-3.202 3.202l9.822 9.822H2.877c-.98 0-1.775 1.014-1.775 2.264 0 1.25.795 2.264 1.775 2.265h37.745l-9.746 9.746z"
            fill="#111"
            fill-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default ArrowIcon;
