import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Assuming your GraphQL server is running at this endpoint
const URI = 'http://localhost:4000/graphql';

const httpLink = new HttpLink({
  uri: URI,
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
});

export default client;