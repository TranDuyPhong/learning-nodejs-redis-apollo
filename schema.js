const { gql } = require('apollo-server-express');

const schema = gql `
    type Query {
        get(key: String!) : String!
    }

    type Mutation {
        set(key: String!, value: String!) : Boolean!
    }
`;

module.exports = schema;