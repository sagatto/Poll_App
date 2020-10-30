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
    count: {
      type: Number,
      default: 0
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
