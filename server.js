const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Medico = require('./models/medicoModel');
const Room = require('./models/roomsModel');
const app = require('./app');
const { Server } = require('socket.io');

dotenv.config({ path: './config.env' });

const DB = process.env.DB_CONNECT.replace(
  '<password>',
  process.env.DB_PASSWORD
);

const connection = mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected 🚀🐧');
  });

const server = app.listen(3000, () => {
  console.log('Server started! 🚀');
});

const io = new Server(server, {
  connectionStateRecovery: {},
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('joinRoom', async (data) => {
    const isActiveChat = await lookForActiveChat(data.id, data.id2);
    if (isActiveChat) {
      socket.join(`${isActiveChat}`);
      socket.emit('serverStarted', {
        msg: 'Conversa iniciada!',
        room: isActiveChat,
      });
      const messages = await recoverMessages(isActiveChat);

      io.to(`${isActiveChat}`).emit('messageRecovery', messages);
    } else {
      console.log('isNot');
      const room = await createRoom(data);
      socket.join(`${room}`);
      socket.emit('serverStarted', {
        msg: 'Conversa iniciada!',
        room: room,
      });
    }
  });

  //Listen for new message
  socket.on('chatMessage', async (data) => {
    const metadata = await generatePhotoNameTime(data.currentUser, data.msg);
    io.to(`${data.room}`).emit('message', metadata);

    await pushMessageIntoRoom(data.room, metadata);
  });
});

const recoverMessages = async (room) => {
  const actualRoom = await Room.findById(room);

  return actualRoom.messages;
};

const pushMessageIntoRoom = async (room, metadata) => {
  const actualRoom = await Room.findById(room);

  actualRoom.messages.push({
    userId: metadata.id,
    timestamp: metadata.time,
    photo: metadata.photo,
    msg: metadata.msg,
  });

  await actualRoom.save();
};

const lookForActiveChat = async (id1, id2) => {
  const activeChat = await Room.find({
    userIds: { $all: [id1, id2] },
  });

  if (!activeChat[0]) return false;
  else return activeChat[0]._id;
};

const createRoom = async (data) => {
  const newRoom = await Room.create({ userIds: [data.id, data.id2] });

  return newRoom._id;
};

const generatePhotoNameTime = async (id, msg) => {
  const currentUser = await Medico.findById(id);
  const now = new Date();

  return {
    photo: currentUser.photo,
    id: currentUser._id,
    time: `${now.getHours()}:${now.getMinutes()}`,
    msg: msg,
  };
};
