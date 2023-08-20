import { gql } from '@apollo/client';

export const FETCH_TODOS = gql`
    query GetTodos {
        todos {
            id
            title
            completed
        }
    }
`;