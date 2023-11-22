const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  userIds: [String],
  messages: [
    {
      userId: String,
      timestamp: String,
      photo: String,
      msg: String,
    },
  ],
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
