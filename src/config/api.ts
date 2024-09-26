// export const API_BASE_URL = "https://rentic.onrender.com";
export const API_BASE_URL = "http://localhost:3000";

export const API_PATH_URL = {
  UPLOAD_FILE_TO_FIREBASE: "/api/upload/",
  AUTH: {
    LOGIN: "/api/auth/login/",
    REGISTER: "/api/auth/register/",
    USER_PROFILE: "/api/user/profile/",
  },
  POST: {
    GET_ALL_POSTS: "/api/post/getall/",
    GET_ALL_MY_POSTS: "/api/post/user/",
    CREATE_POST: "/api/post/add/",
    GET_POST_BY_ID: "/api/post/id/",
    MODIFY_POST_BY_ID: "/api/post/",
    GET_PUBLISH_POST: "/api/post/public/"
  },
  PAYMENT: {
    CREATE_PAYMENT_LINK: "/api/order/createPaymentLink/",
    GET_ORDER: "/api/order/",
  },
  MODERATOR: {
    MODIFY_POST: "/api/moderator/posts/",
    REPORT_ACTION: "/api/moderator/reports/",
  },
  REPORT:{
    REPORT_POST_BY_ID: "/api/user/report/",
  }
};
