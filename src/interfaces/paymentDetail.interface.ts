import { IUser } from "./userProfile.interface";

export interface IPaymentDetail{
    data:{
        id: string;
        orderCode: number;
        amount: number;
        amountPaid: number;
        amountRemaining: number;
        status?: string;
        createdAt: string
    }
    existingTransaction:{
        description: string
    }
    userData: IUser;
}