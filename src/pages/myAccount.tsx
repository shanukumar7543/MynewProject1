import Link from 'next/link';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { getUser } from '@/apihelpers/api';
import UserSideBar from '@/components/UserSideBar';

function myAccount(props: any) {
  const orgName = props.response.data.organization[0].organizationID.name;
  return (
    <div
      style={{ backgroundColor: '#F0F0F0' }}
      className="flex h-screen w-screen flex-row "
    >
      <div>
        <UserSideBar orgName={orgName} userData={props?.response} />
      </div>

      <div className="h-screen w-screen overflow-auto pl-8 pt-8 ">
        <p className="mt-2 text-[20px] font-bold">{props.response.data.name}</p>
        <p className="mb-4 text-[14px] font-semibold text-gray-600">Account</p>
        <div className="w-[50%]  rounded-xl bg-white p-10 ">
          <div className=" flex flex-row justify-between">
            <div className="space-y-2">
              <h2 className="text-xl font-medium">Your account credentials</h2>
            </div>
          </div>

          <div>
            <div className="mt-10 flex justify-between space-x-1.5 text-sm">
              <div className="flex space-x-4">
                <div className="pt-1">
                  The account name is:
                  <p className="text-[14px] font-bold">
                    {props.response.data.name}
                  </p>
                  <p className="mt-3 font-semibold text-green-500">
                    Update Name:
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter Your name"
                      // autoComplete="off"
                      autoComplete="off"
                      className="mx-6 w-44 border-x-0 border-b border-t-0 border-b-zinc-400 bg-inherit px-2 text-lg font-light outline-none"
                    />
                    <Link className="text-white" href="/login">
                      <button
                        type="button"
                        className="ml-1 mt-2 w-16 rounded-3xl bg-purple-700 pb-1 text-center text-sm font-medium text-white transition
                          duration-500 hover:scale-105"
                      >
                        <FormattedMessage id="Update" defaultMessage="Update" />
                      </button>
                    </Link>
                  </p>
                  <p className="mt-6">The account email is:</p>
                  <p className="text-[14px] font-bold">
                    {props.response.data.email}
                  </p>
                  <p className="mt-3 font-semibold text-green-500">
                    {' '}
                    Update Email:
                    <input
                      type="text"
                      id="Email"
                      placeholder="Enter Your Email"
                      // autoComplete="off"
                      autoComplete="off"
                      className="mx-6 w-44 border-x-0 border-b border-t-0 border-b-zinc-400 bg-inherit px-2 text-lg font-light outline-none"
                    />
                    <Link className="text-white" href="/login">
                      <button
                        type="button"
                        className="ml-1 mt-2 w-16 rounded-3xl bg-purple-700 pb-1 text-center text-sm font-medium text-white transition
                          duration-500 hover:scale-105"
                      >
                        <FormattedMessage id="Verify" defaultMessage="Verify" />
                      </button>
                    </Link>
                  </p>
                  <br />
                  <br />
                  <Link
                    className="mt-6 font-semibold text-green-500"
                    href="/login"
                  >
                    Log out of this account
                  </Link>
                  <br />
                  <br />
                  <Link
                    className="mt-6 font-semibold text-green-500"
                    href="/login"
                  >
                    Update your password
                  </Link>
                  <br />
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter Your name"
                    // autoComplete="off"
                    autoComplete="off"
                    className="w-50 mt-4 border-x-0 border-b border-t-0 border-b-zinc-400 bg-inherit px-2 text-lg font-light outline-none"
                  />
                  <br />
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter Your name"
                    // autoComplete="off"
                    autoComplete="off"
                    className="w-50 mt-4 border-x-0 border-b border-t-0 border-b-zinc-400 bg-inherit px-2 text-lg font-light outline-none"
                  />
                  <Link className="text-white" href="/login">
                    <button
                      type="button"
                      className="ml-6 mt-2 w-16 rounded-3xl bg-purple-700 pb-1 text-center text-sm font-medium text-white transition
                          duration-500 hover:scale-105"
                    >
                      <FormattedMessage id="Update" defaultMessage="Update" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ldsnv;lanvids;nvil;vndl;vno;cna */}
        <div className="my-10  w-[50%] rounded-xl bg-white p-10">
          <h2 className="text-xl font-medium">Data preferences</h2>
          <div className="mt-6 flex w-full justify-between text-[14px]">
            <p className="flex font-semibold">
              I'd like to occasionally get useful tips & inspiration via email.
            </p>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" value="" className="peer sr-only" />
              <div className="peer h-6 w-11 rounded-full  bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-500" />
            </label>
          </div>
          <div className="mt-6 flex w-full justify-between text-[14px] font-semibold">
            <p className="flex">
              Tailor VideoAsk to my needs based on my activity.
            </p>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" value="" className="peer sr-only" />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-500" />
            </label>
          </div>
          <div className="mt-6 flex w-full justify-between text-[14px]">
            <p className="flex font-semibold">
              Enrich my data with select third parties for more relevant
              content.
            </p>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" value="" className="peer sr-only" />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-500" />
            </label>
          </div>
        </div>
        {/* 2i2nrfi2rnfd23kfpn3n */}

        {/* ldsnv;lanvids;nvil;vndl;vno;cna */}
        <div className="my-10  w-[50%] rounded-xl bg-white p-10">
          <h2 className="text-xl font-medium">Advanced options</h2>
          <div className="mt-6 flex w-full justify-between text-[14px]">
            <div className="flex font-semibold">
              'Map view' as default view
              <img
                src="/help.svg"
                alt="screenRecording"
                className="ml-1 h-[25px] w-[25px]"
              />
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" value="" className="peer sr-only" />
              <div className="peer h-6 w-11 rounded-full  bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-500" />
            </label>
          </div>
          <div className="mt-6 flex w-full justify-between text-[14px] font-semibold">
            <div className="flex">
              Show tips in builder menu
              <img
                src="/help.svg"
                alt="screenRecording"
                className="ml-1 h-[25px] w-[25px]"
              />
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" value="" className="peer sr-only" />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-500" />
            </label>
          </div>
        </div>
        {/* 2i2nrfi2rnfd23kfpn3n */}

        {/* ldsnv;lanvids;nvil;vndl;vno;cna */}
        <div className="my-10  w-[50%] rounded-xl bg-white p-10">
          <h2 className="text-xl font-medium">Delete my account</h2>

          <p className="mt-4 flex w-full text-sm">
            If you do this, all your videoasks and the data they collected get
            removed from our system — forever.
          </p>
          <br />
          <Link className="mt-2 text-sm text-green-500" href="/login">
            Delete my account
          </Link>
        </div>
        {/* 2i2nrfi2rnfd23kfpn3n */}
      </div>
    </div>
  );
}
export default myAccount;

export async function getServerSideProps(context: any) {
  const token = (await context.req.cookies.accessToken) as string;
  const response = await getUser(token);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {
      response,
    },
  };
}
