const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { User, Poll } = require("../models");
const { signToken } = require("../utils/auth");
// Debug enable
const debug = 0;
const resolvers = {
  Query: {
    // Return full list of Polls from Poll table
    allPolls: async () => {
      return Poll.find();
    },
    // Return full list of Users from User table
    allUsers: async () => {
      return User.find();
    },
    // Using user._id from context find list of polls they have voted on
    whoMe: async (parent, args, context) => {
      return await User.findById(context.user._id);
    },
  },
  Mutation: {
    // Authenticate user using email and password
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
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
    addPoll: async (parent, args) => {
      return await Poll.create(args);
    },
    // Add vote using poll id if user hasn't voted
    addLike: async (parent, { _id }, context) => {
      console.log("Adding like::");
      const userInfo = await User.findById(context.user._id);
      const userPolls = userInfo.polls;
      if (debug) {
        console.log("User Info:", userInfo);
        console.log("Polls user has voted on:", userPolls);
      }
      const pollInfo = await Poll.findById(_id);
      let pollCount = pollInfo.count;
      if (debug) {
        console.log("Poll Info:", pollInfo);
        console.log("Poll Count:", pollCount);
      }
      if (userPolls.length != 0) {
        for (i = 0; i < userPolls.length; i++) {
          if (userPolls[i]._id == _id) {
            if (debug) console.log("Vote already casted");
            return pollInfo;
          }
        }
      }
      if (debug) console.log("Casting vote");
      pollCount = pollCount + 1;
      if (debug) console.log("Vote will be updated to:", pollCount);
      let updatedPollInfo = await Poll.findByIdAndUpdate(_id, {
        count: pollCount,
      });
      let updateUserPolls = await User.findByIdAndUpdate(context.user._id, {
        polls: { _id },
      });
      updatedPollInfo = await Poll.findById(_id);
      updateUserPolls = await User.findById(context.user._id);
      return updatedPollInfo;
    },
    // Add vote using poll id if user hasn't voted
    addDislike: async (parent, { _id }, context) => {
      const userInfo = await User.findById(context.user._id);
      const userPolls = userInfo.polls;
      if (debug) {
        console.log("User Info:", userInfo);
        console.log("Polls user has voted on:", userPolls);
      }
      const pollInfo = await Poll.findById(_id);
      let pollCount = pollInfo.count;
      if (debug) {
        console.log("Poll Info:", pollInfo);
        console.log("Poll Count:", pollCount);
      }
      if (userPolls.length != 0) {
        for (i = 0; i < userPolls.length; i++) {
          if (userPolls[i]._id == _id) {
            if (debug) console.log("Vote already casted");
            return pollInfo;
          }
        }
      }
      if (debug) console.log("Casting vote");
      pollCount = pollCount - 1;
      if (debug) console.log("Vote will be updated to:", pollCount);
      let updatedPollInfo = await Poll.findByIdAndUpdate(_id, {
        count: pollCount,
      });
      let updateUserPolls = await User.findByIdAndUpdate(context.user._id, {
        polls: { _id },
      });
      updatedPollInfo = await Poll.findById(_id);
      updateUserPolls = await User.findById(context.user._id);
      return updatedPollInfo;
    }
  }
};

module.exports = resolvers;
