import io from 'socket.io-client';
import { ASSETS_API } from 'src/config-global';

let socket = null;

export const connectWithSocketServer = (userId) => {
  socket = io(ASSETS_API, { transports: ['websocket']});
  socket.auth = { adminManagerId: userId };

  socket.on('connect', () => {
    console.log('Successfully connected with socket.io server', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from socket.io server');
  });
};

export function socketDisconnect() {
  socket.disconnect();
};

export function getSocketInstance() {
  return socket;
};
