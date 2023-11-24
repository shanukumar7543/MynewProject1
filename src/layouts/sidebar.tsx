/* eslint-disable no-underscore-dangle */
// import Link from 'next/link';
import AdbIcon from '@mui/icons-material/Adb';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import FolderIcon from '@mui/icons-material/Folder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { Box, FormControl, Modal, OutlinedInput } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { FormattedMessage } from 'react-intl';

import { addFolder, deleteFolder, getAllFolder } from '@/apihelpers/api';
import DeleteModal from '@/components/DeleteModal';
import EditFolder from '@/components/folder/EditFolder';
import { useStore } from '@/components/interactions/context';
import type { Folder } from '@/types/vidychat';

import PrimarySideBar from './PrimarySideBar';

// import LoadingSpinner from '@/components/LoadingSpinner';

interface UserDataProps {
  userData: any;
}

const Sidebar = (props: UserDataProps) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(true);
  const [showNewVideoaskOption, setShowNewVideoaskOption] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [newFolderName, setNewFolderName] = useState('');
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [folders, setFolders] = useState([]);
  const [sidebar3, setSidebar3] = React.useState(false);
  const handleOpen3 = () => setSidebar3(true);
  const handleClose3 = () => setSidebar3(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const router = useRouter();
  const currPath = router.asPath;
  const { setState } = useStore() ?? {};

  const fetchData = async () => {
    try {
      const response = await getAllFolder(
        props?.userData?.organization[0]?.organizationID?._id
      );
      setFolders(response.data);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  useEffect(() => {
    if (props?.userData?.organization[0]?.organizationID?._id) {
      fetchData();
      setState &&
        setState((prev: any) => ({
          ...prev,
          organizationID: props?.userData?.organization[0]?.organizationID?._id,
        }));
    }
  }, [props?.userData?.organization]);

  const GotoContactpage = () => {
    router.push('/contact');
  };

  const newVideo = () => {
    router.push('/organizations');
  };

  const style1 = {
    position: 'absolute',
    top: '48%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    height: 230,
    border: 'none',
    // p: 4,
  };

  const style3 = {
    position: 'absolute',
    top: '60%',
    left: '10%',
    transform: 'translate(-50%, -50%)',
    width: 170,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    height: 190,
    border: 'none',
    p: 2,
  };

  const handleClick = () => {
    setClick((prev) => !prev);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setClick(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddFolder = async (e: any) => {
    e?.preventDefault();
    try {
      await addFolder({
        name: newFolderName,
        organizationID:
          props?.userData?.organization &&
          props?.userData?.organization[0]?.organizationID._id,
      });
      setNewFolderName('');
      handleClose1();
      fetchData();
    } catch (error) {
      console.error('Error adding folder:', error);
    }
  };

  return (
    <>
      <div className=" flex flex-row">
        <PrimarySideBar userData={props.userData} />

        <div
          className={`group h-screen border bg-white  text-black drop-shadow-2xl  ${
            open ? 'w-56' : 'w-16'
          } border-s-indigo-500  hover:border-indigo-700`}
        >
          <div
            className="mx-1 h-[7%] cursor-pointer bg-red-50"
            ref={dropdownRef}
          >
            {open ? (
              <h1
                onClick={handleClick}
                className={`m-2.5 h-10 w-48 cursor-pointer rounded-lg border-black bg-neutral-200 px-2 py-1 text-left font-normal${
                  !open && 'scale-0'
                }`}
              >
                <ul className="justify-between">
                  <li>
                    {props?.userData?.organization &&
                      props?.userData?.organization[0]?.organizationID.name}
                    <ArrowDropDownIcon className="right-2 float-right" />
                  </li>
                </ul>
              </h1>
            ) : null}
            {click ? (
              <ul className="absolute ml-2  mt-1 h-32 w-48 space-y-3 rounded-2xl bg-white p-4 text-left text-sm text-black no-underline drop-shadow-2xl">
                <li className="text-gray-600">Set up your org...</li>
                <li className="font-medium">
                  {' '}
                  <Link href="/overview">Name your organization</Link>
                </li>
                <li className="font-medium">
                  <Link href="/teams">Invite your team</Link>
                </li>
              </ul>
            ) : null}

            <ArrowCircleLeftIcon
              className={` absolute -right-3 top-9 hidden rounded-full border-blue-500 bg-slate-200 text-3xl text-blue-700 drop-shadow-2xl group-hover:block ${
                !open && 'rotate-180'
              }`}
              onClick={() => {
                setOpen(!open);
              }}
            />
          </div>
          <div className="h-[91%]">
            <ul className="mx-1 h-[40%] space-y-4 px-2 pt-2">
              <span className="flex h-10 rounded-lg pb-3 pt-1.5  hover:bg-neutral-100">
                <SearchIcon className="mr-2 h-7 w-9 " />
                <li className={`cursor-pointer ${!open && 'scale-0'}`}>
                  <FormattedMessage id="Search" defaultMessage="Search" />
                </li>
              </span>
              <Link href="/all-interactions">
                <span className="flex h-10 rounded-lg pb-3 pt-1.5 hover:bg-neutral-100">
                  <CircleNotificationsIcon className="mr-2 h-7 w-9 text-indigo-600" />
                  <li
                    className={`cursor-pointer text-indigo-600 ${
                      !open && 'scale-0'
                    }`}
                  >
                    <FormattedMessage
                      id="All interactions"
                      defaultMessage="All interactions"
                    />
                  </li>
                </span>
              </Link>

              <span className="flex h-10 rounded-lg pb-3 pt-1.5 hover:bg-neutral-100">
                <ContactPhoneIcon className="mr-2 h-7 w-9 " />
                <li
                  onClick={GotoContactpage}
                  className={`cursor-pointer ${!open && 'scale-0'}`}
                >
                  <FormattedMessage id="Contacts" defaultMessage="Contacts" />
                </li>
              </span>
              {open ? (
                <li
                  onClick={() => {
                    setShowNewVideoaskOption(!showNewVideoaskOption);
                  }}
                  className={`h-10 w-48 cursor-pointer rounded-lg bg-black pt-2 text-center text-white ${
                    !open && 'scale-0'
                  } `}
                >
                  <FormattedMessage
                    id="New VidyChat"
                    defaultMessage="New VidyChat"
                  />
                </li>
              ) : null}
              {showNewVideoaskOption ? (
                <div>
                  <ul className="absolute mt-0.5 h-28 w-[270px]  rounded-xl  bg-white p-4 text-left text-sm font-semibold   text-black no-underline drop-shadow-2xl">
                    <li className="flex h-10 cursor-pointer space-x-3 rounded-xl p-2 hover:bg-neutral-100 ">
                      <AdbIcon />
                      <h1 onClick={newVideo}>
                        {' '}
                        {/* <Link href="/organizations"> */}{' '}
                        <FormattedMessage
                          id="Start from scratch "
                          defaultMessage="Start from scratch "
                        />
                        {/* </Link> */}
                      </h1>
                    </li>
                    <li className="flex h-10 cursor-pointer space-x-3 rounded-xl p-2 hover:bg-neutral-100 ">
                      <AdbIcon />
                      <h1>
                        <FormattedMessage
                          id="Explore templates"
                          defaultMessage="Explore templates"
                        />
                      </h1>
                    </li>
                  </ul>
                </div>
              ) : null}
            </ul>

            <div className="flex items-center justify-between gap-x-2">
              <hr className="w-[30%] border-gray-300" />
              <h1 className="text-sm text-gray-400">Folders</h1>
              <hr className="w-[30%] border-gray-300" />
            </div>

            <ul className="mx-1 h-[53%] space-y-4 px-1 pt-2">
              <div
                className="flex h-[13%] cursor-pointer rounded-lg px-1 py-2 hover:bg-neutral-100"
                onClick={handleOpen1}
              >
                <AddCircleIcon className="mr-2 h-7 w-9 " />
                <FormattedMessage id="New folder" defaultMessage="New folder" />
              </div>

              <div className="h-[84%] overflow-y-auto">
                {folders.length
                  ? folders.map((prop: Folder) => (
                      <Link
                        href={`/folder/${prop._id}`}
                        key={prop?._id}
                        // className="text-white"
                      >
                        <div
                          key={prop?._id}
                          className={`flex h-10 items-center justify-between rounded-lg px-1 py-1.5 hover:bg-neutral-100 ${
                            currPath?.includes('/folder') &&
                            currPath.split('/folder')[1]?.split('/')[1] ===
                              prop._id &&
                            ' text-indigo-600'
                          }`}
                        >
                          <span className="flex">
                            <FolderIcon className="mr-2 h-7 w-9" />
                            <li
                              className={`cursor-pointer ${!open && 'scale-0'}`}
                            >
                              <FormattedMessage
                                id={prop?.name}
                                defaultMessage={prop?.name}
                              />
                            </li>
                          </span>
                          {prop.default !== true && (
                            <MoreVertIcon
                              fontSize="small"
                              className={`cursor-pointer ${!open && 'scale-0'}`}
                              onClick={() => {
                                setSelectedFolder(prop);
                                handleOpen3();
                                // setGetElementId(prop?._id);
                                // setGetName(prop?.name);
                              }}
                            />
                          )}
                        </div>
                      </Link>
                    ))
                  : null}
              </div>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <Modal
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="h-full w-full bg-gray-300 bg-transparent">
            <Box sx={style1}>
              <Typography
                id="modal-modal-title bg-gray-300 "
                variant="h6"
                component="h2"
                className="h-14 w-full rounded-t-2xl bg-gray-200 p-3 pl-6 text-xl"
              >
                <b> Create a new folder</b>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div className="mb-10 h-full p-5">
                  <Box component="form" noValidate autoComplete="off">
                    <FormControl
                      sx={{ width: '100%', height: '10px' }}
                      style={{ height: '10px' }}
                      className="pl-2"
                    >
                      <OutlinedInput
                        className="bg-purple-100"
                        name="newfolder"
                        placeholder="Name your new folder..."
                        value={newFolderName}
                        onChange={(e) => {
                          setNewFolderName(e.target.value);
                        }}
                        style={{ height: '40px' }}
                      />
                    </FormControl>
                  </Box>
                </div>
                <div className="float-right mr-5 flex h-full flex-row space-x-1">
                  <Button
                    onClick={handleClose1}
                    className=" h-8 bg-gray-500 text-black hover:bg-gray-500"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddFolder}
                    className="h-8 bg-black  text-white hover:bg-black"
                  >
                    Submit
                  </Button>
                </div>
              </Typography>
            </Box>
          </div>
        </Modal>
      </div>

      {selectedFolder && (
        <>
          {/* Edit Modal */}
          <EditFolder
            open={showEditModal}
            handleClose={() => setShowEditModal(false)}
            folder={selectedFolder}
            fetchData={fetchData}
          />

          {/* Delete Modal */}
          <DeleteModal
            open={showDeleteModal}
            handleClose={() => setShowDeleteModal(false)}
            deleteMethod={deleteFolder}
            name={selectedFolder.name}
            id={selectedFolder._id!}
            callback={fetchData}
          />
        </>
      )}

      {/* Folder Options */}
      <div>
        <Modal
          open={sidebar3}
          onClose={handleClose3}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div
            onClick={handleClose3}
            className="h-full w-full bg-gray-300 bg-transparent"
          >
            <Box sx={style3}>
              <div>
                <div className="h-10 cursor-pointer rounded-lg p-2 pb-3 pt-1.5 text-sm hover:bg-neutral-100">
                  <h3 onClick={newVideo}>
                    <b>New videoask</b>
                  </h3>
                </div>

                <div
                  onClick={() => setShowEditModal(true)}
                  className="h-10 cursor-pointer rounded-lg p-2 pb-1 pt-1.5 text-sm hover:bg-neutral-100"
                >
                  <h3>
                    <b>Rename folder</b>
                  </h3>
                </div>

                <div className="h-10 cursor-pointer rounded-lg p-2 pb-3 pt-1.5 text-sm hover:bg-neutral-100">
                  <h3>
                    <b> Set permissions</b>
                  </h3>
                </div>

                <div
                  onClick={() => setShowDeleteModal(true)}
                  className="h-10 cursor-pointer rounded-lg p-2 pt-1.5 text-sm hover:bg-neutral-100"
                >
                  <h3>
                    <b> Delete</b>
                  </h3>
                </div>
              </div>
            </Box>
          </div>
        </Modal>
      </div>

      <Toaster />
    </>
  );
};

export default Sidebar;
