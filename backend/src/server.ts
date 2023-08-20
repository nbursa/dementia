import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { connectToDb } from './utils/db'; // adjust the path accordingly

// ... (your typeDefs and resolvers imports or definitions)
const typeDefs = gql`
    type Query {
        hello: String
    }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const app = express();

const startServer = async () => {
  const db = await connectToDb();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  });

  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();