import '../styles/global.css';
/* eslint-disable import/no-extraneous-dependencies */
import 'nprogress/nprogress.css';

import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';

import { CommonMeta } from '@/layouts/Meta';

import English from '../languages/en.json';
import Spanish from '../languages/es.json';

const ProgressBar = dynamic(() => import('@/components/Progressbar'), {
  ssr: false,
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { locale } = router;
  const messages: { [key: string]: any } = {
    en: English,
    es: Spanish,
  };

  return (
    <IntlProvider locale={locale || 'en'} messages={messages[locale || 'en']}>
      <ProgressBar />
      <CommonMeta />
      <Component {...pageProps} />
    </IntlProvider>
  );
};

export default MyApp;
