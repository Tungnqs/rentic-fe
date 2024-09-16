export interface IUserProfile {
  user: {
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
  };
}
