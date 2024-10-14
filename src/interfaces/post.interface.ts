export interface IPost {
  id: string;
  title: string;
  desc: string;
  price: number;
  images: [
    {
      name: string;
      path: string;
    }
  ];
  address: string;
  district: string;
  commune: string;
  pet?: boolean;
  size?: number;
  bedroom?: number;
  bathroom?: number;
  latitude: number;
  longitude: number;
  type: string;
  city: string;
  property: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phonenumber: string;
    avatar: string;
  };
  isReported?: boolean;
  isVerified?: boolean
}
