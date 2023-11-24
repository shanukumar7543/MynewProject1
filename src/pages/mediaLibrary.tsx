import styled from '@emotion/styled';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import React from 'react';

import { getUser } from '@/apihelpers/api';
import NameyourOrg from '@/components/OrgSidebar';

function mediaLlibrary(props: any) {
  const orgName = props?.response?.data?.organization[0].organizationID.name;

  const VisuallyHiddenInput = styled('input')`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;
  return (
    <div
      style={{ backgroundColor: '#F0F0F0' }}
      className="flex h-screen w-screen flex-row "
    >
      <div className="w-[17%]">
        <NameyourOrg orgName={orgName} userData={props?.response} />
      </div>

      <div className="ml-0 w-[83%]">
        <div className="mt-9">
          <Paper
            component="form"
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: 700,
              height: 40,
            }}
          >
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ flex: 1 }}
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search google maps' }}
            />

            {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              href="#file-upload"
            >
              Upload
              <VisuallyHiddenInput type="file" />
            </Button>
          </Paper>
        </div>

        <p className="mt-2 text-sm">
          Keyword search is based on transcribed text. Library only includes
          videos from steps (questions).
        </p>
        <p className="mt-2 text-sm font-semibold">
          Your Organization still doesn't have any uploaded media.
        </p>
      </div>
    </div>
  );
}

export default mediaLlibrary;
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
