import type { SVGProps } from 'react';

export type SvgIconProps = {
  svgProps?: SVGProps<SVGSVGElement>;
  pathProps?: SVGProps<SVGPathElement>;
  onDark?: boolean;
};
export type BaseIconProps = {
  height?: number;
  width?: number;
  fill?: string;
  variant?: string;
};
