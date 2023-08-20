import { createTestClient } from 'apollo-server-testing';
import {
  ApolloServer,
  ExpressContext
} from 'apollo-server-express';
import {MongoClient, MongoClientOptions} from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {typeDefs} from '../graphql/typeDefs';
import {resolvers} from '../graphql/resolvers';

let mongoServer: MongoMemoryServer;
let client: MongoClient;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  client = new MongoClient(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true } as MongoClientOptions);
  await client.connect();
}, 10000);

afterAll(async () => {
  if (client) await client.close();
  if (mongoServer) await mongoServer.stop();
});

export const testServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ db: client.db() }),
});

export const serverTestClient = createTestClient(testServer as any);