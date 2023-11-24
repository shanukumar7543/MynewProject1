/* eslint-disable no-underscore-dangle */
import 'react-phone-input-2/lib/style.css';

import { zodResolver } from '@hookform/resolvers/zod';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Box, Button, Modal, Typography } from '@mui/material';
import type { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import PhoneInput from 'react-phone-input-2';
import { z } from 'zod';

import {
  addContact,
  deleteContact,
  getAllContact,
  updateContact,
} from '@/apihelpers/api';
import EditModal from '@/components/contact/EditModal';
import Sidebar from '@/layouts/sidebar';
import { emailSchema, nameRegex } from '@/schemas/schema';
import { authenticate } from '@/utils/auth';
import { sortContacts } from '@/utils/contact';

interface ContactType {
  _id: string;
  name: string;
  email: string;
  phone: string;
  favorite?: boolean;
}

const formSchema = z.object({
  email: emailSchema,
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .regex(nameRegex, 'Symbols are not allowed'),
  phone: z
    .string()
    .min(10, 'Phone should be less then 10 digits')
    .regex(/^\d{10}$/, 'Invalid phone number'),
});

const style1 = {
  position: 'absolute',
  top: '48%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 420,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  height: 420,
  border: 'none',
  // p: 4,
};

type Form = z.infer<typeof formSchema>;

interface UserDataProps {
  response: any;
}

// EditModal Component
// Props: open, handleClose, contactData: {name, email, phone, _id}
// keep form handling in same component
// default value contactData.name, contactData.email, contactData.phone

const Contact: React.FC<UserDataProps> = (props: UserDataProps) => {
  const [contact, setContact] = useState<ContactType[]>([]);
  const [filtered, setFiltered] = useState<ContactType[]>([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const [open3, setOpen3] = React.useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);
  const [open4, setOpen4] = React.useState(false);
  const handleOpen4 = () => setOpen4(true);
  const handleClose4 = () => setOpen4(false);
  const [open5, setOpen5] = React.useState(false);
  const handleOpen5 = () => setOpen5(true);
  const handleClose5 = () => setOpen5(false);
  const [getDelInput, setGetDelInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [triggerFetch, setTriggerFetch] = useState(true);
  const [contactData, setContactData] = useState<ContactType>(
    {} as ContactType
  );
  const [query, setQuery] = useState<string>('');

  const { register, watch, reset, formState } = useForm<Form>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
    mode: 'all',
    resolver: zodResolver(formSchema),
  });
  const { errors } = formState;

  const fetchData = async () => {
    try {
      const response = await getAllContact(
        props?.response?.organization[0]?.organizationID?._id
      );
      setContact(response.data);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };
  useEffect(() => {
    if (triggerFetch) {
      fetchData().then(() => {
        setTriggerFetch(false);
      });
    }
  }, [triggerFetch]);

  useEffect(() => {
    if (props?.response?.organization[0]?.organizationID?._id)
      setTriggerFetch(() => true);
  }, [props.response]);

  const handleDeleteContact = async (contactId: any) => {
    try {
      await deleteContact(contactId);
      fetchData();
      setGetDelInput('');
      handleClose5();
    } catch (error) {
      console.error('Error deleting folder:', error);
    }
  };

  const formData = watch();
  // const router = useRouter();
  useEffect(() => {
    if (formData.email.length > 0 && formData.name.length > 0)
      setButtonDisabled(false);
    else setButtonDisabled(true);

    if (Object.keys(errors).length > 0) setButtonDisabled(true);
    if (phone.length < 12) setButtonDisabled(true);
  }, [formData, errors, phone]);

  // =================== {Search} ===================
  const handleQueryChange = () => {
    const result = contact.filter((c) => {
      return (
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.email.toLowerCase().includes(query.toLowerCase()) ||
        c.phone.toLowerCase().includes(query.toLowerCase())
      );
    });
    sortContacts(result);
    setFiltered(result);
  };

  useEffect(handleQueryChange, [query]);
  // =================== {End of Search} ===================

  const handleFavorite = async (contactId: any, c: ContactType) => {
    try {
      await updateContact(contactId, {
        ...c,
        favorite: c.favorite ? !c.favorite : true,
      });
      setContact((prev) => {
        const index = prev.findIndex((x) => x._id === contactId);
        const temp = [...prev];
        temp[index]!.favorite = !c.favorite;
        /* eslint-disable no-nested-ternary */
        sortContacts(temp);
        return temp;
      });
    } catch (error) {
      console.error('Error adding folder:', error);
    }
  };

  const style2 = {
    position: 'absolute',
    top: '48%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    height: 250,
    border: 'none',
    // p: 4,
  };
  const style3 = {
    position: 'absolute',
    top: '32%',
    left: '27%',
    transform: 'translate(-50%, -50%)',
    width: 200,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    height: 230,
    border: 'none',
    p: 2,
  };
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

  // const GotoContactpage = () => {
  //   router.push(`/contact/${getElementId}`);
  // };

  const handleCreateContact = async () => {
    try {
      setLoading(true);
      await addContact({
        name: formData.name,
        email: formData.email,
        phone,
        organizationID: props?.response?.organization[0]?.organizationID?._id,
      });
      reset();
      setPhone('');
      handleClose3();
      handleClose2();
      handleClose1();
      // GotoContactpage();
      // fetchData();
      setTriggerFetch(() => true);
    } catch (error) {
      console.error('Error adding folder:', error);
    }
    setLoading(false);
  };

  const alertMassage = () => {
    alert('You are typeing Wrong Text');
  };

  const contacts = filtered.length > 0 ? filtered : contact;

  return (
    <>
      <div className="flex w-screen ">
        <div className="">
          <Sidebar userData={props?.response} />
        </div>

        <div
          className="flex h-screen w-screen items-center justify-center bg-zinc-200 p-4 sm:p-2 
        md:p-8"
        >
          {contacts.length > 0 ? (
            <>
              <div className="h-full  pl-2 pr-6">
                <div className="pb-5">
                  <label
                    htmlFor="default-search"
                    className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Search
                  </label>

                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        className="h-4 w-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full rounded-lg border border-blue-800 bg-gray-50 p-1.5 pl-10 text-sm text-black outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-blue-600 dark:bg-gray-200 dark:text-black dark:placeholder:text-gray-100 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="Search contacts"
                      required
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      // onChange={handleQueryChange}
                    />
                  </div>
                </div>

                <div className="mr-1 flex justify-between space-x-1 ">
                  <div className=""> {contact.length || ''} contact</div>

                  <button
                    onClick={handleOpen2}
                    className="flex cursor-pointer items-center gap-2 rounded-md  bg-gray-200 px-3 py-1 text-black duration-100 hover:scale-105"
                  >
                    <PersonAddIcon className=" font-normal text-black" /> Add
                  </button>
                </div>

                <div className="flex flex-row justify-items-start pt-3">
                  <p className="font-medium">S</p>{' '}
                  <hr className="ml-1.5 mt-3 h-0.5 w-64 rounded border-0 bg-gray-200 " />
                </div>

                {query.length > 0 && filtered.length === 0 ? (
                  <h2 className="py-10 text-center text-gray-600">
                    No contacts found
                  </h2>
                ) : (
                  contacts.map((prop: ContactType) => (
                    <div
                      key={prop?._id}
                      className="mt-2  flex h-16 w-full justify-between rounded-md  p-2 hover:bg-slate-300"
                    >
                      <div className="flex items-center justify-center space-x-2 text-sm">
                        <div className="h-10 w-10 rounded-full bg-orange-300" />
                        <div>
                          <p className="text-sm font-semibold">{prop?.name}</p>
                          <p>{prop?.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-center space-x-2">
                        <button
                          className="cursor-pointer p-0"
                          onClick={() => handleFavorite(prop._id, prop)}
                        >
                          {prop?.favorite ? (
                            <FavoriteIcon className="text-red-500" />
                          ) : (
                            <FavoriteBorderIcon />
                          )}
                        </button>
                        {/* <FavoriteBorderIcon className="bg-red-500" /> */}
                        <MoreVertIcon
                          className="w-5 hover:h-8 hover:bg-yellow-50"
                          onClick={() => {
                            setContactData(prop);
                            handleOpen3();
                          }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            ''
          )}

          {contact.length === 0 ? (
            <div
              className="flex h-full w-full flex-col items-center space-y-8 
             rounded-3xl bg-zinc-50 p-4 sm:p-8"
            >
              <span className="sm:pl-20 md:pl-1">
                {/* <Image
                  src="https://icons.veryicon.com/png/o/miscellaneous/food-time/play-video-1.png"
                  height={90}
                  width={90}
                  alt="VidyChat"
                /> */}
                <PlayCircleIcon className="rounded-full text-6xl text-black" />
              </span>
              <h2 className=" sm:pl-24 md:pl-1">
                😶 It's awfully quiet over here
              </h2>
              <p className="text-sm sm:text-base md:text-sm">
                The contacts directory will be populated as you start collecting{' '}
                <br />
                <span className="items-center justify-center md:flex">
                  contact information on your videoasks.
                </span>{' '}
              </p>
              <p className=" sm:pl-20 md:pl-1 ">or</p>

              {/* <button className="animation-delay-50 animation-iteration-count-1 delay-50 flex h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-black p-1  text-base font-semibold text-white duration-100  hover:scale-105  sm:text-sm md:w-72">
                <SystemUpdateAltIcon className="mr-4" />
                Import contacts
              </button> */}
              <button
                onClick={() => {
                  setOpen2(false);
                  handleOpen1();
                }}
                className="flex h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-zinc-200 p-1 text-base text-black duration-100 hover:scale-105 sm:text-xl md:w-72"
              >
                <PersonAddIcon className="mr-4 font-medium" />
                Add contact
              </button>
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
                Select a contact to see all their interactions.
              </h2>
            </div>
          )}
        </div>
      </div>

      {/* ======================= {New Contact 2} ======================= */}
      <div>
        <Modal
          // style={{backgroundColor:" gainsboro"}}
          open={open1}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="h-full w-full  bg-transparent ">
            <Box sx={style1}>
              <Typography
                className="h-14  w-full rounded-t-3xl bg-stone-100 p-10 pt-4 text-base"
                id="modal-modal-title bg-gray-300 "
                variant="h6"
                component="h2"
              >
                <b className=""> Add new contact</b>
              </Typography>
              <Typography id="modal-modal-description">
                <div className="mb-10 flex h-full flex-col p-2 text-sm">
                  <Box className=" p-8 ">
                    <form
                      style={{ width: '100%', height: '10px' }}
                      // onSubmit={handleSubmit(handleCreateContact)}
                    >
                      <div className="pb-5 ">
                        <label htmlFor="" className="text-sm  text-gray-600">
                          Name:
                        </label>
                        <br />
                        <input
                          id="fullWidth"
                          placeholder="Name"
                          {...register('name')}
                          className=" w-full rounded-md border-hidden bg-zinc-100 p-2 outline-white hover:bg-stone-200"
                        />
                        <small className="text-red-500">
                          {errors.name?.message ?? ''}
                        </small>
                      </div>

                      <div className="pb-5">
                        <label htmlFor="" className=" text-gray-600">
                          Email (required):
                        </label>
                        <br />
                        <input
                          placeholder="Email"
                          {...register('email')}
                          id="fullWidth"
                          className="w-full rounded-md border-none bg-zinc-100 p-2 hover:bg-stone-200"
                        />
                        <small className="text-red-500">
                          {errors.email?.message ?? ''}
                        </small>
                      </div>
                      <div className="space-y-2 pb-5">
                        <label htmlFor="" className="text-gray-600 ">
                          Phone number:
                        </label>
                        <br />
                        <div className="flex">
                          <PhoneInput
                            value={phone}
                            onChange={(phones: any) => setPhone(phones)}
                            containerStyle={{
                              width: '100%',
                              height: '35px',
                            }}
                            inputStyle={{
                              width: '100%',
                              height: '35px',
                              backgroundColor: ' #f4f4f8',
                            }}
                            country="ind"
                            enableSearch
                          />
                          <small className="text-red-500">
                            {errors.phone?.message ?? ''}
                          </small>
                        </div>
                      </div>

                      <div className=" float-right ml-48 space-x-1 p-1   ">
                        <button
                          onClick={handleClose1}
                          className="animation-delay-50 animation-iteration-count-1 delay-50 mr-1 mt-2   h-7 w-16 rounded-md  bg-stone-200 p-1 text-black duration-100  hover:scale-105 hover:bg-stone-300 "
                        >
                          Cancel
                        </button>

                        <button
                          onClick={handleCreateContact}
                          type="button"
                          disabled={loading || buttonDisabled}
                          className={` h-7 w-16 rounded-md bg-black p-1 text-white duration-100 hover:scale-105 hover:bg-gray-500 disabled:cursor-not-allowed disabled:bg-black/60`}
                        >
                          {loading ? (
                            'Creating...'
                          ) : (
                            // <LoadingSpinner />
                            <FormattedMessage
                              id="Create"
                              defaultMessage="Create"
                            />
                          )}
                        </button>
                      </div>
                    </form>
                  </Box>
                </div>
              </Typography>
            </Box>
          </div>
        </Modal>
      </div>

      {/* ======================= {New Contact 1} ======================= */}
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
                className="h-14  w-full justify-between rounded-t-3xl bg-stone-100 p-10 pt-4 text-lg"
                id="modal-modal-title bg-gray-300 "
                variant="h6"
                component="h2"
              >
                <b className=""> Add new contacts</b>{' '}
                <span
                  onClick={handleClose2}
                  className="float-right cursor-pointer"
                >
                  <CloseIcon />
                </span>
              </Typography>
              <Typography id="modal-modal-description">
                <div className="mb-10 flex h-full flex-col p-2 text-sm">
                  <div className=" space-y-2 p-8">
                    {/* <button className="animation-delay-50 animation-iteration-count-1 delay-50 sm:text-md flex h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-black  p-1 text-base text-white duration-100    hover:scale-105  md:w-96">
                      <SystemUpdateAltIcon className="mr-4" />
                      Import contacts
                    </button> */}
                    <button
                      onClick={() => {
                        handleOpen1();
                        handleClose2();
                      }}
                      className="animation-delay-50 animation-iteration-count-1 delay-50 sm:text-md flex  h-11 w-full cursor-pointer items-center justify-center rounded-lg bg-zinc-200 
                 p-1 text-base text-black duration-100 hover:scale-105  md:w-96 
                  "
                    >
                      <PersonAddIcon className="mr-4 font-medium" />
                      Add contact
                    </button>
                  </div>
                </div>
              </Typography>
            </Box>
          </div>
        </Modal>
      </div>

      {/* ======================= {Popover} ======================= */}
      <div>
        <Modal
          open={open3}
          onClose={handleClose3}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div
            onClick={handleClose3}
            className="h-full w-full bg-gray-300 bg-transparent"
          >
            <Box sx={style3}>
              <div className="from-neutral-900 font-sans  text-sm font-medium">
                <div className="h-10 cursor-pointer rounded-lg p-2 pb-3 pt-1.5 text-sm hover:bg-neutral-100">
                  {/* <h3 onClick={newVideo}> */}
                  <p className="font-semibold">{contactData.email}</p>
                  {/* </h3> */}
                </div>

                <div
                  onClick={handleOpen3}
                  className="h-10 cursor-pointer rounded-lg p-2 pb-1 pt-1.5 text-sm hover:bg-neutral-100"
                >
                  <Link href={`/contact/${contactData._id}`}>
                    <h3>
                      <b>Go to contact</b>
                    </h3>
                  </Link>
                </div>

                <div className="h-10 cursor-pointer rounded-lg p-2 pb-3 pt-1.5 text-sm hover:bg-neutral-100">
                  <h3
                    onClick={() => {
                      // alert(contactData.phone);
                      handleOpen4();
                    }}
                  >
                    <b> Edit contact details</b>
                  </h3>
                </div>

                <div
                  onClick={() => {
                    handleOpen5();
                  }}
                  className="h-10 cursor-pointer space-y-4 rounded-lg p-2 pb-3 pt-1.5 text-sm hover:bg-neutral-100"
                >
                  <h3>
                    <b> Delete contact</b>
                  </h3>
                </div>

                <div className="h-10 cursor-pointer space-y-4 rounded-lg  p-2 pb-3 pt-1.5 text-sm hover:bg-neutral-100">
                  <h3>
                    <b> Start new interaction</b>
                  </h3>
                </div>
              </div>
            </Box>
          </div>
        </Modal>
      </div>

      {/* ======================= {Edit Contact} ======================= */}
      <EditModal
        open={open4}
        handleClose={handleClose4}
        contactData={contactData}
        callback={(updatedContact: ContactType) => {
          setContact((prev: any) => {
            const temp = prev.map((c: any) => {
              if (c._id === updatedContact._id) {
                return {
                  ...c,
                  name: updatedContact.name,
                  email: updatedContact.email,
                  phone: updatedContact.phone,
                };
              }
              return c;
            });
            return temp;
          });
        }}
      />

      {/* ======================= {Delete Contact} ======================= */}
      <div>
        <Modal
          open={open5}
          onClose={handleClose5}
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
                  <b className="text-sm">Important! Please read carefully...</b>
                </h3>
              </div>

              <div>
                <p>
                  <b className="text-sm">Are you sure you want to proceed?</b>
                </p>
              </div>

              <div className="mt-3 text-base">
                <p>
                  Please type <mark>{contactData.name}</mark> in the box below
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
                  placeholder={`Type ${contactData.name}`}
                />
              </div>
              {contactData.name !== getDelInput ? (
                <p className="text-red-600">Text Not Match</p>
              ) : (
                ''
              )}

              <div className="float-right mt-8 flex space-x-3">
                <div className="h-8 w-20 rounded  bg-gray-500">
                  <Button onClick={handleClose5} className="text-black">
                    Cancel
                  </Button>
                </div>
                <div className="h-8 w-32 rounded bg-red-500 ">
                  <Button
                    onClick={() => {
                      contactData.name === getDelInput
                        ? handleDeleteContact(contactData._id)
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
    </>
  );
};

export default Contact;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await authenticate(context);
  return res;
}
