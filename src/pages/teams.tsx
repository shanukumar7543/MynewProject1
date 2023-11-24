import DeleteIcon from '@mui/icons-material/Delete';
import FolderIcon from '@mui/icons-material/Folder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  createInvite,
  deleteInvite,
  getAllFolder,
  getAllInvites,
  getInviteById,
  getUser,
  updateInvite,
  updateInviteRole,
  // updateInviteRole,
} from '@/apihelpers/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import NameyourOrg from '@/components/OrgSidebar';

interface Folder {
  _id: string;
  name: string;
  access: string;
}

function Teams(props: any) {
  const orgName = props.response.data.organization[0].organizationID.name;
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const handleOpen4 = () => setOpen4(true);
  const handleClose4 = () => setOpen4(false);
  const [activeTab, setActiveTab] = useState(0);
  const [folders, setFolders] = useState([]);
  const [getInvite, setGetInvite] = useState([]);
  const [selectedFolders, setSelectedFolders] = useState<any>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [email, setEmail] = useState('');
  const [dropdown, setDropdown] = useState('MEMBER');
  const [updateRole, setUpdateRole] = useState([
    {
      id: '',
      role: '',
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    const getEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsEmailValid(getEmail);
  }, [email]);

  const style2 = {
    position: 'absolute',
    top: '48%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    height: dropdown === 'MEMBER' ? 560 : 250,
    border: 'none',
    p: 1,
  };

  const style3 = {
    position: 'absolute',
    top: '42%',
    left: '51.2%',
    transform: 'translate(-50%, -50%)',
    width: 322,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    height: 123,
    border: 'none',
    p: 0.1,
  };

  const fetchData = async () => {
    try {
      const response = await getAllFolder(
        props.response.data.organization[0].organizationID._id
      );
      setFolders(response.data);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  const fetchAllInvites = async () => {
    try {
      const response = await getAllInvites(
        props.response.data.organization[0].organizationID._id
      );
      setGetInvite(response.data);
      setUpdateRole(
        response.data.map((item: any) => {
          return {
            id: item._id,
            role: item.role,
          };
        })
      );
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  const handleInviteCreate = async () => {
    setLoading(true);

    try {
      if (!isUpdate) {
        if (isEmailValid) {
          await createInvite({
            email,
            organizationId:
              props.response.data.organization[0].organizationID._id,
            role: dropdown,
            folder: selectedFolders.map((ele: any) => ({
              id: ele.id,
              access: ele.access,
            })),
          });
          fetchAllInvites();
          fetchData();
          handleClose2();
          setSelectedFolders([]);
          setEmail('');
          setDropdown('MEMBER');
        } else {
          setIsEmailValid(false);
        }
      } else {
        await updateInvite({
          id: selectedId,
          folder: selectedFolders.map((ele: any) => ({
            id: ele.id,
            access: ele.access,
          })),
        });

        handleClose4();
        setIsUpdate(false);
        setSelectedFolders([]);
      }
    } catch (error) {
      console.error('Error While Creating:', error);
    }
    setLoading(false);
  };

  const getInvteById = async (Id: any) => {
    try {
      const response = await getInviteById(Id);
      console.log('response', response);
      setSelectedFolders(response.folder);
      // setContact(response);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchAllInvites();
  }, []);

  const handleDeleteInvite = async (inviteId: any) => {
    try {
      await deleteInvite(inviteId);
      fetchAllInvites();
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };

  const updatedRoleHandler = async (role: string) => {
    await updateInviteRole({ id: selectedId, role });
    setUpdateRole((prevSelected: any) => {
      if (
        selectedFolders.filter((ele: any) => ele.id === selectedId).length > 0
      ) {
        return prevSelected.map((ele: any) => {
          if (ele.id === selectedId) {
            return {
              ...ele,
              role,
            };
          }
          return ele;
        });
      }
      return [
        ...prevSelected,
        {
          id: selectedId,
          role,
        },
      ];
    });
    fetchAllInvites();
  };

  return (
    <>
      <div
        style={{ backgroundColor: '#F0F0F0' }}
        className="flex h-screen w-screen flex-row "
      >
        <div>
          <NameyourOrg orgName={orgName} userData={props?.response} />
        </div>

        <div className="h-screen w-screen pl-8 pt-8 ">
          <div className="favorit-pro  w-[40%]  rounded-xl bg-white p-10 ">
            <div className=" flex flex-row justify-between">
              <div className="space-y-2">
                <h2 className="text-xl font-medium">
                  Team{' '}
                  <span className="text-sm  text-slate-500">
                    {' '}
                    (1 of 3 seats used)
                  </span>
                </h2>
                <p className="text-sm text-slate-500">
                  Need more seats?{' '}
                  <span className=" animation-delay-50 animation-iteration-count-1 delay-50 w-15 h-10 cursor-pointer rounded-md  bg-gray-300  p-2 text-xs font-medium text-black duration-100 hover:scale-105 md:w-14 ">
                    Upgrade
                  </span>
                </p>
              </div>

              <div
                onClick={handleOpen2}
                className=" animation-delay-50 animation-iteration-count-1 delay-50 w-15 h-10 cursor-pointer rounded-md  bg-black   p-1.5 pl-3 text-base text-white duration-100 hover:scale-105 md:w-14 "
              >
                <PersonAddIcon
                  fontSize="medium"
                  className="text-center text-white"
                />
              </div>
            </div>

            <div>
              <div className="favorit-pro mt-10 flex justify-between space-x-1.5 text-sm">
                <div className="flex space-x-4">
                  <div className="h-12 w-12 rounded-full bg-orange-300" />
                  <div className="pt-1">
                    <h1 className="text-base font-medium">
                      {props.response.data.name}
                    </h1>
                    <p className="text-xs text-slate-500">
                      {props.response.data.email}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="p-4 pt-6 text-sm text-slate-500">
                    Organization owner
                  </p>
                </div>
              </div>
            </div>

            {getInvite?.map((item: any) => (
              <div key={item.id}>
                {item.status === 'PENDING' ? (
                  <>
                    {/* Add a unique key for each mapped element */}
                    <div className="favorit-pro mt-2 flex justify-between space-x-1.5 text-sm">
                      <div className="flex space-x-4">
                        <div className="h-12 w-12 rounded-full bg-orange-300" />
                        <div className="items-center justify-center pt-1">
                          <p className="text-base font-semibold text-slate-500">
                            {item.email}
                          </p>
                          <p className="h-5  w-20 items-center rounded-xl bg-yellow-300 pl-3 text-xs font-semibold">
                            {item.status === 'PENDING' ? item.status : ''}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center  justify-center ">
                        <p className="p-4 pt-6 text-sm text-slate-500">
                          {item.role}
                        </p>

                        <span className="h-8 w-8 rounded bg-slate-300 p-1">
                          <DeleteIcon
                            onClick={() => {
                              handleDeleteInvite(item._id);
                            }}
                          />
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="favorit-pro mt-2 flex justify-between space-x-1.5 text-sm">
                    <div className="flex space-x-4">
                      <div className="h-12 w-12 rounded-full bg-orange-300" />
                      <div className="items-center justify-center pt-1">
                        <h1 className="text-base font-medium">
                          {item?.userId?.name || ''}{' '}
                          {/* Access item-specific data */}
                        </h1>
                        <p className="text-xs text-slate-500">{item.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center  justify-center ">
                      <div
                        onClick={() => {
                          handleOpen3();
                          setSelectedId(item._id);
                        }}
                        className="mr-2 flex h-8 w-24 rounded-lg border-red-600  bg-slate-300 p-1  pl-3 text-sm"
                      >
                        <button>
                          {updateRole.filter((ele) => ele.id === item._id)[0]
                            ?.role || 'ADMIN'}

                          <KeyboardArrowDownIcon
                            fontSize="small"
                            className="float-right flex"
                          />
                        </button>
                      </div>

                      {updateRole.filter((ele) => ele.id === item._id)[0]
                        ?.role !== 'ADMIN' && (
                        <div className="mr-2 flex cursor-pointer rounded-lg bg-slate-300  p-2">
                          <svg
                            onClick={() => {
                              setSelectedId(item._id);
                              handleOpen4();
                              getInvteById(item._id);
                              setIsUpdate(true);
                            }}
                            fill="none"
                            height="16"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              clip-rule="evenodd"
                              d="M7 3.442a3 3 0 01-.379-.32l-.242-.243A3 3 0 004.257 2H3a3 3 0 00-3 3v8a3 3 0 003 3h10a3 3 0 003-3v-2h-2v2a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h1.257a1 1 0 01.707.293l.243.243A5 5 0 007 5.686V3.442z"
                              fill="#000"
                              fill-rule="evenodd"
                            />
                            <path
                              clip-rule="evenodd"
                              d="M14 5.5v-3a1.5 1.5 0 00-3 0v3a1.5 1.5 0 003 0zM12.5 0A2.5 2.5 0 0010 2.5v3a2.5 2.5 0 005 0v-3A2.5 2.5 0 0012.5 0z"
                              fill="#000"
                              fill-rule="evenodd"
                            />
                            <path
                              clip-rule="evenodd"
                              d="M16 3.167H9V7a2 2 0 002 2h3a2 2 0 002-2V3.167zM12.5 5a.5.5 0 00-.5.5v1a.5.5 0 001 0v-1a.5.5 0 00-.5-.5z"
                              fill="#000"
                              fill-rule="evenodd"
                            />
                          </svg>
                        </div>
                      )}

                      <span className="h-8 w-8 cursor-pointer rounded bg-slate-300 p-1">
                        <DeleteIcon
                          onClick={() => {
                            handleDeleteInvite(item._id);
                          }}
                        />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* modal */}

      <div>
        <Modal
          open={open2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="bg-gray-00 h-full w-full bg-transparent">
            <Box sx={style2}>
              <Typography
                className="h-14  w-full justify-between rounded-t-3xl bg-stone-100 p-10 pl-8 pt-4 text-lg"
                id="modal-modal-title bg-gray-300 "
                variant="h6"
                component="h2"
              >
                <b className=""> Invite a new team member...</b>{' '}
              </Typography>
              <div>
                <div className="ml-9 mt-10 pr-8  ">
                  <div className="w-90 flex rounded-lg  border-2 border-red-600 pr-0">
                    <input
                      className=" h-10 w-11/12 rounded-l-lg bg-slate-200  p-4 hover:bg-slate-300 "
                      type="text"
                      name=""
                      id=""
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder={`mary@example.com `}
                    />
                    <div
                      onClick={handleOpen3}
                      className="flex h-10 w-32 rounded-r-lg border-red-600  bg-slate-300 p-1  pl-3 text-sm"
                    >
                      <button>
                        {/* Member */}
                        {dropdown}
                        <KeyboardArrowDownIcon
                          fontSize="small"
                          className="float-right flex"
                        />
                      </button>
                    </div>
                  </div>
                  {!isEmailValid ? (
                    <p className="h-0  text-sm text-red-600">
                      Please Enter Valid Email Address
                    </p>
                  ) : (
                    ''
                  )}
                </div>
              </div>

              {dropdown !== 'ADMIN' ? (
                <div>
                  <div>
                    <div className="ml-9 mt-8 flex space-x-2 font-sans	">
                      <div
                        className={`${
                          activeTab === 0
                            ? ' bg-purple-100 font-semibold text-purple-500'
                            : ''
                        } h-10 w-28   rounded-md  p-2 pl-3 text-sm  text-slate-500 
                      hover:text-black`}
                      >
                        <button
                          onClick={() => {
                            setActiveTab(0);
                          }}
                        >
                          All Content
                        </button>
                      </div>

                      <div
                        className={`${
                          activeTab === 1
                            ? 'bg-purple-100 font-semibold text-purple-500'
                            : ''
                        } h-10 w-36  rounded-md p-2 pl-4 text-sm  text-slate-500  hover:text-black`}
                      >
                        <button
                          onClick={() => {
                            setActiveTab(1);
                          }}
                        >
                          Specific folders
                        </button>
                      </div>
                    </div>

                    {activeTab === 0 ? (
                      <div
                        className="w-90 ml-9 mr-8 mt-4 h-64
                 items-center  justify-center border-y  border-slate-100 bg-white text-base"
                      >
                        <div className="p-20 text-slate-500">
                          Member will have access to all{' '}
                          <span className=""> videoasks & all folders. </span>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="w-90 ml-9 mr-8 mt-4 h-64 overflow-auto
                           border-y  border-slate-100 bg-white text-slate-500"
                      >
                        {folders.length &&
                          folders.map((prop: Folder) => (
                            <div
                              key={prop?._id}
                              className=" h-10 rounded-lg pb-3 pt-1.5 hover:bg-neutral-100 "
                            >
                              <span className="flex justify-between ">
                                <ul className="flex">
                                  <FolderIcon className="mr-2 h-7 w-9 " />
                                  <li
                                    className={`"scale-0" cursor-pointer
                               `}
                                  >
                                    <FormattedMessage
                                      id={prop?.name}
                                      defaultMessage={prop?.name}
                                    />
                                  </li>
                                </ul>

                                <div className="flex ">
                                  {/* {toggleButton === prop._id ? ( */}

                                  {selectedFolders?.filter(
                                    (ele: any) => ele.id === prop._id
                                  ).length > 0 && (
                                    <button
                                      // onClick={handleClose2}
                                      className="mr-3   h-7 w-20 rounded-md bg-stone-200 p-1 pl-2  text-sm  text-black   "
                                    >
                                      <select
                                        defaultValue="read"
                                        onChange={(e: any) => {
                                          setSelectedFolders(
                                            (prevSelected: any) => {
                                              return prevSelected.map(
                                                (ele: any) => {
                                                  if (ele.id === prop._id) {
                                                    return {
                                                      ...ele,
                                                      access: e.target.value,
                                                    };
                                                  }
                                                  return {
                                                    ...ele,
                                                  };
                                                }
                                              );
                                            }
                                          );
                                        }}
                                        id="cars"
                                      >
                                        <option value="write">Write</option>
                                        <option value="read" selected>
                                          Read
                                        </option>
                                        {/* <option value="" selected>
                                          Select
                                        </option> */}
                                      </select>
                                    </button>
                                  )}
                                  {/* ) : (
                                ""
                              )} */}

                                  <label className="relative float-right inline-flex cursor-pointer">
                                    <input
                                      onChange={(e: any) => {
                                        // setToggleButton(prop._id);

                                        setSelectedFolders(
                                          (prevSelected: any) => {
                                            if (
                                              selectedFolders.filter(
                                                (ele: any) =>
                                                  ele.id === prop._id
                                              ).length > 0
                                            ) {
                                              return prevSelected.filter(
                                                (ele: any) =>
                                                  ele.id !== prop._id
                                              );
                                            }
                                            return [
                                              ...prevSelected,
                                              { id: prop._id },
                                            ];
                                          }
                                        );

                                        setTimeout(() => {
                                          if (e.target.checked) {
                                            setSelectedFolders(
                                              (prevSelected: any) => {
                                                return prevSelected.map(
                                                  (ele: any) => {
                                                    if (ele.id === prop._id) {
                                                      return {
                                                        ...ele,
                                                        access: 'read',
                                                      };
                                                    }
                                                    return {
                                                      ...ele,
                                                    };
                                                  }
                                                );
                                              }
                                            );
                                          }
                                        }, 500);
                                      }}
                                      type="checkbox"
                                      checked={
                                        selectedFolders.filter(
                                          (ele: any) => ele.id === prop._id
                                        ).length > 0
                                      }
                                      value=""
                                      className="peer sr-only"
                                    />

                                    <div className="peer h-6 w-11 rounded-full  bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-500" />
                                  </label>
                                </div>
                              </span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                ''
              )}
              <Typography id="modal-modal-description">
                <div className="mb-10 flex h-full flex-col p-2 text-sm">
                  <div className=" float-right ml-64 space-x-1 p-1   ">
                    <button
                      onClick={handleClose2}
                      className="animation-delay-50 animation-iteration-count-1 delay-50 mr-1 mt-2   h-7 w-16 rounded-md  bg-stone-200 p-1 text-black duration-100  hover:scale-105 hover:bg-stone-300 "
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleInviteCreate}
                      type="button"
                      className={` h-7 w-16 rounded-md bg-black p-1 text-white hover:bg-gray-500`}
                    >
                      {loading ? <LoadingSpinner /> : 'invite'}
                    </button>
                  </div>
                </div>
              </Typography>
            </Box>
          </div>
        </Modal>

        <Modal
          open={open4}
          onClose={handleClose4}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="bg-gray-00 h-full w-full bg-transparent">
            <Box sx={style2}>
              <Typography
                className="h-16  w-full justify-between rounded-t-3xl bg-stone-100  pl-8 pt-4 text-lg"
                id="modal-modal-title bg-gray-300 "
                variant="h6"
                component="h2"
              >
                <b className=""> Manage access for - {props?.name}</b>{' '}
              </Typography>

              {dropdown !== 'ADMIN' ? (
                <div>
                  <div>
                    <div className="ml-9 mt-8 flex space-x-2 font-sans	">
                      <div
                        className={`${
                          activeTab === 0
                            ? ' bg-purple-100 font-semibold text-purple-500'
                            : ''
                        } h-10 w-28   rounded-md  p-2 pl-3 text-sm  text-slate-500 
                      hover:text-black`}
                      >
                        <button
                          onClick={() => {
                            setActiveTab(0);
                          }}
                        >
                          All Content
                        </button>
                      </div>

                      <div
                        className={`${
                          activeTab === 1
                            ? 'bg-purple-100 font-semibold text-purple-500'
                            : ''
                        } h-10 w-36  rounded-md p-2 pl-4 text-sm  text-slate-500  hover:text-black`}
                      >
                        <button
                          onClick={() => {
                            setActiveTab(1);
                          }}
                        >
                          Specific folders
                        </button>
                      </div>
                    </div>

                    {activeTab === 0 ? (
                      <div
                        className="w-90 ml-9 mr-8 mt-4 h-64
                  items-center  justify-center border-y  border-slate-100 bg-white text-base"
                      >
                        <div className="p-20 text-slate-500">
                          Member will have access to all{' '}
                          <span className=""> videoasks & all folders. </span>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="w-90 ml-9 mr-8 mt-4 h-64 overflow-auto
                           border-y  border-slate-100 bg-white text-slate-500"
                      >
                        {folders.length &&
                          folders.map((prop: Folder) => (
                            <div
                              key={prop?._id}
                              className=" h-10 rounded-lg pb-3 pt-1.5 hover:bg-neutral-100 "
                            >
                              <span className="flex justify-between ">
                                <ul className="flex">
                                  <FolderIcon className="mr-2 h-7 w-9 " />
                                  <li
                                    className={`"scale-0" cursor-pointer
                               `}
                                  >
                                    <FormattedMessage
                                      id={prop?.name}
                                      defaultMessage={prop?.name}
                                    />
                                  </li>
                                </ul>

                                <div className="flex ">
                                  {selectedFolders.filter(
                                    (ele: any) => ele.id === prop._id
                                  ).length > 0 && (
                                    <button
                                      // onClick={handleClose2}
                                      className="mr-3   h-7 w-20 rounded-md bg-stone-200 p-1 pl-2  text-sm  text-black   "
                                    >
                                      <select
                                        value={
                                          (selectedFolders.filter(
                                            (ele: any) => {
                                              return ele.id === prop._id;
                                            }
                                          )[0]?.access as unknown as string) ||
                                          ''
                                        }
                                        onChange={(e: any) => {
                                          setSelectedFolders(
                                            (prevSelected: any) => {
                                              return prevSelected.map(
                                                (ele: any) => {
                                                  if (ele.id === prop._id) {
                                                    return {
                                                      ...ele,
                                                      access: e.target.value,
                                                    };
                                                  }
                                                  return {
                                                    ...ele,
                                                  };
                                                }
                                              );
                                            }
                                          );
                                        }}
                                        id="cars"
                                      >
                                        <option value="write">Write</option>
                                        <option value="read" selected>
                                          Read
                                        </option>
                                        {/* <option value="" selected>
                                          Select
                                        </option> */}
                                      </select>
                                    </button>
                                  )}
                                  {/* ) : (
                                ""
                              )} */}

                                  <label className="relative float-right inline-flex cursor-pointer">
                                    <input
                                      onChange={(e: any) => {
                                        // setToggleButton(prop._id);

                                        setSelectedFolders(
                                          (prevSelected: any) => {
                                            if (
                                              selectedFolders.filter(
                                                (ele: any) =>
                                                  ele.id === prop._id
                                              ).length > 0
                                            ) {
                                              return prevSelected.filter(
                                                (ele: any) =>
                                                  ele.id !== prop._id
                                              );
                                            }
                                            return [
                                              ...prevSelected,
                                              { id: prop._id },
                                            ];
                                          }
                                        );

                                        setTimeout(() => {
                                          if (e.target.checked) {
                                            setSelectedFolders(
                                              (prevSelected: any) => {
                                                return prevSelected.map(
                                                  (ele: any) => {
                                                    if (ele.id === prop._id) {
                                                      return {
                                                        ...ele,
                                                        access: 'read',
                                                      };
                                                    }
                                                    return {
                                                      ...ele,
                                                    };
                                                  }
                                                );
                                              }
                                            );
                                          }
                                        }, 500);
                                      }}
                                      type="checkbox"
                                      checked={
                                        selectedFolders.filter(
                                          (ele: any) => ele.id === prop._id
                                        ).length > 0
                                      }
                                      value=""
                                      className="peer sr-only"
                                    />

                                    <div className="peer h-6 w-11 rounded-full  bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-500" />
                                  </label>
                                </div>
                              </span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                ''
              )}
              <Typography id="modal-modal-description">
                <div className="mb-10 flex h-full flex-col p-2 text-sm">
                  <div className=" float-right ml-64 space-x-1 p-1   ">
                    <button
                      onClick={() => {
                        setIsUpdate(false);
                        handleClose4();
                        setSelectedFolders([]);
                      }}
                      className="animation-delay-50 animation-iteration-count-1 delay-50 mr-1 mt-2   h-7 w-16 rounded-md  bg-stone-200 p-1 text-black duration-100  hover:scale-105 hover:bg-stone-300 "
                    >
                      Cancel
                    </button>

                    <button
                      onClick={() => {
                        console.log('aaaa');
                        handleInviteCreate();
                      }}
                      type="button"
                      className={` h-7 w-16 rounded-md bg-black p-1 text-white hover:bg-gray-500`}
                    >
                      {loading ? <LoadingSpinner /> : 'Update'}
                    </button>
                  </div>
                </div>
              </Typography>
            </Box>
          </div>
        </Modal>

        <Modal
          open={open3}
          onClose={handleClose3}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style3}>
            <div className="p-2 font-sans text-sm">
              <div
                onClick={() => {
                  if (selectedId) {
                    updatedRoleHandler('ADMIN');
                  } else {
                    setDropdown('ADMIN');
                  }
                  handleClose3();
                }}
                className="cursor-pointer rounded-md p-1.5 pl-4 hover:bg-purple-100"
              >
                <h1 onClick={handleClose3} className="font-medium">
                  {' '}
                  Admin
                </h1>
                <p className="text-slate-500">
                  Access all contect & organization setting
                </p>
              </div>

              <div
                onClick={() => {
                  if (selectedId) {
                    updatedRoleHandler('MEMBER');
                  } else {
                    setDropdown('MEMBER');
                  }
                  handleClose3();
                }}
                className="cursor-pointer rounded-md p-1.5 pl-4 hover:bg-purple-100"
              >
                <h1 className="font-medium">Member</h1>
                <p className="text-slate-500">
                  Access all content or Specific folders
                </p>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default Teams;

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
