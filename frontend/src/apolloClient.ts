import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

console.log()
const URI = import.meta.env.VITE_GRAPHQL_API_ENDPOINT as string;

const httpLink = new HttpLink({
  uri: URI,
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
});

export default client;