import { uploadThumbnailToS3, uploadVedioToS3 } from './S3Handler';

interface ThumbnailProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  presignedThumbnailUrl?: string;
  recordedChunks?: Blob[];
  signedUrl?: string;
  file1?: any;
}

interface UploadResult {
  thumbnailResult: any; // Adjust the type as needed
  videoResult: any; // Adjust the type as needed
}

export const generateThumbnail = async (
  props: ThumbnailProps
): Promise<any> => {
  const video = props.videoRef.current;
  const canvas = props.canvasRef.current;
  if (!video || !canvas) return;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const context = canvas.getContext('2d');
  if (context) {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const thumbnailDataUrl: string = canvas.toDataURL('image/jpeg');
    const base64Data: string | undefined = thumbnailDataUrl.split(',')[1]; // Remove the data URL prefix
    const binaryData: string = atob(base64Data as any); // Decode Base64 data to binary
    const arrayBuffer: ArrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array: Uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }

    const blob: Blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
    const uploadtoS3 = await uploadThumbnailToS3(
      props.presignedThumbnailUrl as any,
      blob
    );
    return uploadtoS3;
  }
};

export const uploadVideoWithThumbnail = async ({
  videoRef,
  canvasRef,
  presignedThumbnailUrl,
  recordedChunks,
  signedUrl,
  file1,
}: ThumbnailProps): Promise<UploadResult> => {
  // Call both functions concurrently using Promise.all

  let videoBlob;

  if (recordedChunks?.length) {
    videoBlob = new Blob(recordedChunks, { type: 'video/webm' });
  } else {
    videoBlob = new Blob([file1], { type: file1.type });
  }

  const [thumbnailResult, videoResult] = await Promise.all([
    generateThumbnail({ videoRef, canvasRef, presignedThumbnailUrl }),
    uploadVedioToS3(signedUrl as any, videoBlob),
  ]);

  // You can now access the status information from both functions

  return { thumbnailResult, videoResult };
};
