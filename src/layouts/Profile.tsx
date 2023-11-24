import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Modal } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '15%',
  transform: 'translate(-50%, -50%)',
  width: 330,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
  // height: 620,
  border: 'none',
  p: 1,
  pl: 2,
};

interface ProfileProps {
  userData: any;
}

const Profile = ({ userData }: ProfileProps) => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const router = useRouter();

  const logoutHandler = () => {
    router.push('/logout');
  };

  return (
    <>
      <AlternateEmailIcon
        onClick={handleOpen}
        className="h-10 w-10 cursor-pointer text-white"
      />
      <div>
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div
            // onClick={handleClose}
            className="w-full bg-gray-300 bg-transparent"
          >
            <Box sx={style}>
              <div>
                <div className="mb-2">
                  <div className="p-2 text-sm">
                    <h1>
                      <b className="text-blue-600">Hi, {userData?.name}</b>
                    </h1>
                    <p>{userData?.email}</p>
                  </div>

                  <div
                    className="rounded-lg px-2 py-1.5 text-sm hover:bg-neutral-100"
                    onClick={() => router.push('/myAccount')}
                  >
                    <h3>
                      <b>My Account</b>
                    </h3>
                  </div>

                  <div className="cursor-not-allowed rounded-lg px-2 py-1.5 text-sm hover:bg-neutral-100">
                    <h3>
                      <b>Authorized apps</b>
                    </h3>
                  </div>

                  <div className="cursor-not-allowed rounded-lg px-2 py-1.5 text-sm hover:bg-neutral-100">
                    <h3>
                      <b>API</b>
                    </h3>
                  </div>
                </div>

                <div className="mb-2">
                  <hr className="mx-auto my-3 w-10/12 border-gray-500" />
                  <div className="p-2 text-sm">
                    <h1 className="font-bold text-gray-700">My organization</h1>
                  </div>

                  <div
                    className="cursor-pointer rounded-lg p-2 text-sm hover:bg-neutral-100 hover:text-blue-600"
                    onClick={() => router.push('/overview')}
                  >
                    <h3 className="font-bold">Overview</h3>
                    <p>View & edit org level settings</p>
                  </div>

                  <div className="cursor-not-allowed rounded-lg p-2 text-sm hover:bg-neutral-100">
                    <h3 className="font-bold">Plan & Billing</h3>
                    <p>Control plan & billing for this org</p>
                  </div>

                  <div className="cursor-not-allowed rounded-lg p-2 text-sm  hover:bg-neutral-100">
                    <h3 className="font-bold">Referrals</h3>
                    <p>Refer others to VideoAsk and earn minutes</p>
                  </div>

                  <div
                    className="cursor-pointer rounded-lg p-2 text-sm hover:bg-neutral-100 hover:text-blue-600"
                    onClick={() => router.push('/teams')}
                  >
                    <h3 className="font-bold">Team</h3>
                    <p>View & invite people to this org</p>
                  </div>

                  <div className="cursor-not-allowed rounded-lg p-2 text-sm  hover:bg-neutral-100">
                    <h3 className="font-bold">Media Library</h3>
                  </div>
                </div>

                <div className="mt-8 rounded-lg bg-red-500 p-2 text-sm text-white hover:opacity-90">
                  <h1
                    className="flex cursor-pointer items-center justify-center gap-2 text-center text-sm"
                    onClick={logoutHandler}
                  >
                    <LogoutIcon />
                    <b>Logout</b>
                  </h1>
                </div>
              </div>
            </Box>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Profile;
