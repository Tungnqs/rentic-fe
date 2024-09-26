import { IRoute } from "../interfaces";
import { Navigate } from "react-router";
import EditProfile from "../pages/EditProfile/EditProfile";
import PublishPost from "../pages/Renter/PublishPost";
import DepositPage from "../pages/DepositPage/DepositPage";
import PaymentConfirmation from "../pages/PaymentConfirmation/PaymentConfirmation";

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
  }
];
