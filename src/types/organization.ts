export type Setting = {
  _id?: string;
  branding?: {
    name: string;
    image: string;
    url?: string;
  };
  language?: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
  };
  buttonBorderRadius?: number;
  font: {
    family: string;
    url: string;
  };
};
