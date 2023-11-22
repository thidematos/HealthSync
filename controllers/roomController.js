const Room = require('./../models/roomsModel');
const catchAsync = require('./../utils/catchAsync');

exports.getUserRooms = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const messages = await Room.find({
    userIds: { $all: [userId] },
  });

  const anotherIds = [];

  messages.forEach((message) => {
    const anotherUser = message.userIds.filter((id) => `${id}` !== `${userId}`);
    anotherIds.push(...anotherUser);
  });

  req.user.hasChatWith = anotherIds;

  next();
});
