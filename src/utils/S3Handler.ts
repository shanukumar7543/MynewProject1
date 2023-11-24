import { getHeaders } from '@/apihelpers/api';
import { DOWNLOAD_VID } from '@/apihelpers/url_helpers';

export const uploadVedioToS3 = async (
  s3Url: string,
  file: any
): Promise<number> => {
  try {
    const response = await fetch(s3Url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'video/webm',
        'Access-Control-Allow-Origin': '*', // Replace '*' with the appropriate allowed origin(s)
        'Access-Control-Allow-Methods': 'PUT, OPTIONS', // Add other allowed methods as needed
        'Access-Control-Allow-Headers': 'Content-Type', // Add other allowed headers as needed
      },
      body: file,
    });

    if (response.ok) {
      console.log(response, 'Upload Successful');
      return response as any;
    }
    console.error('Upload Failed:', response.statusText);
    return response.status;
  } catch (error) {
    console.error('Upload Error:', error);
    throw error;
  }
};

export const uploadThumbnailToS3 = async (
  s3Url: string,
  file: any
): Promise<number> => {
  try {
    const response = await fetch(s3Url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'image/jpeg',
        'Access-Control-Allow-Origin': '*', // Replace '*' with the appropriate allowed origin(s)
        'Access-Control-Allow-Methods': 'PUT, OPTIONS', // Add other allowed methods as needed
        'Access-Control-Allow-Headers': 'Content-Type', // Add other allowed headers as needed
      },
      body: file,
    });

    if (response.ok) {
      console.log(response, 'Upload Successful');
      return response as any;
    }
    console.error('Upload Failed:', response.statusText);
    return response.status;
  } catch (error) {
    console.error('Upload Error:', error);
    throw error;
  }
};

export const getViewUrl = async (fileKey: string): Promise<string | null> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/get-view-url?fileKey=${fileKey}`
    );
    if (response.ok) {
      const data = await response.json();
      return data.url;
    }
    return null;
  } catch (error) {
    console.error('Upload Error:', error);
    throw error;
  }
};

export const fetchViewUrl = async (fileName: string): Promise<any> =>
  fetch(DOWNLOAD_VID, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...getHeaders(),
    },
    body: JSON.stringify({
      Key: fileName,
    }),
  }).then((res) => res.json());
