import React, { useEffect, useState } from 'react';

import { getFunnelData } from '@/apihelpers/api';
import ContactPage from '@/components/ContactPage';
import BasicFlow from '@/components/Flow';
import Header from '@/components/Header';
import SettingPage from '@/components/SettingPage';
// import Sidebar from '@/components/Sidebar';
import { getnodesandedges } from '@/utils/Node_Edge_Helper';

const Funnel = (props: any) => {
  const [showSidebarHeader, setShowSidebarHeader] = useState(true);
  const [showSettingPage, setShowSettingPage] = useState(false);
  const [showContactPage, setShowContactPage] = useState(false);
  const [showFunnelPage, setShowFunnelPage] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await getnodesandedges(props);
    }
    fetchData();
  }, []);

  const showContact = () => {
    setShowSettingPage(false);
    setShowContactPage(true);
    setShowFunnelPage(false);
  };

  const showSetting = () => {
    setShowSettingPage(true);
    setShowContactPage(false);
    setShowFunnelPage(false);
  };

  return (
    <>
      <div className="h-screen w-screen bg-zinc-200">
        {showContactPage && (
          <ContactPage
            showSettingPage={setShowSettingPage}
            vidychatdata={props?.response}
            showFunnelPage={setShowFunnelPage}
            showContactPage={setShowContactPage}
          />
        )}
        {showSettingPage && (
          <SettingPage
            showSettingPage={setShowSettingPage}
            vidychatdata={props?.response}
            showFunnelPage={setShowFunnelPage}
            showContactPage={setShowContactPage}
          />
        )}
        {showFunnelPage && (
          <>
            {showSidebarHeader && (
              <Header
                name={props?.response?.name}
                showSetting={showSetting}
                showContact={showContact}
              />
            )}
            <BasicFlow
              vidychatdata={props}
              setShowSidebarHeader={setShowSidebarHeader}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Funnel;

export async function getServerSideProps(context: any) {
  const token = (await context.req.cookies.accessToken) as string;
  const { vidychatid } = context.query;
  const response = await getFunnelData({
    token,
    vidychatid,
  });

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
      response: response?.data,
      vidychatid,
    },
  };
}
