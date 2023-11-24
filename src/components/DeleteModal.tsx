import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';
import { toast, Toaster } from 'react-hot-toast';

import LoadingSpinner from './LoadingSpinner';

const style5 = {
  position: 'absolute',
  top: '48%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 470,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  height: 420,
  border: 'none',
  p: 4,
};

interface DeleteProps {
  open: boolean;
  handleClose: () => void;
  name: string;
  id: string;
  deleteMethod: (id: string) => Promise<any>;
  callback?: () => void;
  _extras?: { [key: string]: any };
}

const DeleteModal = ({
  open,
  handleClose,
  name,
  id,
  callback,
  deleteMethod,
}: DeleteProps) => {
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setInput('');
  }, [name]);

  const handleSubmit = async () => {
    if (input !== name) return;

    setLoading(true);
    try {
      const res = await deleteMethod(id);
      if (res.success) {
        callback && callback();
        handleClose();
      } else {
        toast.error(res?.data?.message ?? 'Something went wrong');
      }
    } catch (err: any) {
      toast.error(err.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
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

            <div className="mb-3">
              <p className="text-sm">
                All videoasks inside this folder will be in the trash for 30
                days before it is permanently deleted. <br /> You will be able
                to recover your videoasks during this time.
              </p>
            </div>

            <div>
              <p>
                <b className="text-sm">
                  Are you sure you want to permanently delete this folder?
                </b>
              </p>
            </div>

            <div className="mt-3 text-base">
              <p>
                Please type <mark>{name}</mark> in the box below to confirm:{' '}
              </p>
            </div>

            <div className="mt-2">
              <input
                className="h-10 w-full bg-indigo-100 pl-2"
                type="text"
                name=""
                id=""
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Type ${name}`}
              />
            </div>
            {name !== input ? (
              <p className="text-red-600">Text Not Match</p>
            ) : (
              ''
            )}

            <div className="float-right mt-8 flex space-x-3">
              <div className="h-8 w-20 rounded  bg-gray-500">
                <Button onClick={handleClose} className="text-black">
                  Cancel
                </Button>
              </div>
              <div className="h-8 w-32 rounded bg-red-500 ">
                <Button
                  onClick={handleSubmit}
                  className="text-white disabled:cursor-not-allowed disabled:bg-gray-400"
                  disabled={loading}
                >
                  Yes delete it
                  {loading && <LoadingSpinner color="white" />}
                </Button>
              </div>
            </div>
          </Box>
        </div>
      </Modal>

      <Toaster />
    </>
  );
};

export default DeleteModal;
