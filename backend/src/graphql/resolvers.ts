import {IResolvers} from "@graphql-tools/utils";
import {
  DatabaseError,
  UserInputError
} from '../utils/resolvers-errors';
import {ObjectId} from "mongodb";

type ToDo = {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
};

const COLLECTION_NAME = process.env.COLLECTION_NAME;

export const resolvers: IResolvers = {
  Query: {
    getTodos: async (parent, args, { db }): Promise<Array<{_id: string, title: string, completed: boolean, createdAt: string}>> => {
      const todos = await db.collection(COLLECTION_NAME).find().toArray();
      return todos.map((todo: ToDo) => ({
        ...todo,
        createdAt: todo.createdAt || new Date().toISOString()  // default to current date-time if createdAt is missing
      }));
    },
  },
  Mutation: {
    async createTodo(parent, args, context, info) {
      try {
        console.log('createTodo mutation being called on be')
        const result = await context.db.collection('todos').insertOne({
          title: args.title,
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date()
        });

        // If the result indicates an insertion, fetch the document by ID
        if (result.acknowledged) {
          return {
            ...await context.db.collection('todos').findOne({ _id: result.insertedId }),
            _id: result.insertedId.toString()
          };

        }
      } catch (err) {
        console.error('Failed to insert todo:', err);
        throw new DatabaseError("Failed to add todo to the database");
      }
    },
    removeTodo: async (parent, { _id }: {_id: string}, { db }): Promise<boolean> => {
      if (!_id.trim()) throw new UserInputError("ID cannot be empty");

      try {
        await db.collection('todos').deleteOne({ _id: new ObjectId(_id) });
        return true;
      } catch (err) {
        console.error('Failed to remove todo:', err);
        throw new DatabaseError("Failed to remove todo from the database");
      }
    },
    async updateTodo(parent, { _id, completed, title, updatedAt }, { db }): Promise<{_id: string, title: string, completed: boolean, updatedAt: Date}> {
      if (!_id.trim()) throw new UserInputError("ID cannot be empty");

      try {
        const updatedTodo = await db.collection('todos').findOneAndUpdate(
          { _id: new ObjectId(_id) },
          { $set: { completed, title, updatedAt } },
          { returnDocument: 'after' }
        );

        return updatedTodo.value;
      } catch (err) {
        console.error('Failed to update todo completion:', err);
        throw new DatabaseError("Failed to update todo completion status");
      }
    },
  }
};