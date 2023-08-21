import { gql } from '@apollo/client';

export const CREATE_TODO = gql`
    mutation CreateTodo($title: String!, $completed: Boolean!, $createdAt: String!, $updatedAt: String!) {
        createTodo(title: $title, completed: $completed, createdAt: $createdAt, updatedAt: $updatedAt) {
            _id
            title
            completed
            createdAt
            updatedAt
        }
    }
`;