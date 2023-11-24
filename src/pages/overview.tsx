import { FormControl, OutlinedInput } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import type { GetServerSidePropsContext } from 'next';
import * as React from 'react';
import { toast, Toaster } from 'react-hot-toast';

import { updateOrganization } from '@/apihelpers/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import Brands from '@/components/overview/Brands';
import Settings from '@/components/overview/DefaultSettings';
import ReplyToEmail from '@/components/overview/ReplyToEmail';
import { authenticate } from '@/utils/auth';

import NameyourOrg from '../components/OrgSidebar';

export default function Overview(props: any) {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [orgName, setOrgName] = React.useState(
    props?.response?.organization[0]?.organizationID?.name
  );

  const [orgData, setOrgData] = React.useState(orgName);
  const [organization, setOrganization] = React.useState(
    props?.response?.organization[0]?.organizationID
  );

  const handleClose = () => setOpen(false);

  const refereshOrg = async (data: any) => {
    const response: any = await updateOrganization({
      ...data,
      organizationId: props?.response?.organization[0]?.organizationID?._id,
    });
    if (response?.status === 200) {
      toast.success('Updated successfully!');
      setOrgName(response?.data?.data?.name);
      setOrganization(response?.data?.data);
    } else {
      toast.error('Something went wrong!');
    }
  };

  const updateOrgHandler = async () => {
    setLoading(true);
    /* eslint-disable no-promise-executor-return */
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    /* eslint-disable no-underscore-dangle */
    const response: any = await updateOrganization({
      name: orgData,
      logo: 'www.logo.com',
      organizationId: props?.response?.organization[0]?.organizationID?._id,
    });

    if (response?.status === 200) {
      // handleUserDetails();
      setOrgName(response?.data?.data?.name);
      handleClose();
    }
    setLoading(false);
  };

  const style = {
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
    p: 4,
  };

  return (
    <>
      <div className="flex h-screen flex-col lg:flex-row">
        <div className="lg:w-1/4">
          <NameyourOrg orgName={orgName} userData={props?.response} />
        </div>

        <div className="min-h-full overflow-y-auto lg:ml-8 lg:w-3/4">
          <div className="m-2 mt-8 h-auto space-y-3 rounded-2xl bg-white text-left text-black no-underline shadow-2xl lg:h-52 lg:w-[610px]">
            <div className="w-full p-10">
              <h2 className="pb-7 text-xl">
                <b>Your organization details</b>
              </h2>
              <p className="pb-3 text-sm">
                You haven't set a name for your organization yet.
              </p>
              <div onClick={() => setOpen(true)}>
                <p className="text-sm text-green-600">
                  <b className="cursor-pointer">
                    Set a name for your organization
                  </b>
                </p>
              </div>
            </div>
          </div>

          <ReplyToEmail organization={organization} onUpdate={refereshOrg} />

          <Settings
            organizationId={
              props?.response?.organization[0]?.organizationID._id
            }
            settings={organization?.settings}
            onUpdate={refereshOrg}
            // settings={{
            //   branding: {
            //     name: 'VidyChat',
            //     image: 'https://www.logo.com',
            //     url: 'https://www.vidyachat.com',
            //   },
            //   colors: {
            //     primary: '#FFC542',
            //     secondary: '#FF5656',
            //     background: '#ffffff',
            //   },
            //   language: 'English',
            //   buttonBorderRadius: 4,
            //   font: {
            //     family: 'Roboto',
            //     url: 'https://fonts.googleapis.com/css?family=Roboto',
            //   },
            // }}
          />

          <Brands
            organizationId={
              props?.response?.organization[0]?.organizationID._id
            }
            brands={organization?.brands}
          />
        </div>
      </div>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="h-full w-full bg-gray-300 bg-transparent">
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <b className="pl-2"> Update organization name...</b>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div className="mb-10 h-full p-2">
                  <Box component="form" noValidate autoComplete="off">
                    <FormControl
                      sx={{ width: '41ch', height: '10px' }}
                      style={{ height: '10px' }}
                    >
                      <OutlinedInput
                        name="neworg"
                        placeholder="New organization name"
                        value={orgData}
                        onChange={(e) => {
                          setOrgData(e.target.value);
                        }}
                        style={{ height: '40px' }}
                      />
                    </FormControl>
                  </Box>
                </div>
                <div className="ml-auto flex h-full max-w-max flex-row space-x-4 space-y-2 pr-3">
                  <Button
                    onClick={handleClose}
                    className="mt-2 h-8 bg-gray-500 text-black hover:bg-gray-500"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={updateOrgHandler}
                    className="flex gap-2 bg-black text-white hover:bg-black disabled:cursor-not-allowed disabled:bg-black/80"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="text-white">Submitting...</span>
                        <LoadingSpinner />
                      </>
                    ) : (
                      'Submit'
                    )}
                  </Button>
                </div>
              </Typography>
            </Box>
          </div>
        </Modal>
        <Toaster position="bottom-center" />
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await authenticate(context);
  return res;
}
