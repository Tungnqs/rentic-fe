export const API_BASE_URL = "https://www.api.rentic.click";
// export const API_BASE_URL = "http://localhost:3000";

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
  },
  ADMIN:{
    GET_ALL_ACCOUNTS: "/api/admin/getallusers/",
    BLOCK_ACCOUNT_BY_ID: "/api/admin/block/",
    UNBLOCK_ACCOUNT_BY_ID: "/api/admin/unblock/",
  },
  APPOINTMENT: {
    GET_RENTER_APPOINTMENT: "/api/appointment/user/appointments/",
    GET_LANDLORD_APPOINTMENT: "/api/appointment/landlord/appointments/",
    MODIFY_APPOINTMENT: "/api/appointment/"
  },
  CHAT:{
    GET_ALL_CHATS: "/api/chat/all/",
    READ_CHAT: "/api/chat/",
    SEND_MESSAGE: "/api/chat/send/",
    CREATE_CHAT: "/api/chat/create/",
  }
};
