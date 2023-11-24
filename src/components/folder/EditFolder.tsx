import {
  Box,
  Button,
  FormControl,
  Modal,
  OutlinedInput,
  Typography,
} from '@mui/material';
import React from 'react';
import { toast } from 'react-hot-toast';

import { updateFolder } from '@/apihelpers/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import type { Folder } from '@/types/vidychat';

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

interface EditProps {
  open: boolean;
  handleClose: () => void;
  folder: Folder | null;
  fetchData: () => void;
}

const EditFolder = ({ open, handleClose, folder, fetchData }: EditProps) => {
  const [rename, setRename] = React.useState(folder?.name || '');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setRename(folder?.name || '');
  }, [folder]);

  if (!folder || !folder._id) return <></>;

  const handleSubmit = async () => {
    if (!rename) return toast.error('Please enter a name');
    if (rename === folder.name) return toast.error('Please enter a new name');

    setLoading(true);
    try {
      const res = await updateFolder(folder._id!, { name: rename });
      if (res.success) {
        fetchData();
        toast.success('Folder renamed successfully!');
        handleClose();
      } else {
        toast.error(res.data.message ?? 'Something went wrong');
      }
    } catch (error: any) {
      toast.error(error.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }

    return null;
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="h-full w-full bg-gray-300 bg-transparent">
          <Box sx={style1}>
            <Typography
              className="h-16  w-full rounded-t-3xl bg-stone-100 p-10 pl-8 pt-4 text-xl"
              id="modal-modal-title bg-gray-300 "
              variant="h6"
              component="h2"
            >
              <b>Rename this Folder</b>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className="mb-10 h-full p-2">
                <Box component="form" noValidate autoComplete="off">
                  <FormControl
                    className="p-4 pl-6  "
                    sx={{ width: '100%', height: '10px' }}
                    style={{ height: '10px' }}
                  >
                    <OutlinedInput
                      className="bg-purple-100"
                      name="rename"
                      placeholder=""
                      value={rename}
                      onChange={(e) => {
                        setRename(e.target.value);
                      }}
                      style={{ height: '40px' }}
                    />
                  </FormControl>
                </Box>
              </div>
              <div className="float-right mr-6 flex h-full flex-row  space-x-4   space-y-2">
                <Button
                  onClick={handleClose}
                  className="mt-2 h-8 bg-gray-500 text-black hover:bg-gray-500"
                >
                  Cancel
                </Button>
                <Button
                  className="h-8 bg-black  text-white hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-400"
                  disabled={loading}
                  type="button"
                  onClick={handleSubmit}
                >
                  Submit
                  {loading && <LoadingSpinner color="white" />}
                </Button>
              </div>
            </Typography>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default EditFolder;
