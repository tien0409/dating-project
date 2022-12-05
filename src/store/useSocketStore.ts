import create from "zustand";
import ioClient, { Socket } from "socket.io-client";

type SocketStoreType = {
  socket: Socket;
};
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_BASE_URL;

let socket: Socket;
if (SOCKET_URL) {
  socket = ioClient(SOCKET_URL, {
    withCredentials: true,
  });
  socket.on("connect", () => {
    console.log("connected chat");
  });
  socket.on("disconnect", () => {
    console.log("disconnected chat");
  });
}
const useSocketStore = create<SocketStoreType>(() => ({
  socket,
}));

export default useSocketStore;
