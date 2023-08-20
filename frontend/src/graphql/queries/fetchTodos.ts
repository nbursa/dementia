import { gql } from '@apollo/client';

export const FETCH_TODOS = gql`
    query GetTodos {
        getToDos {
            _id
            title
            body
            completed
            createdAt
            updatedAt
        }
    }
`;