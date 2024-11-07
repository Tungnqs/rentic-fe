import { IRoute } from "../interfaces";
import { Navigate } from "react-router";
import EditProfile from "../pages/EditProfile/EditProfile";
import PublishPost from "../pages/Renter/PublishPost";
import DepositPage from "../pages/DepositPage/DepositPage";
import PaymentConfirmation from "../pages/PaymentConfirmation/PaymentConfirmation";
import PostDetail from "../pages/Renter/PostDetail/PostDetail";
import Appointments from "../pages/Appointments/Appointments";
import Conversation from "../pages/Conversation/Conversation";
import VerifyEmail from "../pages/VerifyEmail/VerifyEmail";
import ChangePassword from "../pages/ChangePassword/ChangePassword";
import MyTransactions from "../pages/MyTransactions/MyTransactions";

export const renterRoutes: IRoute[] = [
  {
    path: "/",
    component: <Navigate to={'/publish-posts'}/>
  },
  {
    path: "/publish-posts",
    component: <PublishPost />
  },
  {
    path: "/publish-posts/:id",
    component: <PostDetail />
  },
  {
    path: '/profile',
    component: <EditProfile />
  },
  {
    path: "/deposit",
    component: <DepositPage />
  },
  {
    path: "/payment/:id",
    component: <PaymentConfirmation />
  },
  {
    path: "/appointments",
    component: <Appointments isLandLord={false}/>
  },
  {
    path: "/conversations",
    component: <Conversation />
  },
  {
    path: "/verifyAccount",
    component: <VerifyEmail />
  },
  {
    path: "/profile/changePassword",
    component: <ChangePassword />
  },
  {
    path: "/my-transactions",
    component: <MyTransactions />
  }
];
