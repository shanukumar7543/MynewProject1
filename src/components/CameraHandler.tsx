import React, { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Webcam from 'react-webcam';

import VideoSave from '@/components/videosave';
import Cross from '@/icons/cross';
// import { useRouter } from 'next/router';

const MAX_RECORDING_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

interface CameraProps {
  setShowCamera: (setShowCamera: boolean) => void;
  signedUrl: string;
  signedUrlForThumbnail: string;
}

const VideoRecordingComponent = (props: CameraProps) => {
  const webcamRef = useRef<Webcam & HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(MAX_RECORDING_TIME);
  const [previewVedio, setPreviewVedio] = useState(false);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState('');

  // const router = useRouter()
  const handleStartRecording = async () => {
    setIsRecording(true);

    try {
      // Get both audio and video streams
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      // Create the MediaRecorder with the stream
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm',
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          setRecordedChunks((prevRecordedChunks) => [
            ...prevRecordedChunks,
            event.data,
          ]);
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
    } catch (error) {
      console.error('Error accessing media devices: ', error);
    }
  };

  const handlePauseRecording = () => {
    setIsPaused(true);
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.pause();
    }
  };

  const handleRecordingClose = () => {
    props.setShowCamera(false);
  };

  const handleResumeRecording = () => {
    setIsPaused(false);
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.resume();
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setIsPaused(false);

    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleUpload = async () => {
    setVideoPreviewUrl(
      URL.createObjectURL(new Blob(recordedChunks, { type: 'video/webm' }))
    );
    setPreviewVedio(true);
  };

  // Update the recording timer every second while recording
  useEffect(() => {
    let interval: any;
    if (isRecording && recordingTime > 0 && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime((prevTime) => prevTime - 1000);
      }, 1000);
    } else if (recordingTime === 0) {
      handleStopRecording();
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRecording, recordingTime, isPaused]);

  const minutes = Math.floor(recordingTime / 60000);
  const seconds = Math.floor((recordingTime % 60000) / 1000);
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

  console.log(recordedChunks, 'chunks');
  // console.log(props.setShowCamera)
  return (
    <>
      {previewVedio ? (
        <VideoSave
          videoPreviewUrl={videoPreviewUrl}
          signedUrl={props.signedUrl}
          recordedChunks={recordedChunks}
          setPreviewVedio={setPreviewVedio}
          signedUrlForThumbnail={props.signedUrlForThumbnail}
        />
      ) : (
        <div className="relative h-screen w-screen overflow-hidden">
          {recordedChunks.length > 0 ? (
            <div>
              <video
                src={URL.createObjectURL(
                  new Blob(recordedChunks, { type: 'video/webm' })
                )}
                autoPlay
                loop
                className="max-h-screen min-h-screen w-screen object-cover"
              />
              <div className="absolute top-[80%] flex  w-screen items-center justify-center gap-[2rem]">
                <button
                  className=" text-bold pointer-events-auto flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border-none bg-green-500 bg-opacity-30 text-2xl  text-white transition duration-500 ease-in-out hover:scale-110 hover:bg-green-500"
                  type="button"
                  onClick={handleUpload}
                >
                  <FormattedMessage id="Yes" defaultMessage="Yes" />
                </button>
                <button
                  className=" text-bold pointer-events-auto flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border-none bg-black bg-opacity-30 text-2xl  text-white transition duration-500 ease-in-out hover:scale-110 hover:bg-black"
                  onClick={handleRecordingClose}
                  type="button"
                >
                  <FormattedMessage id="No" defaultMessage="No" />
                </button>
              </div>
            </div>
          ) : (
            <div className="min-w-screen max-h-screen min-h-screen">
              <Webcam
                audio={false}
                ref={webcamRef}
                className="h-screen w-screen object-cover"
                videoConstraints={{ facingMode: 'user' }} // Set the desired facing mode if needed
              />
              <div>
                {!isRecording ? (
                  <>
                    <div className="absolute top-[5%] flex w-screen flex-row items-center justify-center gap-[1rem] text-white lg:gap-[2rem]">
                      <div className="flex w-[40px] flex-col items-center justify-center text-[12px]">
                        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-3xl bg-black bg-opacity-[70%]">
                          <img
                            src="/screenRecording.svg"
                            alt="screenRecording"
                          />
                        </div>
                        <div className="mt-2 hidden w-[100px] items-center justify-center font-bold lg:flex">
                          <FormattedMessage
                            id="Record Screen"
                            defaultMessage="Record Screen"
                          />
                        </div>
                      </div>
                      <div className="flex w-[40px] flex-col items-center justify-center text-[12px]">
                        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-3xl bg-black bg-opacity-[70%]">
                          <img
                            src="/library.svg"
                            className="mt-1"
                            alt="library"
                          />
                        </div>
                        <div className="mt-2  hidden items-center justify-center font-bold lg:flex">
                          <FormattedMessage
                            id="Library"
                            defaultMessage="Library"
                          />
                        </div>
                      </div>
                      <div className="flex w-[40px] flex-col items-center justify-center text-[12px]">
                        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-3xl bg-black bg-opacity-[70%]">
                          <img src="/upload.svg" alt="upload" />
                        </div>
                        <div className="mt-2  hidden items-center justify-center font-bold lg:flex">
                          <FormattedMessage
                            id="Upload"
                            defaultMessage="Upload"
                          />
                        </div>
                      </div>
                      <div className="flex w-[40px] flex-col items-center justify-center text-[12px]">
                        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-3xl bg-black bg-opacity-[70%]">
                          <img src="/camara.svg" alt="camara" />
                        </div>
                        <div className="mt-2  hidden items-center justify-center font-bold lg:flex">
                          <FormattedMessage
                            id="Camera"
                            defaultMessage="Camera"
                          />
                        </div>
                      </div>
                      <div className="flex w-[40px] flex-col items-center justify-center text-[12px]">
                        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-3xl bg-black bg-opacity-[70%]">
                          <img src="/mic.svg" alt="mic" />
                        </div>
                        <div className="mt-2  hidden items-center justify-center font-bold lg:flex">
                          <FormattedMessage
                            id="Microphone"
                            defaultMessage="Microphone"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-[80%] flex  w-screen items-center justify-center gap-[2rem]">
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
                      <button
                        className="border-opacity-24 pointer-events-auto h-20 w-20 cursor-pointer select-none rounded-full border border-white bg-red-600 p-0 shadow-lg transition duration-100  ease-in-out hover:bg-red-200"
                        style={{
                          outline: 'rgba(255, 255, 255, 0.3) solid 8px',
                        }}
                        onClick={handleStartRecording}
                        type="button"
                      >
                        <FormattedMessage id="Start" defaultMessage="Start" />
                      </button>
                      <button
                        className="pointer-events-auto relative flex h-10 w-10  cursor-pointer items-center  justify-center rounded-full border-none bg-black bg-opacity-30 transition-all duration-200 ease-in-out"
                        onClick={handleRecordingClose}
                        type="button"
                      >
                        <Cross />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex">
                    <span className="absolute top-[72%] flex w-screen justify-center text-white">
                      {formattedTime}
                    </span>
                    <div className="absolute top-[80%] flex  w-screen items-center justify-center gap-[1rem]  lg:gap-[2rem]">
                      <button
                        className="border-opacity-24 pointer-events-auto h-20 w-20 cursor-pointer select-none rounded-full border border-white bg-red-600 p-0 shadow-lg transition duration-100  ease-in-out hover:bg-red-200"
                        style={{
                          outline: 'rgba(255, 255, 255, 0.3) solid 8px',
                        }}
                        onClick={handleStopRecording}
                        type="button"
                      >
                        <FormattedMessage id="Stop" defaultMessage="Stop" />
                      </button>
                      {isPaused ? (
                        <button
                          className="pointer-events-auto relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border-none bg-white bg-opacity-30 text-white transition-all duration-200 ease-in-out"
                          onClick={handleResumeRecording}
                          type="button"
                        >
                          <FormattedMessage
                            id="Resume"
                            defaultMessage="Resume"
                          />
                        </button>
                      ) : (
                        <button
                          className="pointer-events-auto relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border-none bg-white bg-opacity-30 text-white transition-all duration-200 ease-in-out"
                          onClick={handlePauseRecording}
                          type="button"
                        >
                          <FormattedMessage id="Pause" defaultMessage="Pause" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default VideoRecordingComponent;
