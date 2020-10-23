const { gql } = require('apollo-server-express');

const typeDefs = gql`
#   type Category {
#     _id: ID
#     name: String
#   }

  type Poll {
    _id: ID
    question: String
    vote: Enum
    count: Int
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

#   type Query {
#     categories: [Category]
#     products(category: ID, name: String): [Product]
#     product(_id: ID!): Product
#     user: User
#     order(_id: ID!): Order
#   }

#   type Mutation {
#     addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
#     addOrder(products: [ID]!): Order
#     updateUser(firstName: String, lastName: String, email: String, password: String): User
#     updateProduct(_id: ID!, quantity: Int!): Product
#     login(email: String!, password: String!): Auth
#   }
`;

module.exports = typeDefs;
