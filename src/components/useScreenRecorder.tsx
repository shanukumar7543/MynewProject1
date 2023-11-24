import { useCallback, useEffect, useState } from 'react';

const useScreenRecorder = () => {
  const [mediaBlobUrls, setMediaBlobUrls] = useState<string[]>([]); // Use string[] for storing URLs
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  ); // Use MediaRecorder type for mediaRecorder
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null); // Use MediaStream type for mediaStream

  useEffect(() => {
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaStream]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      setMediaStream(stream);
      setMediaBlobUrls([]); // Clear the URLs when starting a new recording

      const chunks: BlobPart[] = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
          // Create an object URL for each chunk and add it to the array
          const blob = new Blob([event.data], { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          setMediaBlobUrls((prevUrls) => [...prevUrls, url]);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setMediaBlobUrls((prevUrls) => [...prevUrls, url]);
      };

      recorder.start();
    } catch (error) {
      console.error('Error accessing media devices: ', error);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
    }
  }, [mediaRecorder]);

  return {
    mediaBlobUrls,
    startRecording,
    stopRecording,
  };
};

export default useScreenRecorder;
