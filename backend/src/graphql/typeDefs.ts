import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type ToDo {
        _id: ID!
        title: String!
        completed: Boolean!
    }

    type Query {
        getToDos: [ToDo!]!
        hello: String
    }

    type Mutation {
        addTodo(title: String!): ToDo!
        removeTodo(_id: ID!): Boolean!
    }
`;