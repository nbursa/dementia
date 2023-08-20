import {IResolvers} from "@graphql-tools/utils";
import {
  DatabaseError,
  UserInputError
} from '../utils/resolvers-errors';
import {ObjectId} from "mongodb";

export const resolvers: IResolvers = {
  Query: {
    getToDos: async (parent, args, { db }): Promise<Array<{_id: string, title: string, completed: boolean}>> => {
      return db.collection('todos').find().toArray();
    },
  },
  Mutation: {
    async addTodo(parent, args, context, info) {
      try {
        const result = await context.db.collection('todos').insertOne({
          title: args.title,
          completed: false,
        });

        // If the result indicates an insertion, fetch the document by ID
        if (result.acknowledged) {
          return await context.db.collection('todos').findOne({
            _id: result.insertedId
          });
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
  }
};