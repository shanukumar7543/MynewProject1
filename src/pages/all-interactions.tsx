/* eslint-disable import/no-extraneous-dependencies */
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import type { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import React, { useMemo } from 'react';

import { getHeaders } from '@/apihelpers/api';
import { GET_ALL_INTERACTIONS } from '@/apihelpers/url_helpers';
import { Provider } from '@/components/interactions/context';
import InteractionsList from '@/components/interactions/InteractionsList';
import LoadingDot from '@/components/LoadingDot';
import { Meta } from '@/layouts/Meta';
import Sidebar from '@/layouts/sidebar';
import { authenticate } from '@/utils/auth';

const queryClient = new QueryClient();

function Interactions(props: any) {
  const {
    data: interactionsData,
    error,
    isLoading: loading,
    // status: fetchStatus,
    isRefetching,
    refetch: invalidate,
  } = useQuery(['interactions'], {
    queryFn: () =>
      fetch(
        `${GET_ALL_INTERACTIONS}?organizationID=${props?.response?.organization[0]?.organizationID?._id}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...getHeaders(),
          },
        }
      ).then((res) => res.json()),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 1,
    refetchInterval: 1000 * 60 * 2,
  });

  const interactions = useMemo(
    () => (interactionsData?.data?.length > 0 ? interactionsData.data : []),
    [interactionsData]
  );

  return (
    <Provider>
      <Meta title="Home | VidyChat" description="VidyChat Home Page" />
      <div className="flex h-screen">
        <Sidebar userData={props?.response} />

        <div className="flex w-full flex-col items-center justify-center">
          <div className="w-full px-1 text-gray-700 antialiased">
            {loading ? (
              <div className="flex h-screen items-center justify-center">
                <LoadingDot />
              </div>
            ) : (
              <>
                {error ? (
                  <div className="flex h-screen items-center justify-center">
                    <h2 className="text-2xl"> An error has been occurred </h2>
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center text-center sm:text-left">
                    {interactions?.length > 0 ? (
                      // <h2 className="flex gap-3 text-red-300">
                      //   No Interactions Yet
                      //   {RefreshButton}
                      // </h2>
                      <InteractionsList
                        interactions={interactions}
                        invalidate={invalidate}
                        // fetchStatus={isRefetching ? 'revalidating' : 'success'}
                        isRefetching={isRefetching}
                      />
                    ) : (
                      <>
                        <h1 className="mb-4 text-6xl font-semibold italic">
                          No Interactions Yet
                        </h1>

                        <h3 className="mt-5 text-center text-3xl">
                          Navigate to one of the{' '}
                          <Link href="/folder" className="text-blue-400">
                            Folders
                          </Link>{' '}
                          on the left view/create VidyChats
                        </h3>
                      </>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Provider>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await authenticate(context);
  return res;
}

export default function App(props: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <Interactions {...props} />
    </QueryClientProvider>
  );
}
