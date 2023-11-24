export const baseURL =
  process.env.NEXT_PUBLIC_API_KEY ??
  'https://yknhgry92i.execute-api.eu-north-1.amazonaws.com';

export const POST_SIGNUP = `${baseURL}/auth/register`;
export const POST_LOGIN = `${baseURL}/auth/login`;
export const POST_GOOGLE_LOGIN = `${baseURL}/auth/google`;
export const POST_GOOGLE_LOGIN_CALLBACK = `${baseURL}/auth/google/callback`;
export const POST_VERIFY_EMAIL = `${baseURL}/auth/verify`;
export const POST_RESEND_EMAIL = `${baseURL}/auth/resend-email`;
export const POST_GET_SIGNED_URL = `${baseURL}/vedio/get-image-upload-url`;
export const POST_GET_SIGNED_THUMBNAIL_URL = `${baseURL}/vedio/get-thumbnail-url`;
export const GET_USER_DETAILS = `${baseURL}/user/getUser`;
export const UPDATE_ORG_DETAILS = `${baseURL}/org/edit`;
export const CREATE_VIDYCHAT = `${baseURL}/vidychat/create`;
export const CREATE_STEP = `${baseURL}/step/add`;
export const UPDATE_STEP = `${baseURL}/step/update/`;
export const UPDATE_BULK_STEP = `${baseURL}/step/updatebulkpositions`;
export const GET_VIDYCHAT = `${baseURL}/vidychat/get/`;
export const UPDATE_VIDYCHAT = `${baseURL}/vidychat/updatevidychat`;
export const GET_ALL_VIDYCHAT = `${baseURL}/vidychat/getAll/`;
export const GET_FUNNEL = `${baseURL}/vidychat/getStepsWithAnswers/`;
export const DOWNLOAD_VID = `${baseURL}/vedio/get-video-download-url`;
export const GET_FOLDER = `${baseURL}/folder/getAll`;
export const GET_FOLDER_BY_ID = `${baseURL}/folder/get`;
export const ADD_FOLDER = `${baseURL}/folder/add`;
export const UPDATE_FOLDER = `${baseURL}/folder/edit`;
export const DELETE_FOLDER = `${baseURL}/folder/remove`;
export const GET_DEFAULT_FOLDER = `${baseURL}/folder/getDefault`;
export const CREATE_CONTACT = `${baseURL}/contact/add`;
export const CREATE_CONTACT_BY_FUNNEL = `${baseURL}/contact/funnelcontact`;
export const GET_CONTACT = `${baseURL}/contact/getall`;
export const DELETE_CONTACT = `${baseURL}/contact/remove`;
export const GET_CONTACT_BY_ID = `${baseURL}/contact/get`;
export const UPDATE_CONTACT = `${baseURL}/contact/edit`;
export const CREATE_INVITE = `${baseURL}/invite/send`;
export const POST_INITIATE_RESET_PASSWORD = `${baseURL}/auth/intiate-reset-password`;
export const POST_RESET_PASSWORD = `${baseURL}/auth/reset-password`;
export const GET_INVITE = `${baseURL}/invite/getAll`;
export const GET_INVITE_BY_ID = `${baseURL}/invite/get`;
export const UPDATE_INVITE = `${baseURL}/invite/update`;
export const UPDATE_ROLE = `${baseURL}/invite/update/role`;
export const ANSWER_POST = `${baseURL}/answers/add`;
export const OPENENDED_ADD = `${baseURL}/openended/addChoice`;
export const OPENENDED_DEL = `${baseURL}/openended/deleteChoice`;
export const BUTTON_CREATE = `${baseURL}/button/create`;
export const MULTICHOICE_CREATE = `${baseURL}/multichoice/create`;
export const MULTICHOICE_ADD = `${baseURL}/multichoice/addChoice`;
export const MULTICHOICE_DEL = `${baseURL}/multichoice/deleteChoice`;
export const MULTICHOICE_UPDATE = `${baseURL}/multichoice/updateChoice`;
export const GET_CONTACT_FORM = `${baseURL}/contactform/get/`;
export const UPDATE_CONTACT_FORM = `${baseURL}/contactform/update/`;
export const REMOVE_CONTACT_FORM = `${baseURL}/contactform/remove/`;
export const DELETE_INVITE = `${baseURL}/invite/delete`;

// ================== { Interactions } ==================
export const GET_ALL_INTERACTIONS = `${baseURL}/interaction/getAll`;
export const INTERACTION_BASE = `${baseURL}/interaction`;
export const DELETE_INTERACTION = `${baseURL}/interaction/delete`;
export const BRAND = `${baseURL}/org/brand`;
