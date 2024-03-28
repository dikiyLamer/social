export interface IUserData {
  email: string;
  password: string;
}

export interface IToken {
  token: string;
  tokenTTL: string | number;
}

export interface ICredentials {
  isAuth: boolean;
  token: string | null;
}

export interface ICurrentUser {
  uid?: string;
  email: string;
  firstName: string;
  secondName: string;
  photo?: string;
}
