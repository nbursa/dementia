import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import {
  GraphQLRequestContext,
  GraphQLRequestContextWillSendResponse
} from 'apollo-server-types';
import { connectToDb } from './utils/db';
import { typeDefs } from "./types/typeDefs";
import { resolvers } from "./graphql/resolvers";
import { DatabaseError } from "./utils/resolvers-errors";
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'  // frontend origin
}));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :req[User-Agent]'));

app.use('/graphql', (req, res, next) => {
  if (req.body) {
    console.log('GraphQL Query:', req.body.query);
    console.log('Variables:', req.body.variables);
  }
  next();
});

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
    },
    plugins: [{
      async requestDidStart(requestContext: GraphQLRequestContext<any>) {
        console.log('GraphQL Request:', requestContext.request.query);
        return {
          async willSendResponse(requestContext: GraphQLRequestContextWillSendResponse<any>) {
            console.log('GraphQL Response:', requestContext.response);
          }
        };
      }
    }]

  });

  await server.start();

  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();