import { IUser } from "./user.interface";

export interface IIdea {
  _id: string;
  content: string;
  user: IUser;
  createdAt: string;
  updatedAt: string;
}
