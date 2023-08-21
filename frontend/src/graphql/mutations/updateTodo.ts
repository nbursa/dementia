import { gql } from '@apollo/client';

export const UPDATE_TODO = gql`
    mutation UpdateTodo($_id: ID!, $completed: Boolean!) {
        updateTodo(_id: $_id, completed: $completed) {
            _id
            title
            completed
            createdAt
            updatedAt
        }
    }
`;