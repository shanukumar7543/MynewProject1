/* eslint-disable no-underscore-dangle */
import HelpIcon from '@mui/icons-material/Help';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { createStep, getVidyChatDataById } from '@/apihelpers/api';
import { uploadVideoWithThumbnail } from '@/utils/getThumbnail';

import Loader from './Loader';

const TextSizeDropdown = () => {
  const [selectedSize, setSelectedSize] = useState('text-base');

  const handleSizeChange = (event: { target: { value: any } }) => {
    setSelectedSize(event.target.value);
  };

  return (
    <div className="mt-4 flex h-16 items-center justify-between rounded-xl bg-white p-5">
      <p className="text-sm font-semibold">
        Text size <HelpIcon />
      </p>
      <select
        value={selectedSize}
        onChange={handleSizeChange}
        className="rounded-md bg-zinc-200 px-3 py-2 text-sm font-semibold outline-none"
      >
        <option className="pb-2" value="text-xs">
          Extra Small
        </option>
        <option className="pb-2" value="text-sm">
          Small
        </option>
        <option className="pb-2" value="text-base">
          Medium
        </option>
        <option className="pb-2" value="text-lg">
          Large
        </option>
        <option className="pb-2" value="text-xl">
          Extra Large
        </option>
      </select>
    </div>
  );
};

interface VedioProps {
  videoPreviewUrl: any;
  signedUrl: any;
  recordedChunks: any;
  setPreviewVedio: (setPreviewVedio: boolean) => void;
  signedUrlForThumbnail: any;
}

interface VidyChatData {
  vidyChat: any;
}

const VideoSave = (props: VedioProps) => {
  const {
    handleSubmit, // Add this if you want to use react-hook-form for form handling
  } = useForm();

  const [inputValue, setInputValue] = useState('');
  const [vidyChatData, setVidyChatData] = useState<VidyChatData>({
    vidyChat: {},
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { vidychatid, source, target } = router.query;

  useEffect(() => {
    async function getVidyChatData() {
      const response: any = await getVidyChatDataById(vidychatid);
      setVidyChatData(response?.data?.data);
    }
    getVidyChatData();
  }, []);

  const handleInputChange = (event: { target: { value: any } }) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  const handleUploadSubmit = async () => {
    if (vidyChatData?.vidyChat?.userId) {
      setLoading(true);
      // generateThumbnail({videoRef, canvasRef , presignedThumbnailUrl})
      const response = await uploadVideoWithThumbnail({
        videoRef,
        canvasRef,
        presignedThumbnailUrl: props?.signedUrlForThumbnail?.url,
        recordedChunks: props.recordedChunks,
        signedUrl: props.signedUrl?.url,
      });

      console.log(response, 'from s3');
      // const response: any = await uploadVedioToS3(props.signedUrl, videoBlob);
      if (
        response.thumbnailResult.status &&
        response.videoResult.status === 200
      ) {
        const stepCreate: any = await createStep({
          userId: vidyChatData?.vidyChat?.userId,
          organizationId: vidyChatData?.vidyChat?.organizationId,
          videoDetails: {
            S3Link: {
              fileName: props?.signedUrl?.filename,
              url: response?.videoResult?.url,
              bucket: 'vidychat',
            },
          },
          thumbnail: [
            {
              S3Link: {
                fileName: props.signedUrlForThumbnail?.filename,
                url: response?.thumbnailResult?.url,
                bucket: 'vidychat',
              },
              isSelected: true,
            },
          ],
          vidychatId: vidyChatData?.vidyChat?._id ?? vidychatid,
          /// "answerId": ["64c93b6b6fc5d31b7492a20e", "64c93b73bef9feb77f6de265", "64c93b7b3b566e463d3ee3a4", "64c93b84b879060ef4638979"],
          prev: source && target ? source : vidyChatData?.vidyChat?.startStep,
          next: source && target ? target : vidyChatData?.vidyChat?.endStep,
        });
        console.log(stepCreate, 'create');
        if (stepCreate.status === 201) {
          router.push(`/funnel/vidy?vidychatid=${vidychatid}`);
        }
        // router.push('/home');
      }
    }
  };

  const handleBack = () => {
    props.setPreviewVedio(false);
  };

  return (
    <>
      {loading ? (
        <div className="flex h-screen w-screen items-center justify-center bg-white">
          <Loader width={500}>
            <h1 className="text-center text-2xl">Uploading</h1>
          </Loader>{' '}
        </div>
      ) : (
        <div className=" h-screen w-screen bg-zinc-200 px-6 lg:p-16">
          <div className="flex h-full w-full justify-between overflow-hidden rounded-2xl drop-shadow-2xl">
            <div className="hidden rounded-l-2xl  bg-gray-800 lg:flex  lg:w-1/2">
              <video
                src={props.videoPreviewUrl}
                ref={videoRef}
                controls
                className=""
              />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>

            <div className="flex  w-full bg-white lg:w-1/2">
              <div className=" flex w-full flex-col justify-between rounded-r-2xl bg-zinc-100">
                <form
                  className="flex grow rounded-r-2xl p-16"
                  onSubmit={handleSubmit((data) => console.log(data))}
                >
                  <div className=" grow rounded-r-2xl">
                    <div className="mx-4 text-sm font-semibold">
                      <p>Overlay text:</p>
                      <textarea
                        // rows='3'
                        name="videoaskname"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Add  Overlay text here...(Optional)"
                        className="my-2 flex w-full rounded-xl bg-white p-5 text-sm font-semibold focus:outline-none"
                      />
                      <a
                        href="xfb"
                        className="text-sm font-semibold text-green-500"
                      >
                        Learn how to pipe variables (e.g name) into overlay text
                      </a>
                      {inputValue === '' ? null : (
                        <>
                          <TextSizeDropdown />
                          <div className="mt-4 flex  h-16 justify-between rounded-xl bg-white p-5">
                            <p className="text-sm font-semibold">
                              Darken video for text readability
                            </p>
                            <label className="relative inline-flex cursor-pointer items-center">
                              <input
                                type="checkbox"
                                value=""
                                className="peer sr-only"
                                // onClick={() => setValue('consent2', !form.consent2)}
                                // checked={form.consent2}
                              />
                              <div className="peer h-6 w-11 rounded-full  bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-500" />
                            </label>
                          </div>
                        </>
                      )}

                      <div className="mt-4 flex  h-16 justify-between rounded-xl bg-white p-5">
                        <p className="text-sm font-semibold">
                          Fit video <HelpIcon />
                        </p>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            value=""
                            className="peer sr-only"
                            // onClick={() => setValue('consent2', !form.consent2)}
                            // checked={form.consent2}
                          />
                          <div className="peer h-6 w-11 rounded-full  bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-400 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-500" />
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
                <div className="flex w-full justify-between space-x-[1px] bg-gray-600">
                  <button
                    type="submit"
                    // className="w-1/2 bg-black  px-20 py-2 text-white"
                    className="group flex h-14 w-1/2 items-center justify-center bg-gray-900 text-lg text-zinc-400 hover:bg-black hover:text-green-700"
                    onClick={handleBack}
                  >
                    <span className="transition-transform duration-500 group-hover:-translate-x-2">
                      🡠
                    </span>{' '}
                    Back
                  </button>
                  <button
                    type="submit"
                    // className="sm:py-100 w-1/2 border-l-2  bg-black px-20 py-2 text-white sm:mr-0 lg:mr-20 lg:px-20 lg:py-2 "
                    className="group flex h-14 w-1/2 items-center justify-center bg-gray-900 text-lg text-white hover:bg-black hover:text-green-700"
                    onClick={handleUploadSubmit}
                  >
                    Continue
                    <span className="transition-transform duration-500 group-hover:translate-x-2">
                      🡢
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoSave;

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
