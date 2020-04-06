import IAuthor from "./Author";

export default interface IMessage {
  _id: string;
  text: string;
  date: string;
  author: IAuthor;
}