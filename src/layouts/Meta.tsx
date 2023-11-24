import Head from 'next/head';
import { NextSeo } from 'next-seo';

import { AppConfig } from '@/utils/AppConfig';

type IMetaProps = {
  title: string;
  description: string;
  canonical?: string;
};

const Meta = (props: IMetaProps) => {
  // const router = useRouter();

  return (
    <NextSeo
      title={props.title}
      description={props.description}
      canonical={props.canonical}
      openGraph={{
        title: props.title,
        description: props.description,
        url: props.canonical,
        locale: AppConfig.locale,
        site_name: AppConfig.site_name,
      }}
    />
  );
};

const CommonMeta = () => {
  return (
    <Head>
      <meta charSet="UTF-8" key="charset" />
      <title>VidyChat</title>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1"
        key="viewport"
      />
      <link rel="apple-touch-icon" href="/whitelogo.png" key="apple" />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/whitelogo.png"
        key="icon32"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/whitelogo.png"
        key="icon16"
      />
      <link rel="icon" href="/whitelogo.png" key="favicon" />
    </Head>
  );
};

export { CommonMeta, Meta };
