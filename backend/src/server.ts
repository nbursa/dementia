import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { connectToDb } from './utils/db';
import {typeDefs} from "./graphql/typeDefs";
import {resolvers} from "./graphql/resolvers";
import {DatabaseError} from "./utils/resolvers-errors";
import cors from 'cors';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'  // frontend origin
}));

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