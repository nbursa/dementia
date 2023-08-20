import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { connectToDb } from './utils/db';
import {ObjectId} from "mongodb";
import {IResolvers} from "@graphql-tools/utils";

export const typeDefs = gql`
    type ToDo {
        _id: ID!
        title: String!
        completed: Boolean!
    }

    type Query {
        getToDos: [ToDo!]!
        hello: String
    }

    type Mutation {
        addTodo(title: String!): ToDo!
        removeTodo(_id: ID!): Boolean!
    }
`;

class UserInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UserInputError";
  }
}

class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DatabaseError";
  }
}


export const resolvers: IResolvers = {
  Query: {
    getToDos: async (parent, args, { db }): Promise<Array<{_id: string, title: string, completed: boolean}>> => {
      return db.collection('todos').find().toArray();
    },
  },
  Mutation: {
    addTodo: async (parent, { title }: {title: string}, { db }): Promise<{_id: string, title: string, completed: boolean}> => {
      if (!title.trim()) throw new UserInputError("Title cannot be empty");

      try {
        const newTodo = {
          title,
          completed: false,
        };
        const result = await db.collection('todos').insertOne(newTodo);
        return result.ops[0];
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


const app = express();

const startServer = async () => {
  const db = await connectToDb();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
    formatError: (error) => {
      if (error.originalError instanceof DatabaseError) {
        console.error(error.message);
        return new Error("Internal server error");
      }
      return error;
    }
  });

  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();