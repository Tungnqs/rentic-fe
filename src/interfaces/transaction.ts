export interface ITransaction {
  id: string;
  amount: number;
  type: string;
  status: string;
  method: string;
  description: string;
  orderCode: number;
  userId: string;
  adId?: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
  };
}
