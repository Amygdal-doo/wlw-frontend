import { IMessage } from "./message.interface";

export interface IIdea {
  _id: string;
  messages: IMessage[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}
