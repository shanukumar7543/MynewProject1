import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

import { createStep, getVidyChatDataById } from '@/apihelpers/api';
import { uploadVideoWithThumbnail } from '@/utils/getThumbnail';

import Loader from './Loader';

interface VedioProps {
  signedUrl: any;
  setShowCamera: (setPreviewVedio: boolean) => void;
  signedUrlForThumbnail: any;
}

interface VidyChatData {
  vidyChat: any;
}

const LibrarySave = (props: VedioProps) => {
  const [file1, setFile] = useState<any | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [vidyChatData, setVidyChatData] = useState<VidyChatData>({
    vidyChat: {},
  });
  const [loading, setLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const router = useRouter();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size <= 500 * 1024 * 1024) {
        setFile(selectedFile);
        setVideoUrl(URL.createObjectURL(selectedFile));
      } else {
        alert('File size exceeds 500MB. Please select a smaller file.');
      }
    }
  };

  const { vidychatid, source, target } = router.query;

  const handleBack = () => {
    props.setShowCamera(false);
  };

  useEffect(() => {
    async function getVidyChatData() {
      const response: any = await getVidyChatDataById(vidychatid);
      setVidyChatData(response?.data?.data);
    }
    getVidyChatData();
  }, []);

  const handleUploadSubmit = async () => {
    setLoading(true);
    if (file1) {
      try {
        const response = await uploadVideoWithThumbnail({
          videoRef,
          canvasRef,
          presignedThumbnailUrl: props?.signedUrlForThumbnail?.url,
          file1,
          signedUrl: props.signedUrl?.url,
        });
        if (
          response?.thumbnailResult.status &&
          response?.videoResult.status === 200
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
      } catch (error) {
        alert('Error uploading video.');
        console.error(error);
      }
    } else {
      alert('Please choose a video file first.');
    }
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
        <div className=" h-screen w-full bg-zinc-200 px-6 lg:p-16">
          <div className="flex h-full w-full justify-between overflow-hidden rounded-2xl drop-shadow-2xl">
            <div className="hidden rounded-l-2xl  bg-gray-800 lg:flex  lg:w-1/2">
              {videoUrl && (
                <video src={videoUrl} ref={videoRef} controls className="" />
              )}
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
            <div className="flex  w-full bg-white lg:w-1/2">
              <div className=" flex w-full flex-col justify-between rounded-r-2xl bg-zinc-100 pt-20">
                <div
                  className="mx-[10%] hidden  h-44 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-zinc-500  bg-zinc-100 p-4 text-sm hover:bg-zinc-200 lg:flex"
                  // onSubmit={handleSubmit((data) => console.log(data))}
                >
                  <span>
                    <label
                      htmlFor="video-upload"
                      className="mx-auto mb-4 flex h-12 w-32 cursor-pointer items-center justify-center rounded-lg bg-black text-white transition duration-500 hover:scale-105"
                    >
                      Choose a file
                    </label>
                    <input
                      type="file"
                      id="video-upload"
                      accept=".mp4,.mov,.webm"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                    or drag & drop here...
                  </span>
                  <p className="mt-2">
                    Works with .mp4, .mov & .webm. Max size 500MB!
                  </p>
                  <p className="mt-2 font-semibold">What resolution & ratio</p>
                </div>
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

export default LibrarySave;
