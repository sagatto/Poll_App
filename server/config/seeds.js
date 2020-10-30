const faker = require('faker');
const db = require('../config/connection');
const { Poll, User } = require('../models');
// Debug enable 
const debug = 0
// Number of fakers for seeds
const numFakers = 5;
db.once('open', async () => {
  await Poll.deleteMany({});
  await User.deleteMany({});

  // create user data for Users collection
  const userData = [];
  for (let i = 0; i < numFakers; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();
    userData.push({ email, password });
  }
  const createdUsers = await User.collection.insertMany(userData);
  // create polls for Polls collections
  let createdPolls = [];
  for (let i = 0; i < numFakers; i += 1) {
    const question = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const {  _id: userId } = createdUsers.ops[randomUserIndex];
    const poll = await Poll.create({ question });
    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { polls: poll._id } }
    );
    createdPolls.push(poll);
  }
  
  if(debug) console.log('Completed seeding your DB');
  process.exit(0);
});
