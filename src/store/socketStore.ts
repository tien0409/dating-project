import create from "zustand";
import ioClient, { Socket } from "socket.io-client";

import { REQUEST_SEND_MESSAGE } from "@/configs/socket-events";

type SocketStoreType = {
  socket: Socket;
  requestSendMessage: (_content: string) => void;
};

const socket = ioClient("http://localhost:3002", {
  withCredentials: true,
});
socket.on("connect", () => {
  console.log("connected socket");
});
socket.on("disconnect", () => {
  console.log("disconnected socket");
});

const socketStore = create<SocketStoreType>(() => ({
  socket,
  requestSendMessage: (content) => {
    socket.emit(REQUEST_SEND_MESSAGE, content);
  },
}));

export default socketStore;
