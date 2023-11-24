import axios from 'axios';
import Cookies from 'js-cookie';

import * as url from './url_helpers';

// Create an instance of Axios
const axiosInstance = axios.create();

const errorHandler = (error: any) => {
  if (error?.response?.data?.message === 'Forbidden') {
    // push to route
    Cookies.remove('accessToken');
    window.location.href = '/login';
  }
};

export const getHeaders = (accessToken?: string) => {
  const token = accessToken ?? Cookies.get('accessToken');

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return headers;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status > 400 &&
      error.response.status < 404
    ) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// =============================== { Auth } =============================== //
// Set the Authorization header using the accessToken from localStorage
const accessToken =
  typeof window !== 'undefined'
    ? window.localStorage.getItem('accessToken')
    : false;
axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

export const getSignUp = async (data: any) => {
  try {
    const response = await axiosInstance.post(url.POST_SIGNUP, data);
    if (response.status >= 200 || response.status <= 299) return response;

    throw response;
  } catch (error: any) {
    return error.response;
  }
};

export const getLogin = async (data: any) => {
  try {
    const response = await axiosInstance.post(url.POST_LOGIN, data);
    return { success: response.status === 200, data: response.data };
  } catch (error: any) {
    // console.log(error);
    errorHandler(error);
    return { success: false, data: error };
  }
};

export const getAnswer = async (data: any) => {
  const token = Cookies.get('accessToken');

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axiosInstance.post(url.ANSWER_POST, data, {
      headers,
    });
    if (response.status >= 200 || response.status <= 299) return response;

    throw response;
  } catch (error: any) {
    return error.response;
  }
};

export const getVideo = async (data: any) => {
  const token = Cookies.get('accessToken');

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axiosInstance.post(url.DOWNLOAD_VID, data, {
      headers,
    });
    if (response.status >= 200 || response.status <= 299) return response;

    throw response;
  } catch (error: any) {
    return error.response;
  }
};

export const getGooglelogin = async () => {
  try {
    const response = await axiosInstance.get(url.POST_GOOGLE_LOGIN_CALLBACK);
    if (response.status >= 200 || response.status <= 299) return response;

    throw response;
  } catch (error: any) {
    // errorHandler(error)
    return error.response;
  }
};

export const verifyemail = async (token: string) => {
  try {
    const response = await axiosInstance.post(url.POST_VERIFY_EMAIL, { token });
    if (response.status === 200) return { success: true, data: response.data };

    return { success: false, data: response.data };
  } catch (error: any) {
    errorHandler(error);
    return { success: false, data: error.response };
  }
};

export const resendEmail = async (data: any) => {
  try {
    const response = await axiosInstance.post(url.POST_RESEND_EMAIL, data);
    if (response.status !== 200) return { success: false };

    return { success: true, message: 'Verification email sent successfully!' };
  } catch (error) {
    errorHandler(error);
    return {
      success: false,
      message: 'An error occurred while resending the email.',
    };
  }
};

export const initateResetPassword = async (email: any) => {
  try {
    const response = await axiosInstance.post(
      url.POST_INITIATE_RESET_PASSWORD,
      { email }
    );
    if (response.status === 200) return { success: true, data: response.data };

    throw response;
  } catch (error: any) {
    errorHandler(error);
    return { success: false, data: error.response, message: error.message };
  }
};

export const resetPassword = async ({
  email,
  password,
  token,
}: {
  email: string;
  password: string;
  token: string;
}) => {
  try {
    const response = await axiosInstance.post(url.POST_RESET_PASSWORD, {
      email,
      password,
      token,
    });
    if (response.status === 200) return { success: true, data: response.data };

    return { success: false, data: response.data };
  } catch (error: any) {
    errorHandler(error);
    return { success: false, data: error.response, message: error.message };
  }
};

export const PresignedUrlForVedioUpload = async () => {
  try {
    const token = Cookies.get('accessToken');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.get(url.POST_GET_SIGNED_URL, {
      headers,
    });

    if (response.status >= 200 || response.status <= 299) return response;

    throw response;
  } catch (error: any) {
    errorHandler(error);
    return error.response;
  }
};

export const PresignedUrlForThumbnailUpload = async () => {
  try {
    const token = Cookies.get('accessToken');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.get(
      url.POST_GET_SIGNED_THUMBNAIL_URL,
      {
        headers,
      }
    );

    if (response.status >= 200 || response.status <= 299) return response;

    throw response;
  } catch (error: any) {
    errorHandler(error);
    return error.response;
  }
};

export const getUser = async (data: any) => {
  try {
    const requestOptions = {
      method: 'GET', // or 'POST', 'PUT', 'DELETE', etc.
      headers: {
        Authorization: `Bearer ${data}`,
        'Content-Type': 'application/json', // Adjust the content type as needed
      },
      // You can also include a request body for methods like POST or PUT
      // body: JSON.stringify({ key: 'value' }),
    };

    const res = await fetch(url.GET_USER_DETAILS, requestOptions);
    const { status } = res;
    const response = await res.json();

    // if (response.status >= 200 || response.status <= 299) return response;

    return { data: response, success: status === 200 };
  } catch (error: any) {
    errorHandler(error);
    return { success: false, data: error.response };
  }
};

export const updateOrganization = async (data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(url.UPDATE_ORG_DETAILS, data, {
      headers,
    });
    if (response.status >= 200 || response.status <= 299) return response;
    throw response;
  } catch (error) {
    errorHandler(error);
    return error;
  }
};

// brand crud methods
export const createBrand = async (data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(`${url.BRAND}/add`, data, {
      headers,
    });
    return { success: response.status === 200, data: response.data };
  } catch (error: any) {
    errorHandler(error);
    return { success: false, data: error.response };
  }
};

// update brand
export const updateBrand = async (data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.put(`${url.BRAND}/${data?._id}`, data, {
      headers,
    });
    return { success: response.status === 200, data: response.data };
  } catch (error: any) {
    errorHandler(error);
    return { success: false, data: error.response };
  }
};

// delete brand
export const deleteBrand = async (brandId: string, organizationId: string) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.delete(
      `${url.BRAND}/${brandId}?organizationId=${organizationId}`,
      {
        headers,
      }
    );
    return { success: response.status === 200, data: response.data };
  } catch (error: any) {
    errorHandler(error);
    return { success: false, data: error.response };
  }
};

export const createVidyChat = async (data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(url.CREATE_VIDYCHAT, data, {
      headers,
    });
    if (response.status >= 200 || response.status <= 299) return response;
    throw response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllVidyChats = async (
  organizationID: string,
  folderID: string,
  token?: string
) => {
  try {
    const response = await axios.get(
      `${url.GET_ALL_VIDYCHAT}?organizationID=${organizationID}&folderID=${folderID}`,
      { headers: getHeaders(token) }
    );

    return {
      success: response.status === 200,
      data: response.data?.data ?? [],
    };
  } catch (error: any) {
    errorHandler(error);
    return { success: false, data: error.response.data };
  }
};

export const createStep = async (data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(url.CREATE_STEP, data, {
      headers,
    });
    if (response.status >= 200 || response.status <= 299) return response;
    throw response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateStep: any = async (data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(url.UPDATE_STEP + data.stepId, data, {
      headers,
    });
    if (response.status >= 200 || response.status <= 299) return response;
    throw response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateBulkPositionOfSteps: any = async (data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(url.UPDATE_BULK_STEP, data, {
      headers,
    });
    if (response.status >= 200 || response.status <= 299) return response;
    throw response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getVidyChatDataById = async (data: any) => {
  console.log(`${url.GET_VIDYCHAT}${data} `, 'in api');
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${url.GET_VIDYCHAT}${data} `, {
      headers,
    });
    if (response.status >= 200 || response.status <= 299) return response;
    throw response?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const updateVidyChatData = async (data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(
      `${url.UPDATE_VIDYCHAT}/${data?.vidychatid}`,
      data,
      {
        headers,
      }
    );
    if (response.status >= 200 || response.status <= 299) return response;
    throw response?.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getFunnelData = async (data: any) => {
  try {
    const requestOptions = {
      method: 'GET', // or 'POST', 'PUT', 'DELETE', etc.
      headers: {
        Authorization: `Bearer ${data.token}`,
        'Content-Type': 'application/json', // Adjust the content type as needed
      },
      // You can also include a request body for methods like POST or PUT
      // body: JSON.stringify({ key: 'value' }),
    };

    const res = await fetch(url.GET_FUNNEL + data.vidychatid, requestOptions);
    const response = await res.json();
    // if (response.status >= 200 || response.status <= 299) return response;
    return response;
  } catch (error: any) {
    return error.response;
  }
};
export const getAllFolder = async (organizationID: string, token?: string) => {
  try {
    const headers = getHeaders(token);
    const response = await axiosInstance.get(
      `${url.GET_FOLDER}?organizationID=${organizationID}`,
      {
        headers,
      }
    );

    if (response.status >= 200 || response.status <= 299) return response;

    throw response;
  } catch (error: any) {
    errorHandler(error);
    return error.response;
  }
};

export const addFolder = async (data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(url.ADD_FOLDER, data, {
      headers,
    });
    if (response.status >= 200 || response.status <= 299) return response;
    throw response;
  } catch (error) {
    errorHandler(error);
    return error;
  }
};

export const updateFolder = async (id: string, data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(`${url.UPDATE_FOLDER}/${id}`, data, {
      headers,
    });
    if (response.status === 200) return { success: true, data: response.data };

    return { success: false, data: response.data };
  } catch (error: any) {
    errorHandler(error);
    return { succes: false, erorr: error.response };
  }
};

export const deleteFolder = async (folderId: string) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.delete(`${url.DELETE_FOLDER}/${folderId}`, {
      headers,
    });

    if (response.status === 200) return { success: true, data: response.data };

    return { success: false, data: response.data };
  } catch (error: any) {
    errorHandler(error);
    return { succes: false, erorr: error.response };
  }
};

// =============================== { Contact } =============================== //
export const addContact = async (data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(url.CREATE_CONTACT, data, {
      headers,
    });
    if (response.status >= 200 || response.status <= 299) return response;
    throw response;
  } catch (error) {
    errorHandler(error);
    return error;
  }
};

export const addContactByFunnel = async (data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(url.CREATE_CONTACT_BY_FUNNEL, data, {
      headers,
    });
    if (response.status >= 200 || response.status <= 299) return response;
    throw response;
  } catch (error) {
    errorHandler(error);
    return error;
  }
};

export const updateContact = async (_id: string, data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(`${url.UPDATE_CONTACT}/${_id}`, data, {
      headers,
    });
    if (response.status >= 200 && response.status <= 299) return response;
    throw response;
  } catch (error) {
    errorHandler(error);
    return error;
  }
};

export const getAllContact = async (organizationID: string) => {
  try {
    const token = Cookies.get('accessToken');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.get(
      `${url.GET_CONTACT}?organizationID=${organizationID}`,
      {
        headers,
      }
    );

    if (response.status >= 200 || response.status <= 299) return response;

    throw response;
  } catch (error: any) {
    errorHandler(error);
    return error.response;
  }
};

export const deleteContact = async (contactId: string) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.delete(`${url.DELETE_CONTACT}/${contactId}`, {
      headers,
    });
    if (response.status >= 200 && response.status <= 299) return response;
    throw response;
  } catch (error) {
    errorHandler(error);
    return error;
  }
};

export const getContactById = async (contactId: any) => {
  try {
    const token = Cookies.get('accessToken');

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axiosInstance.get(
      `${url.GET_CONTACT_BY_ID}/${contactId}`,
      {
        headers,
      }
    );

    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    }

    throw response;
  } catch (error) {
    errorHandler(error);
    return error;
  }
};

export const getFolderById = async (folderID: any, token?: string) => {
  try {
    const response = await axiosInstance.get(
      `${url.GET_FOLDER_BY_ID}/${folderID}`,
      { headers: getHeaders(token) }
    );

    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    }

    throw response;
  } catch (error) {
    errorHandler(error);
    return error;
  }
};

export const getDefaultFolder = async (
  organizationID: string,
  token?: string
) => {
  try {
    const headers = getHeaders(token);

    const res = await axiosInstance.get(
      `${url.GET_DEFAULT_FOLDER}?organizationID=${organizationID}`,
      { headers }
    );

    if (res.status === 200) return { success: true, data: res.data };
    return { success: false, data: res.data };
  } catch (error: any) {
    errorHandler(error);
    console.log(error);
    return { success: false, data: error.response.data };
  }
};

export const createInvite = async (data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(url.CREATE_INVITE, data, {
      headers,
    });
    if (response.status >= 200 || response.status <= 299) return response;
    throw response;
  } catch (error) {
    errorHandler(error);
    return error;
  }
};

export const getAllInvites = async (organizationID: string) => {
  try {
    const token = Cookies.get('accessToken');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axiosInstance.get(
      `${url.GET_INVITE}?organizationID=${organizationID}`,
      {
        headers,
      }
    );

    if (response.status >= 200 || response.status <= 299) return response;

    throw response;
  } catch (error: any) {
    errorHandler(error);
    return error.response;
  }
};

export const getInviteById = async (inviteId: any) => {
  try {
    const token = Cookies.get('accessToken');

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axiosInstance.get(
      `${url.GET_INVITE_BY_ID}/${inviteId}`,
      {
        headers,
      }
    );

    if (response.status >= 200 && response.status <= 299) {
      return response.data;
    }
    throw response;
  } catch (error) {
    errorHandler(error);
    return error;
  }
};

export const updateInvite = async (data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(url.UPDATE_INVITE, data, {
      headers,
    });
    if (response.status >= 200 || response.status <= 299) return response;
    throw response;
  } catch (error) {
    errorHandler(error);
    return error;
  }
};

export const updateInviteRole = async (data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(url.UPDATE_ROLE, data, {
      headers,
    });
    if (response.status >= 200 || response.status <= 299) return response;
    throw response;
  } catch (error) {
    errorHandler(error);
    return error;
  }
};

export const deleteInvite = async (inviteId: string) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.delete(`${url.DELETE_INVITE}/${inviteId}`, {
      headers,
    });

    if (response.status === 200) return { success: true, data: response.data };

    return { success: false, data: response.data };
  } catch (error: any) {
    errorHandler(error);
    return { succes: false, erorr: error.response };
  }
};

export const buttonApi = async (data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(url.BUTTON_CREATE, data, {
      headers,
    });

    if (response.status === 200) return { success: true, data: response.data };

    return { success: false, data: response.data };
  } catch (error: any) {
    errorHandler(error);
    return { succes: false, erorr: error.response };
  }
};

export const mcqCreate = async (data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(url.MULTICHOICE_CREATE, data, {
      headers,
    });

    if (response.status === 200) return { success: true, data: response.data };

    return { success: false, data: response.data };
  } catch (error: any) {
    errorHandler(error);
    return { succes: false, erorr: error.response };
  }
};

export const mcqAdd = async (data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(url.MULTICHOICE_ADD, data, {
      headers,
    });

    if (response.status === 200) return { success: true, data: response.data };

    return { success: false, data: response.data };
  } catch (error: any) {
    errorHandler(error);
    return { succes: false, erorr: error.response };
  }
};

export const mcqDel = async (data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(url.MULTICHOICE_DEL, data, {
      headers,
    });

    if (response.status === 200) return { success: true, data: response.data };

    return { success: false, data: response.data };
  } catch (error: any) {
    errorHandler(error);
    return { succes: false, erorr: error.response };
  }
};

export const mcqUpdate = async (data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(url.MULTICHOICE_UPDATE, data, {
      headers,
    });

    if (response.status === 200) return { success: true, data: response.data };

    return { success: false, data: response.data };
  } catch (error: any) {
    errorHandler(error);
    return { succes: false, erorr: error.response };
  }
};

export const openAdd = async (data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(url.OPENENDED_ADD, data, {
      headers,
    });

    if (response.status === 200) return { success: true, data: response.data };

    return { success: false, data: response.data };
  } catch (error: any) {
    errorHandler(error);
    return { succes: false, erorr: error.response };
  }
};

export const openDel = async (data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post(url.OPENENDED_DEL, data, {
      headers,
    });

    if (response.status === 200) return { success: true, data: response.data };

    return { success: false, data: response.data };
  } catch (error: any) {
    errorHandler(error);
    return { succes: false, erorr: error.response };
  }
};

export const getContactForm = async (data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(url.GET_CONTACT_FORM + data, {
      headers,
    });
    if (response.status >= 200 || response.status <= 299) return response;
    throw response;
  } catch (error) {
    errorHandler(error);
    return error;
  }
};

export const updateContactForm = async (data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(url.UPDATE_CONTACT_FORM + data.id, data, {
      headers,
    });
    if (response.status >= 200 || response.status <= 299) return response;
    throw response;
  } catch (error) {
    errorHandler(error);
    return error;
  }
};

export const removeContactForm = async (data: any) => {
  try {
    const token = Cookies.get('accessToken');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.put(url.REMOVE_CONTACT_FORM + data.id, data, {
      headers,
    });
    if (response.status >= 200 || response.status <= 299) return response;
    throw response;
  } catch (error) {
    errorHandler(error);
    return error;
  }
};

export const deleteInteraction = async (id: string) => {
  try {
    const token = Cookies.get('accessToken');

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axiosInstance.delete(
      `${url.DELETE_INTERACTION}/?id=${id}`,
      {
        headers,
      }
    );

    return { success: response.status === 200, data: response.data };
  } catch (error: any) {
    errorHandler(error);
    return { success: false, data: error.response };
  }
};
