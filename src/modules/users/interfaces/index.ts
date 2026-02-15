export interface IToken {
  userId: string;
  username: string;
  token: string;
}

export interface IUser {
  id: string;
  username: string;
  password: string;
  name: string;
  surname: string;
  profileImg?: string;
  bio?: string;
  registrationDate: Date;
}