const {connected, getOtherUsersChat} = require('../user/validationToken');

const dashboard = async (socket, knex, io) => {
    const socket_id = socket.id
    socket.on('message', async msg => {
      try {
        const data = msg.data
        const receive = msg.data.receive
        const type = data.type
        await parseMessage(type, data, knex, io, socket, receive)
      } catch (error) {
        
      }
    });
}

const parseMessage = async (type, data, knex, io, socket, receive) => {
  await types[type](data, knex, io, socket, sendToRoom, receive)
}

const sendToRoom = async(room, event, data, io) => {
  io.sockets.in(room).emit(event, data);
}

const types = {
  'connected': connected,
  'getFriends': getOtherUsersChat
}

module.exports = {dashboard}