import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type ToDo {
        _id: String!
        title: String!
        completed: Boolean!
        createdAt: String
        updatedAt: String
    }

    type Query {
        getTodos: [ToDo!]!
    }

    type Mutation {
        createTodo(title: String!): ToDo!
        removeTodo(_id: ID!): Boolean!
        updateTodo(_id: ID!, completed: Boolean!): ToDo!
    }
`;