/* eslint no-underscore-dangle: 0 */

import 'react-phone-input-2/lib/style.css';

import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';
import PhoneInput from 'react-phone-input-2';
import { z } from 'zod';

import { updateContact } from '@/apihelpers/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import { emailSchema } from '@/schemas/schema';

interface ContactType {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

interface IEditModal {
  open: boolean;
  handleClose: () => void;
  contactData: ContactType;
  callback: (...args: any) => void;
}

const formSchema = z.object({
  email: emailSchema,
  name: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .regex(/^[a-zA-Z ]+$/),
  phone: z
    .string()
    .min(10, 'Phone should be less then 10 digits')
    .regex(/^\d{10}$/),
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

const EditModal: React.FC<any> = ({
  open,
  handleClose,
  contactData,
  // setContact,
  callback,
}: IEditModal) => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState(contactData?.phone ?? '');

  const { register, watch, reset } = useForm({
    defaultValues: {
      name: '',
      email: '',
    },
    mode: 'onBlur',
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    reset({ ...contactData });
    setPhone(contactData?.phone ?? '');
  }, [contactData]);

  // alert(contactData.email);

  const formData = watch();

  const handleUpdateContact = async () => {
    setLoading(true);
    try {
      await updateContact(contactData._id, {
        name: formData.name,
        email: formData.email,
        phone,
      });
      reset();
      handleClose();

      // setContact((prev: any) => {
      //   const temp = prev.map((contact: any) => {
      //     if (contact._id === contactData._id) {
      //       return {
      //         ...contact,
      //         name: formData.name,
      //         email: formData.email,
      //         phone,
      //       };
      //     }
      //     return contact;
      //   });
      //   return temp;
      // });
      if (callback) {
        callback({
          ...contactData,
          name: formData.name,
          email: formData.email,
          phone,
        });
      }
    } catch (error) {
      console.error('Error updating folder:', error);
      alert('Error updating contact');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
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
              <b className="">
                {' '}
                Edit contact details: {contactData?.email ?? ''}
              </b>
            </Typography>
            <Typography id="modal-modal-description">
              <div className="mb-10 flex h-full flex-col p-2 text-sm">
                <Box className=" p-8 ">
                  <form style={{ width: '100%', height: '10px' }}>
                    <div className="pb-5 ">
                      <label htmlFor="" className="text-sm  text-gray-600">
                        Name:
                      </label>{' '}
                      <br />
                      <input
                        id="fullWidth"
                        placeholder="Name"
                        {...register('name')}
                        className=" w-full rounded-md border-hidden bg-zinc-100 p-2 outline-white hover:bg-stone-200"
                      />
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
                    </div>
                    <div className="space-y-2 pb-5">
                      <label htmlFor="" className="text-gray-600 ">
                        Phone number:
                      </label>
                      <br />
                      <div className="flex">
                        {/* <input
                          placeholder="+000"
                          className="mr-4 w-16 rounded-md border-none bg-zinc-100 hover:bg-stone-200"
                        />
                        <input
                          id="fullWidth"
                          {...register('phone')}
                          className="w-full rounded-md border-none bg-zinc-100 p-2 hover:bg-stone-200"
                        /> */}
                        <PhoneInput
                          value={phone}
                          onChange={(ph: any) => setPhone(ph)}
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
                      </div>
                    </div>

                    <div className=" float-right ml-48 space-x-1 p-1   ">
                      <button
                        onClick={handleClose}
                        className="mr-1 mt-2 h-7 w-16 rounded-md  bg-stone-200 p-1 text-black duration-100  hover:scale-105 hover:bg-stone-300 "
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        onClick={handleUpdateContact}
                        disabled={loading}
                        className={` h-7 w-16 rounded-md bg-black p-1 text-white hover:bg-gray-500 disabled:cursor-not-allowed disabled:bg-gray-700`}
                      >
                        {loading ? (
                          <LoadingSpinner />
                        ) : (
                          <FormattedMessage
                            id="Update"
                            defaultMessage="Update"
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
  );
};

export default EditModal;
