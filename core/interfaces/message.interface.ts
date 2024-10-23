export interface IMessage {
  role: "user" | "assistant";
  content: string;
  _id?: string;
}
