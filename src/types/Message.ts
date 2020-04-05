import IAuthor from "./Author";

export default interface IMessage {
  text: string;
  date: string;
  author: IAuthor;
}