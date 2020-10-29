const { AuthenticationError } = require('apollo-server-express');
const { User, Poll } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Find if user exists using email and returns if email is registered
    userExist: async (parent, { email }) => {
      const user = await User.findOne({ email });
      if (!user) {
        return false
      } else {
        return true
      }
    },
    // Return full list of Polls from Poll table
    allPolls: async () => {
      return Poll.find(); 
    },
    // Using user._id from context find list of polls they have voted on
    pollsVotedOn: async (parent, args, context) => {
      return await User.findById(context.user._id).populate(polls)
    }
  },
  Mutation: {
    // Authenticate user using email and password
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    // Add new user using args 
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    // Add a new poll using args
    addPoll: async (parent, { question }) => {
      return await Poll.create(question);
    },
    // Add vote using poll id if user hasn't voted
    addUpVote: async (parent, {pollid}, context) => {
      const pollList = await User.findById(context.user._id).populate(polls);

      if(pollList) {
        for(i=0; i < pollList.length; i++){
          if(pollid == pollList[i]._id){
            return 
          }
        }
      }
      /*
      await User.findByIdAndUpdate()
      await Poll.findByIdAndUpdate()
      */
    },
  }
};

module.exports = resolvers;