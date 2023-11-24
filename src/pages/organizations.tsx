/* eslint-disable no-underscore-dangle */
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HelpIcon from '@mui/icons-material/Help';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import type { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { FormattedMessage } from 'react-intl';

import { createVidyChat, getAllFolder } from '@/apihelpers/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import Closeicon from '@/icons/closeicon';
import { authenticate } from '@/utils/auth';

const Organizations = (props: any) => {
  const { handleSubmit, watch, register } = useForm({
    defaultValues: {
      vidyChatName: 'Untitiled',
      folder:
        props?.response?.folders?.find((x: any) => x?.default === true)?._id ??
        '',
      contactDetails: true,
    },
  });

  const [Loader, setLoader] = useState(false);
  // const [folder, setFolder] = useState(
  //   props?.response?.folders?.find((x: any) => x?.default === true)._id ?? ''
  // );
  const router = useRouter();

  // const [inputValue, setInputValue] = useState('Untitled');

  // const handleInputChange = (event: any) => {
  //   const newValue = event.target.value;
  //   setInputValue(newValue);
  // };

  const form = watch();

  const handleVidyChat = async () => {
    /* eslint-disable no-alert */
    setLoader(true);
    const response: any = await createVidyChat({
      userId: props?.response?._id,
      organizationId: props?.response?.organization[0]?.organizationID?._id,
      name: form.vidyChatName,
      contactDetails: form.contactDetails,
      language: 'English',
      folder: form.folder,
    });
    if (response.status === 200) {
      router.push(`/createVideo/vidy?vidychatid=${response?.data?.data?._id}`);
    } else {
      toast.error('Failed to create vidychat');
    }

    setLoader(false);
  };

  return (
    <div className="max-h-screen min-h-screen min-w-full items-center justify-center bg-zinc-100 object-cover ">
      <div className="font-favorit-pro relative float-right mt-10 w-full cursor-pointer  pl-[97%] pr-8 text-sm font-bold text-purple-700">
        <Link href="/home">
          <Closeicon />
        </Link>
      </div>
      <div className="mx-auto flex  flex-col justify-between px-[12px] py-[45px] md:px-[24px]  ">
        <div className="relative m-auto h-full lg:max-w-[470px] overflow-hidden sm:min-w-[464px]} ">
          <div>
            <form
              className="flex min-h-full w-full min-w-[412px] flex-col space-y-4 text-black"
              onSubmit={handleSubmit(handleVidyChat)}
            >
              <h2 className="font-favorit-pro mx-2 mb-[18px] text-2xl  font-medium">
                <FormattedMessage
                  id="Ok, let's get started 🤟"
                  defaultMessage="Ok, let's get started 🤟"
                />
              </h2>

              <div className="mx-4 flex  h-16 justify-between rounded-xl bg-white p-2">
                <input
                  type="text"
                  // name="vidyChatName"
                  // value={inputValue}
                  // onChange={handleInputChange}
                  {...register('vidyChatName')}
                  placeholder="Name this VidyChat..."
                  className="flex min-h-full min-w-full rounded-xl p-2"
                />
              </div>

              <div className="mx-4 flex h-16 justify-between rounded-xl bg-white p-5">
                <p className="text-sm font-semibold">
                  <FormattedMessage
                    id="Collect contact details "
                    defaultMessage="Collect contact details"
                  />
                  <HelpIcon />
                </p>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    {...register('contactDetails')}
                  />
                  <div className="peer h-6 w-11 rounded-full  bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-500" />
                </label>
              </div>

              <div className="mx-4 flex  h-16 items-center justify-between rounded-xl bg-white p-5">
                <p className="text-sm font-semibold ">
                  <FormattedMessage id="Language " defaultMessage="Language " />
                  <HelpIcon />
                </p>
                <div className="flex h-10 w-24 items-center justify-center rounded-xl bg-gray-400 p-1 text-white">
                  <span className="text-sm font-semibold"> English </span>
                  <ArrowDropDownIcon className="text-white" />
                </div>
              </div>

              <div className="mx-4 flex  h-16 items-center justify-between rounded-xl bg-white p-5">
                <p className="text-sm font-semibold ">
                  <FormattedMessage id="Folder " defaultMessage="Folder " />
                  <Tooltip
                    title="Select a folder to save this VidyChat in."
                    placement="top"
                    arrow
                  >
                    <HelpIcon className="cursor-pointer" />
                  </Tooltip>
                </p>
                <div className="flex h-10 w-24 items-center justify-center rounded-xl">
                  <Select
                    {...register('folder')}
                    size="small"
                    defaultValue={form.folder}
                    className="bg-gray-100"
                  >
                    {props?.response?.folders?.map((f: any, i: number) => (
                      <MenuItem
                        key={`folder-option-${i + 1}`}
                        value={f?._id}
                        className="bg-gray-200 px-2 py-1"
                      >
                        {f?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="mx-4 my-6 h-16 rounded-xl bg-black  p-5 text-white transition-all duration-500 hover:scale-105">
                {/* <Link href="/createVideo"> */}
                <Button
                  type="submit"
                  className="h-full w-full  appearance-none rounded-3xl border-0 bg-transparent p-4 py-3 font-medium leading-6  text-white outline-none outline-transparent"
                >
                  {Loader ? (
                    <LoadingSpinner />
                  ) : (
                    <p className="text-white">
                      {' '}
                      <FormattedMessage
                        id="Create VidyChat"
                        defaultMessage="Create VidyChat"
                      />
                    </p>
                  )}
                </Button>

                {/* </Link> */}
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Organizations;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await authenticate(context);
  if (!res?.props?.response) return res;

  const folders =
    (await getAllFolder(
      res?.props?.response?.defaultOrganization?.organizationID,
      context.req?.cookies?.accessToken
    )) ?? [];

  return {
    props: {
      response: {
        ...res?.props?.response,
        folders: folders?.data,
      },
    },
  };
}
