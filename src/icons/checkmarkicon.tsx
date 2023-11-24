import type { BaseIconProps } from './types';

interface Props extends BaseIconProps {
  variant?: 'white' | 'green';
}

export function Checkmark({
  variant = 'green',
  height = 16,
  width = 16,
}: Props) {
  const fill = variant === 'white' ? 'white' : 'currentColor';
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.52501 11.657L0.575012 6.70702L1.98901 5.29302L5.52601 8.82702L5.52501 8.82802L14.01 0.343018L15.424 1.75702L6.93901 10.243L5.52601 11.656L5.52501 11.657Z"
        fill={fill}
      />
    </svg>
  );
}
