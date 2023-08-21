import { gql } from '@apollo/client';

export const REMOVE_TODO = gql`
    mutation RemoveTodo($_id: ID!) {
        removeTodo(_id: $_id)
    }
`;