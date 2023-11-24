import type { GetServerSidePropsContext } from 'next';

import { getUser } from '@/apihelpers/api';

const redirectToLogin = {
  redirect: {
    destination: '/login',
    permanent: false,
  },
};

export const authenticate = async (
  context: GetServerSidePropsContext
): Promise<null | any> => {
  const token = context.req.cookies.accessToken as string;

  if (!token) {
    return redirectToLogin;
  }

  const response = await getUser(token);
  if (!response.success) {
    // delete the token from cookies
    context.res.setHeader('Set-Cookie', 'accessToken=; path=/; Max-Age=0');

    return redirectToLogin;
  }

  return {
    props: {
      response: response.data,
    },
  };
};
