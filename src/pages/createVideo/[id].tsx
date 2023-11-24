import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import {
  PresignedUrlForThumbnailUpload,
  PresignedUrlForVedioUpload,
} from '@/apihelpers/api';
import VideoRecordingComponent from '@/components/CameraHandler';
import LibrarySave from '@/components/LibrarySave';
import ScreenRecordingComponent from '@/components/ScreenRec';
import Closeicon from '@/icons/closeicon';
import Libraryicon from '@/icons/Libraryicon';
import ShareScreen from '@/icons/shareScreen';
import { Uploadicon } from '@/icons/Uploadicon';

interface EdgeProps {
  edgeProps: any;
  setShowVideoComponent: any;
}

const CreateVideo = (_props: EdgeProps) => {
  const [showCamera, setShowCamera] = useState(false);
  const [signedUrl, setSignedUrlForVedio] = useState('');
  const [signedUrlForThumbnail, setSignedUrlForThumbnail] = useState('');
  // const [showMain, setShowMain] = useState('block');
  const [showVideo, setShowVideo] = useState(false);
  const [showScreen, setShowScreen] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const router = useRouter();

  const handleClick = () => {
    // setShowMain('hidden');
    setShowVideo(true);
    setShowUpload(false);
    setShowScreen(false);
    setShowCamera(true);
  };
  const handleScreen = () => {
    setShowVideo(false);
    setShowUpload(false);
    setShowScreen(true);
    setShowCamera(true);
  };

  const handleUpload = () => {
    setShowVideo(false);
    setShowUpload(true);
    setShowScreen(false);
    setShowCamera(true);
  };

  const handleClose = () => {
    if (router.query.source && router.query.target) {
      router.push(`/funnel/vidy/?vidychatid=${router.query.vidychatid}`);
    } else {
      router.push('/home');
    }
  };

  useEffect(() => {
    async function fetchData() {
      // const response = await PresignedUrlForVedioUpload();
      // setSignedUrl(response?.data?.url);
      // setFileName(response?.data?.filename);

      const [ForVedio, ForThumbnail] = await Promise.all([
        PresignedUrlForVedioUpload(),
        PresignedUrlForThumbnailUpload(),
      ]);

      // You can now access the status information from both functions
      setSignedUrlForVedio(ForVedio?.data);
      setSignedUrlForThumbnail(ForThumbnail?.data);

      return { ForVedio, ForThumbnail };
    }
    fetchData();
  }, []);

  return (
    <>
      {showCamera ? (
        <>
          {showVideo && (
            <div className={`${showVideo}`}>
              <VideoRecordingComponent
                setShowCamera={setShowCamera}
                signedUrl={signedUrl}
                signedUrlForThumbnail={signedUrlForThumbnail}
              />
            </div>
          )}
          {showScreen && (
            <div className={`${showScreen}`}>
              <ScreenRecordingComponent
                setShowCamera={setShowCamera}
                signedUrl={signedUrl}
                signedUrlForThumbnail={signedUrlForThumbnail}
              />
            </div>
          )}
          {showUpload && (
            <div className={`${showUpload}`}>
              <LibrarySave
                setShowCamera={setShowCamera}
                signedUrl={signedUrl}
                signedUrlForThumbnail={signedUrlForThumbnail}
              />
            </div>
          )}
        </>
      ) : (
        <div className="h-screen w-full px-0 py-[48px] md:px-[80px]">
          <div
            className="font-favorit-pro relative float-right mt-10 w-full cursor-pointer  pl-[100%] pr-8 text-sm font-bold text-purple-700"
            onClick={handleClose}
          >
            {/* <Link href="/home"> */}
            <Closeicon />
            {/* </Link> */}
          </div>
          <div className="m-auto flex h-screen flex-col items-center justify-center space-x-4 space-y-4 rounded-3xl bg-white p-[32px] text-black drop-shadow-2xl md:h-full">
            <h1 className="mb-8 text-2xl font-medium">
              <FormattedMessage
                id="How would you like to create this step?"
                defaultMessage="How would you like to create this step?"
              />
            </h1>
            <div className="w-full sm:w-[540px]">
              <div
                className="delay-50 hover:[w-560] h-50 flex h-36 flex-col items-center justify-center rounded-xl bg-white p-5 drop-shadow-2xl transition-all hover:scale-105 sm:h-44 lg:w-[540px]"
                onClick={handleClick}
              >
                <img src="/webcam.svg" className="mt-1" alt="webcam" />
                <p>
                  <b>
                    <FormattedMessage id="Webcam" defaultMessage="Webcam" />
                  </b>
                </p>
              </div>

              <div className="mt-6 flex flex-col justify-between sm:flex-row lg:space-x-4">
                <div
                  className="font-inherit tracking-inherit leading-inherit perspective-1000 translate-z-0 animation-delay-50 animation-iteration-count-1 delay-50 animation-direction-backwards animation-eKaCwL mb-4 hidden h-44 w-full cursor-pointer flex-col items-center justify-center space-y-2 rounded-2xl border-none bg-white p-4 px-3 text-base font-medium outline-none drop-shadow-2xl transition-all duration-100 ease-in-out hover:scale-105 lg:flex "
                  onClick={handleScreen}
                >
                  <ShareScreen />
                  <p>
                    <b>
                      <FormattedMessage
                        id="ScreenShare"
                        defaultMessage="ScreenShare"
                      />
                    </b>
                  </p>
                </div>

                <div
                  className="font-inherit tracking-inherit leading-inherit perspective-1000 translate-z-0 animation-delay-50 animation-iteration-count-1 delay-50 animation-direction-backwards animation-eKaCwL mb-4 flex h-36 w-full cursor-pointer flex-col items-center justify-center space-y-2 rounded-2xl border-none bg-white p-4 pr-3 text-base font-medium outline-none drop-shadow-2xl transition-all duration-100 ease-in-out hover:scale-105 sm:h-44"
                  onClick={handleUpload}
                >
                  <Uploadicon />
                  <p>
                    <b>
                      <FormattedMessage id="Upload" defaultMessage="Upload" />
                    </b>
                  </p>
                </div>

                <div className="font-inherit tracking-inherit leading-inherit perspective-1000 translate-z-0 animation-delay-50 animation-iteration-count-1 delay-50 animation-direction-backwards animation-eKaCwL flex h-36 w-full cursor-pointer flex-col items-center justify-center space-y-2 rounded-2xl border-none bg-white p-4 text-base font-medium outline-none drop-shadow-2xl transition-all duration-100 ease-in-out hover:scale-105 sm:h-44 md:pl-3">
                  <Libraryicon />
                  <p>
                    <b>
                      <FormattedMessage id="Library" defaultMessage="Library" />
                    </b>
                  </p>
                </div>
              </div>
            </div>
            <div className="delay-50 mb-10 ml-4 h-10 w-40 cursor-pointer items-center justify-center rounded-3xl bg-black p-2 text-white transition-all hover:scale-105">
              <h1>
                <b>
                  <FormattedMessage
                    id="Add video later"
                    defaultMessage="Add video later"
                  />{' '}
                  🡢{' '}
                </b>
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateVideo;

export async function getServerSideProps(context: any) {
  const token = (await context.req.cookies.accessToken) as string;

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
      token,
    },
  };
}
