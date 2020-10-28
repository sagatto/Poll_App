const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const pollSchema = new Schema(
  {
    question: {
      type: String,
      required: 'You need to leave a question!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    // username: {
    //   type: String,
    //   required: true
    // },
    // email: {
    //   type: String,
    //   required: true
    // },
    count: {
      type: Number,
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);


const Poll = model('Poll', pollSchema);

module.exports = Poll;
