import type { GetServerSidePropsContext } from 'next';
import React from 'react';

import { Meta } from '@/layouts/Meta';
import Sidebar from '@/layouts/sidebar';
import { authenticate } from '@/utils/auth';

export default function Home(props: any) {
  return (
    <>
      <Meta title="Home | VidyChat" description="VidyChat Home Page" />
      <div className="flex h-screen">
        <Sidebar userData={props?.response} />
        <div className="flex w-full flex-col items-center justify-center">
          <div className="w-full px-1 text-gray-700 antialiased">
            <div className="flex h-full cursor-pointer flex-col items-center justify-center text-center sm:text-left">
              <h1 className="mb-4 text-6xl font-semibold italic">
                Welcome to VidyChat
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await authenticate(context);
  if (!res?.props?.response) return res;

  return {
    redirect: {
      destination: `/all-interactions`,
      permanent: true,
    },
  };

  // return res;
}
