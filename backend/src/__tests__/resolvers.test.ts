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
        test('should add a todo', async () => {
            const ADD_TODO = gql`
                mutation AddTodo($title: String!) {
                    addTodo(title: $title) {
                        _id
                        title
                        completed
                    }
                }
            `;

          const response = await mutate({
            mutation: ADD_TODO,
            variables: { title: 'Test todo' }
          });

            // Check for GraphQL errors
          expect(response.errors).toBeUndefined();
          expect(response.data.addTodo.title).toBe('Test todo');
          expect(response.data.addTodo.completed).toBe(false);
        });
    });
});