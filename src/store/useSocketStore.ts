import create from "zustand";
import ioClient, { Socket } from "socket.io-client";

type SocketStoreType = {
  socket: Socket;
};

const socket = ioClient("http://localhost:3002", {
  withCredentials: true,
});
socket.on("connect", () => {
  console.log("connected chat");
});
socket.on("disconnect", () => {
  console.log("disconnected chat");
});

const useSocketStore = create<SocketStoreType>(() => ({
  socket,
}));

export default useSocketStore;
