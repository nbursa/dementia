import { ObjectId } from 'mongodb';

export interface ToDo {
  _id: ObjectId;
  title: string;
  body: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}