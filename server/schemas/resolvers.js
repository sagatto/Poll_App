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
      if(debug) console.log("allPolls() query");
      return Poll.find();
    },
    // Return full list of Users from User table
    allUsers: async () => {
      if(debug) console.log("allUsers() query");
      return User.find();
    },
    // Using user._id from context find list of polls they have voted on
    whoMe: async (parent, args, context) => {
      if(debug) console.log("whoMe() query");
      return await User.findById(context.user._id);
    },
  },
  Mutation: {
    // Authenticate user using email and password
    login: async (parent, { email, password }) => {
      if(debug) console.log("login() mutation");
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
      if(debug) console.log("addUser() mutation");
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    // Add a new poll using args
    addPoll: async (parent, args) => {
      if(debug) console.log("addPoll() mutation");
      return await Poll.create(args);
    },
    // Add vote using poll id if user hasn't voted
    addLike: async (parent, { _id }, context) => {
      if(debug) console.log("addLike() mutation");
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
            if (debug) console.log("Vote already casted for :",_id);
            return pollInfo;
          }
        }
      }
      if (debug) console.log("Casting vote for:",_id);
      pollCount = pollCount + 1;
      if (debug) console.log("Vote will be updated to:", pollCount);
      let updatedPollInfo = await Poll.findByIdAndUpdate(_id, {
        count: pollCount,
      });
      await User.findByIdAndUpdate(context.user._id, {
        $addToSet: {polls: _id}
      });
      updatedPollInfo = await Poll.findById(_id);
      updateUserPolls = await User.findById(context.user._id);
      return updatedPollInfo;
    },
    // Add vote using poll id if user hasn't voted
    addDislike: async (parent, { _id }, context) => {
      if(debug) console.log("addDislike() mutation");
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
            if (debug) console.log("Vote already casted for :",_id);
            return pollInfo;
          }
        }
      }
      if (debug) console.log("Casting vote for:",_id);
      pollCount = pollCount - 1;
      if (debug) console.log("Vote will be updated to:", pollCount);
      let updatedPollInfo = await Poll.findByIdAndUpdate(_id, {
        count: pollCount,
      });
      await User.findByIdAndUpdate(context.user._id, {
        $addToSet: {polls: _id}
      });
      updatedPollInfo = await Poll.findById(_id);
      updateUserPolls = await User.findById(context.user._id);
      return updatedPollInfo;
    }
  }
};
module.exports = resolvers;