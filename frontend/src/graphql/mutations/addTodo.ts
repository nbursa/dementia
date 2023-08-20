import { gql } from '@apollo/client';

export const ADD_TODO = gql`
    mutation AddTodo($title: String!) {
        addTodo(title: $title) {
            id
            title
            completed
        }
    }
`;