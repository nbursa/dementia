export interface Todo {
  _id: string;
  title: string;
  body?: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}