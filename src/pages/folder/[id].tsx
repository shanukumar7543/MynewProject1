import SearchIcon from '@mui/icons-material/Search';
import type { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import React from 'react';

import { getAllVidyChats, getFolderById } from '@/apihelpers/api';
import Sidebar from '@/layouts/sidebar';
import type { Folder as FolderType, VidyChat } from '@/types/vidychat';
import { authenticate } from '@/utils/auth';

type FolderProps = {
  response: any;
  vidyChats: VidyChat[];
  folder: FolderType;
};

const getRandomImage = (name?: string) =>
  `https://source.unsplash.com/random/400x400${name ? `?${name}` : ''}`;

const Folder = (props: FolderProps) => {
  const { response, vidyChats, folder } = props;

  const [query, setQuery] = React.useState('');

  const getFiltered = (q: string) =>
    vidyChats.filter((chat) =>
      chat.name.toLowerCase().includes((q ?? query).toLowerCase())
    );

  const filtered = getFiltered(query);
  // console.log(filtered);

  // const router = useRouter();
  // const { id } = router.query;

  if (!response)
    return (
      <div className="flex h-screen items-center justify-center">
        <h2 className="text-2xl"> Loading... </h2>
      </div>
    );

  return (
    <div className="flex w-screen ">
      <div className="">
        <Sidebar userData={props?.response} />
      </div>

      <div className="h-screen w-screen overflow-y-auto bg-zinc-200 p-4 sm:p-2 md:px-8 md:pt-4">
        <h2 className="select-none text-2xl font-semibold text-gray-700">
          {folder.name}
        </h2>

        {vidyChats.length && (
          <div className="mt-2 flex w-full gap-3 rounded-md border-red-500 bg-red-50/60 p-1.5 focus:border-red-500 peer-focus:border-2 peer-focus:border-red-500 md:w-7/12">
            <SearchIcon className="text-red-400" />
            <input
              className="peer h-full w-full bg-transparent pr-2 outline-none"
              placeholder="Search within this folder"
              value={query}
              onChange={(e: any) => setQuery(e.target.value)}
            />
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-10">
          {vidyChats?.length ? (
            (query && filtered.length ? filtered : vidyChats).map(
              (vidyChat, i: number) => (
                <Link
                  href={`/funnel/vidy/?vidychatid=${vidyChat._id}`}
                  className="flex max-w-max flex-col items-center justify-center rounded-md bg-white pb-4 transition-all duration-300 ease-in-out hover:scale-105"
                  key={`vidychat-${i + 1}`}
                >
                  <div
                    className="h-56 w-60 rounded-b-[2rem] rounded-t-md"
                    style={{
                      backgroundImage: `url("${
                        vidyChat.thumbnail ?? getRandomImage(vidyChat.name)
                      }")`,
                    }}
                  >
                    <div className="flex h-full w-full items-end rounded-b-[2rem] rounded-t-md bg-black/20 bg-cover bg-center pb-6 pl-4 pr-3">
                      <h2 className="mt-4 line-clamp-1 text-2xl font-semibold text-white">
                        {vidyChat.name}
                      </h2>
                    </div>
                  </div>
                  <div className="mx-auto mt-4 max-w-max rounded-full bg-gray-200 px-5 py-2">
                    No Interactions Yet
                  </div>
                </Link>
              )
            )
          ) : (
            <div className="mx-auto flex min-h-[60vh] items-center justify-center">
              <h2 className="text-center text-2xl">It's awefully quit here!</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
/* <div className="flex">
  <Sidebar userData={props?.response} />

  <div className="px-10 py-5">

    <div className="mt-8">
    </div>
  </div>
</div> */

export default Folder;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.params?.id;

  const res = await authenticate(context);
  if (!res?.props?.response) return res;

  const [vidyChatRes, folderRes] = await Promise.all([
    getAllVidyChats(
      res?.props?.response?.defaultOrganization?.organizationID,
      id as string,
      context.req.cookies.accessToken as string
    ),
    getFolderById(id as string, context.req.cookies.accessToken as string),
  ]);

  return {
    props: {
      response: res?.props?.response,
      vidyChats: vidyChatRes?.data,
      folder: folderRes,
    },
  };
}
