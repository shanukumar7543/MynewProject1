/* eslint-disable no-underscore-dangle */
import 'react-phone-input-2/lib/style.css';

import DeleteIcon from '@mui/icons-material/Delete';
import DuoIcon from '@mui/icons-material/Duo';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Box, Button, Modal, Typography } from '@mui/material';
import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { deleteContact, getFolderById } from '@/apihelpers/api';
import EditModal from '@/components/contact/EditModal';
import Sidebar from '@/layouts/sidebar';
import { authenticate } from '@/utils/auth';

interface ContactType {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

interface UserDataProps {
  response: any;
}

const GoToContact: React.FC<UserDataProps> = (props: UserDataProps) => {
  const [contact, setContact] = useState<ContactType | null>(null);
  // const [buttonDisabled, setButtonDisabled] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // const [phone, setPhone] = useState('');
  // const [loading, setLoading] = useState(false);
  const [textChange, setTextChange] = useState(0);
  const [getDelInput, setGetDelInput] = useState('');

  const router = useRouter();

  const contactId = router.query.id;

  const fetchDataById = async (conId: any) => {
    try {
      const response = await getFolderById(conId);
      setContact(response);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  useEffect(() => {
    fetchDataById(contactId);
  }, [contactId]);

  const backToContactpage = () => {
    router.push('/contact');
  };

  const handleDeleteContact = async () => {
    try {
      await deleteContact(contactId as string);
      router.push('/contact');
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };

  // useEffect(() => {
  //   console.log(router.query.id);
  //   if (
  //     formData.email.length > 0 &&
  //     formData.name.length > 0 &&
  //     formData.phone.length > 9 &&
  //     formData.phone.length < 11
  //   ) {
  //     setButtonDisabled(false);
  //   } else {
  //     setButtonDisabled(true);
  //   }
  // }, [formData.email, formData.name, formData.phone]);

  const style5 = {
    position: 'absolute',
    top: '48%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 470,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    height: 360,
    border: 'none',
    p: 4,
  };

  const alertMassage = () => {
    alert('You are typeing Wrong Text');
  };

  return (
    <>
      <div className="flex w-screen ">
        <div>
          <Sidebar userData={props?.response} />
        </div>

        <div
          className="flex h-screen w-screen  items-center justify-center bg-zinc-200 p-4 sm:p-2 
        md:p-8"
        >
          {contact ? (
            <>
              <div className="h-full w-[430px] px-2 ">
                <div className="pb-5">
                  <div className="flex space-x-2 pb-5">
                    <KeyboardBackspaceIcon
                      className="cursor-pointer"
                      onClick={() => router.back()}
                    />
                    <p
                      className="cursor-pointer font-medium "
                      onClick={backToContactpage}
                    >
                      {' '}
                      Back to Contact
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <img
                      alt="Gravatar for shanu@inzint.com"
                      src="https://www.gravatar.com/avatar/bbc8341412113cadcbaffd005e21d0e7?d=retro&amp;r=g&amp;s=50"
                      className="react-gravatar thumbnail__GravatarThumb-sc-1fceaqo-1 kwmfXD mr-2 rounded-lg"
                      width="70"
                      height="60"
                    />

                    <div className="space-x-2">
                      <p className="text-xl font-medium">{contact.name}</p>
                      <p className="ml-2">{contact.email}</p>
                      <div className=" mt-1 flex space-x-2 text-black">
                        <VideocamIcon className="cursor-pointer rounded-full bg-white p-1 hover:bg-white/50" />
                        <ModeEditIcon
                          onClick={() => {
                            // setPhone(contact.phone);
                            setEditModalOpen(true);
                          }}
                          className="cursor-pointer rounded-full bg-white p-1 hover:bg-blue-500/50"
                        />
                        <DeleteIcon
                          onClick={() => setDeleteModalOpen(true)}
                          className="cursor-pointer rounded-full bg-white p-1 hover:bg-red-500/50"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-7 flex cursor-pointer space-x-4 text-base  text-slate-400">
                    <p
                      className={
                        textChange === 1 ? 'text-blue-800 underline' : ''
                      }
                      onClick={() => {
                        setTextChange(1);
                      }}
                    >
                      Videoask
                    </p>
                    <p
                      className={
                        textChange === 0
                          ? 'space-y-2 text-blue-950 underline'
                          : ''
                      }
                      onClick={() => {
                        setTextChange(0);
                      }}
                    >
                      Direct Message
                    </p>
                  </div>

                  <div>
                    <button
                      className="animation-delay-50 animation-iteration-count-1 delay-50 ml-0 mr-4  mt-8 flex h-11 w-full cursor-pointer items-center justify-center rounded-lg
              bg-black p-1 text-base text-white  duration-100 hover:scale-105 sm:text-sm  md:w-80 
             "
                    >
                      <DuoIcon fontSize="large" className="pr-3 font-bold " />{' '}
                      Send me a Video message
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ''
          )}

          {textChange === 0 ? (
            <div
              className="flex h-full w-full flex-col items-center justify-center space-y-8 
             rounded-3xl bg-zinc-50 p-4  sm:p-8 md:p-14 "
            >
              <h2 className=" sm:pl-24 md:pl-1">
                This respondent has no direct messages.
              </h2>
            </div>
          ) : (
            <div
              className="flex h-full w-full flex-col items-center justify-center space-y-8 
             rounded-3xl bg-zinc-50 p-4 pt-56 sm:p-8 md:p-14 "
            >
              <span className="sm:pl-20 md:pl-1">
                <img
                  src="https://icons.veryicon.com/png/o/miscellaneous/food-time/play-video-1.png"
                  height="90px"
                  width="90px"
                  alt=""
                />
              </span>
              <h2 className="items-center justify-center">
                This respondent has no interactions yet
              </h2>
            </div>
          )}
        </div>

        {/* ======================= {Edit Contact } ======================= */}
        <EditModal
          open={editModalOpen}
          handleClose={() => setEditModalOpen(false)}
          contactData={contact!}
          callback={(updatedContact: ContactType) => setContact(updatedContact)}
        />

        {/* ======================= {Delte Contact } ======================= */}
        <div>
          <Modal
            open={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="h-full w-full bg-gray-300 bg-transparent">
              <Box sx={style5}>
                <div className="mb-5">
                  <Typography
                    id="modal-modal-title bg-gray-300 "
                    variant="h6"
                    component="h2"
                  >
                    <b>Delete for all eternity?</b>
                  </Typography>
                </div>

                <div className="mb-2 h-9 items-center justify-center bg-red-600 p-1 pl-24 text-white">
                  <h3>
                    <b className="text-sm">
                      Important! Please read carefully...
                    </b>
                  </h3>
                </div>

                <div>
                  <p>
                    <b className="text-sm">Are you sure you want to proceed?</b>
                  </p>
                </div>

                <div className="mt-3 text-base">
                  <p>
                    Please type <mark>{contact!?.name}</mark> in the box below
                    to confirm:{' '}
                  </p>
                </div>

                <div className="mt-2">
                  <input
                    className="h-10 w-full bg-indigo-100 pl-2"
                    type="text"
                    name=""
                    id=""
                    value={getDelInput}
                    onChange={(e) => {
                      setGetDelInput(e.target.value);
                    }}
                    placeholder={`Type ${contact!?.name}`}
                  />
                </div>
                {contact!?.name !== getDelInput ? (
                  <p className="text-red-600">Text Not Match</p>
                ) : (
                  ''
                )}

                <div className="float-right mt-8 flex space-x-3">
                  <div className="h-8 w-20 rounded  bg-gray-500">
                    <Button
                      onClick={() => setDeleteModalOpen(false)}
                      className="text-black"
                    >
                      Cancel
                    </Button>
                  </div>
                  <div className="h-8 w-32 rounded bg-red-500 ">
                    <Button
                      onClick={() => {
                        contact!?.name === getDelInput
                          ? handleDeleteContact!()
                          : alertMassage();
                      }}
                      className="text-white"
                    >
                      Yes delete it
                    </Button>
                  </div>
                </div>
              </Box>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default GoToContact;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await authenticate(context);
  return res;
}
