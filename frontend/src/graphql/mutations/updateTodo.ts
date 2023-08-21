import { gql } from '@apollo/client';

export const UPDATE_TODO = gql`
    mutation UpdateTodo($_id: ID!, $title: String!, $completed: Boolean!, $createdAt: String, $updatedAt: String) {
        updateTodo(_id: $_id, title: $title, completed: $completed, createdAt: $createdAt, updatedAt: $updatedAt) {
            _id
            title
            completed
            createdAt
            updatedAt
        }
    }
`;