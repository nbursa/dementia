import { gql } from 'apollo-server-express';
import { serverTestClient } from '../utils/test-utils';

const { query, mutate } = serverTestClient;

describe('Resolvers', () => {
    describe('Queries', () => {
        test('should fetch all todos', async () => {
            const GET_TODOS = gql`
                query {
                    getToDos {
                        _id
                        title
                        completed
                    }
                }
            `;

          const response = await query({ query: GET_TODOS });

            // Check for GraphQL errors
          expect(response.errors).toBeUndefined();
          expect(response.data.getToDos).toBeDefined();
        });
    });

    describe('Mutations', () => {
        test('should create a todo', async () => {
            const CREATE_TODO = gql`
                mutation CreateTodo($title: String!) {
                    createTodo(title: $title) {
                        _id
                        title
                        completed
                    }
                }
            `;

          const response = await mutate({
            mutation: CREATE_TODO,
            variables: { title: 'Test todo' }
          });

            // Check for GraphQL errors
          expect(response.errors).toBeUndefined();
          expect(response.data.createTodo.title).toBe('Test todo');
          expect(response.data.createTodo.completed).toBe(false);
        });
    });
});