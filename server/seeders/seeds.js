const faker = require('faker');

const db = require('../config/connection');
const { Poll, User } = require('../models');

db.once('open', async () => {
  await Poll.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 50; i += 1) {
    const firstname = faker.internet.userName();
    const lastname = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ firstname, lastname, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);


  // create Polls
  let CreatedPolls = [];
  for (let i = 0; i < 100; i += 1) {
    const question = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { firstname, _id: userId } = createdUsers.ops[randomUserIndex];

    const CreatedPolls = await Poll.create({ question, firstname });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { polls: CreatedPolls._id } }
    );

    CreatedPolls.push(CreatedPolls);
  }
  
  console.log('all done!');
  process.exit(0);
});
