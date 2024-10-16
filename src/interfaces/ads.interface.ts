import { IPost } from "./post.interface";

export interface IPackage{
    id: string;
    name: string;
    dailyRate: number;
    description: string;
    createdAt: string;
}

export interface IAds{
    id: string;
    startDate: string;
    endDate: string;
    totalCost: number;
    isActive: boolean;
    post: IPost;
    adPackage: IPackage;
}