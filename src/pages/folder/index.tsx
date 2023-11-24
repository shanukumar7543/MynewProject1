import type { GetServerSidePropsContext } from 'next';
import React from 'react';

import { getDefaultFolder } from '@/apihelpers/api';
import { authenticate } from '@/utils/auth';

export default function Folder() {
  return <></>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await authenticate(context);
  if (!res?.props?.response) return res;

  const defaultRes = await getDefaultFolder(
    res?.props?.response?.defaultOrganization?.organizationID,
    context.req.cookies.accessToken as string
  );

  if (defaultRes?.success) {
    return {
      redirect: {
        destination: `/folder/${defaultRes?.data?._id}`,
        permanent: false,
      },
    };
  }

  // return 404
  return {
    notFound: true,
  };

  // console.log('res?.props?.response', res?.props?.response);
  // return res;
}
