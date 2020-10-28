const { gql } = require("apollo-server-express");

const typeDefs = gql`

  type Poll {
    _id: ID
    question: String
    count: Int
  }

  type User {
    _id: ID
    username: String
    email: String
    polls: [Poll]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    me: User
    # users: [User]
    polls: [Poll]
    # user(username: String!): User
    userVotedForPolls(username: String!): [Poll]
    poll(_id: ID!): Poll
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addPoll(question: String!): Poll
    addUpVote(_id: ID!): Poll
    addDownVote(_id: ID!): Poll
  }
`;

module.exports = typeDefs;
