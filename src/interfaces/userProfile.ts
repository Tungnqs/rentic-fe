export interface IUserProfile {
  userProfile: {
    id: string;
    email: string;
    username: string;
    phonenumber: string;
    avatar: string;
    balance?: number;
    roles: string[];
    isBlocked?: boolean;
    isVerified?: boolean;
  };
}
