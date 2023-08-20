import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type ToDo {
        _id: ID!
        title: String!
        body: String
        completed: Boolean!
        createdAt: String
        updatedAt: String
    }

    type Query {
        getToDos: [ToDo!]!
    }

    type Mutation {
        createTodo(title: String!): ToDo!
        removeTodo(_id: ID!): Boolean!
    }
`;