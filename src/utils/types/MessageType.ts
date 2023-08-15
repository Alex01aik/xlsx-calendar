import { MessageAuthor } from '../enums/MessageAuthor';

export type MessageType = {
  author: MessageAuthor;
  message: string;
};
