export interface IUser {
  firstName: string;
  lastName: string;
  id: string;
  email: string;
  username: string;
  phonenumber: string;
  avatar?: string;
  balance?: number;
  roles: string[];
  isBlocked?: boolean;
  isVerified?: boolean;
  googleId: string;
  createdAt: string
}

export interface IUserProfile {
  user: IUser;
}
