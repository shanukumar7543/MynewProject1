export type Font = {
  family: string;
  url: string;
};

// list top 50 fonts from Google Fonts
export const fontsList: Font[] = [
  {
    family: 'Roboto',
    url: 'https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap',
  },
  {
    family: 'Open Sans',
    url: 'https://fonts.googleapis.com/css?family=Open+Sans:400,700&display=swap',
  },
  {
    family: 'Lato',
    url: 'https://fonts.googleapis.com/css?family=Lato:400,700&display=swap',
  },
  {
    family: 'Montserrat',
    url: 'https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap',
  },
  {
    family: 'Roboto Condensed',
    url: 'https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700&display=swap',
  },
  {
    family: 'Roboto Slab',
    url: 'https://fonts.googleapis.com/css?family=Roboto+Slab:400,700&display=swap',
  },
];

// fonts in form of set. write manually with type Font
export const fonts = new Map<string, Font>();

fontsList.forEach((font) => {
  fonts.set(font.family, font);
});
