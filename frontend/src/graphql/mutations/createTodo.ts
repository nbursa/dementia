import { gql } from '@apollo/client';

export const CREATE_TODO = gql`
    mutation CreateTodo($title: String!) {
        createTodo(title: $title) {
            _id
            title
            body
            completed
            createdAt
            updatedAt
        }
    }
`;