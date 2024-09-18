export const API_BASE_URL = "http://localhost:3000";

export const API_PATH_URL = {
  UPLOAD_FILE_TO_FIREBASE: "/api/upload/",
  AUTH: {
    LOGIN: "/api/auth/login/",
    REGISTER: "/api/auth/register/",
    USER_PROFILE: "/api/user/profile/",
  },
  POST: {
    GET_ALL_POSTS: "/api/post/all",
    GET_ALL_MY_POSTS: "/api/post/user/",
    CREATE_POST: "/api/post/add/",
    GET_POST_BY_ID: "/api/post/id/",
    MODIFY_POST_BY_ID: "/api/post/",
  },
  PAYMENT: {
    CREATE_PAYMENT_LINK: "/api/order/createPaymentLink/",
    GET_ORDER: "/api/order/",
  },
};
