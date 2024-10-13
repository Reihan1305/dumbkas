import { TypeCategory } from "./enum";


export interface Iprofile{
  id:string;
  username:string;
  email:string;
  wallet:Iwallet
}

export interface Iregister{
  email:string;
  password:string;
  userName:string
}

export interface Ilogin{
  email:string,
  password:string
}


export interface Category {
  id:number;
  type: TypeCategory;
  name: string;
  bgImg:string;
  imgUrl:string
}

export interface Transaction {
  id:string;
  totalTransaction: number;
  createdAt: string;
  information: string;
  categoryId:number;
  updateAt:string
  category: Category;
}

export interface GroupedTransaction {
  date: string;
  transactions: Transaction[];
}

export interface TotalCategory {
  type: TypeCategory;
  name: string;
  background:string;
  imgUrl:string
  total: number;
}

export interface Iwallet{
  id:string;
  totalAmount:number;
  createdAt:string;
  updateAt:string;
  userId:string
}

export interface IBalance{
  balance:number;
  totalIncome:number;
  totaloutcome:number;
}

export interface ErrorResponse {
  message: string;
}

export{}