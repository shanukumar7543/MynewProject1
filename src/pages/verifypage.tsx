import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { verifyemail } from '@/apihelpers/api';

const VerifyPage = () => {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false as any);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { token } = router.query;

  const verifiyUserEmail = async () => {
    setLoading(true);
    try {
      const response = await verifyemail(token as string);
      if (response.success) {
        router.push('/login');
        return setVerified(true);
      }

      setError(response?.data?.message ?? 'An error occurred');
    } catch (err) {
      setError(true);
      // console.log(err.response?.data);
    }
    setLoading(false);
    return null;
  };

  useEffect(() => {
    if (token) {
      verifiyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="bg-orange-500 p-2">{token ?? 'no token'}</h2>

      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl text-red-500">
            {error === true ? 'An error has been occured' : error}
          </h2>
        </div>
      )}

      {loading && (
        <div>
          <h2 className="text-2xl">Processing...</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyPage;

// export async function getServerSideProps(context: any) {
//   const token = (await context.req.cookies.accessToken) as string;

//   if (!token) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {
//       token,
//     },
//   };
// }
