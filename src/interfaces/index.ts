import { ENotificationType } from "../enum";

export interface IRoute {
  path: string;
  component: JSX.Element;
}

export interface ISideHeader {
  title: string;
  path: string;
  icon: JSX.Element;
}

export interface ITopHeader {
  name: string;
  path: string;
}

export interface INotification {
  message: string;
  type: ENotificationType;
}
export interface INotificationState {
  notification: INotification | null;
}

export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phonenumber: string;
  role: string;
}

export interface IError {
  errors: [
    {
      type: string;
      value: number | string;
      msg: string;
      path: string;
      location: string;
    }
  ];
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IAuthState {
  authStatus: boolean;
}

export enum ResponsiveBreakPoint {
  sm = "640px",
  md = "768px",
  lg = "1024px",
  xl = "1280px",
  xxl = "	1536px",
}
