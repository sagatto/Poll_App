const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Poll {
    _id: ID
    question: String
    vote: Enum
    count: Int
    category: Category
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    poll: [Poll]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    poll: [Poll]
  }

  type Query {
    poll: ID
  }

#   type Mutation {
#     addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
#     addPoll(products: [ID]!): Order
#     updateUser(firstName: String, lastName: String, email: String, password: String): User
#     updatePoll(_id: ID!, quantity: Int!): Product
#     login(email: String!, password: String!): Auth
#   }
`;

module.exports = typeDefs;
