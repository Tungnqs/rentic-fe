export interface IPost {
  id: string;
  title: string;
  desc: string
  price: number;
  images: string[];
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
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    phonenumber: string;
    avatar: string;
  };
}
