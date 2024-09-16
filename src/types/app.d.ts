export interface Iregister {
  userName: string;
  email: string;
  password: string;
}

export interface Ilogin{
    email:string
    password:string
}

export interface Iuser {
  id: string;
  userName: string;
  email: string;
}

export interface IWallet {
  id: string;
  totalAmount: number;
  createAt: string;
  updateAt: string;
}

export interface Itransaction {
    totalTransaction :number,
    createdAt :string,
    userId: string,
    categoryId :number,
    information:string
}

export interface IUpdateTransaction {
  totalTransaction :number,
  createdAt :string,
  categoryId :number,
  information:string,
  updateAt?:Date
}