import { ObjectId } from 'mongodb';

export interface ToDo {
  _id: ObjectId;
  title: string;
  completed: boolean;
}