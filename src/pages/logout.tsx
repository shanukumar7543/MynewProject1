import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    Cookies.remove('accessToken');
    router.push('/login');
  }, []);

  return <div />;
}
