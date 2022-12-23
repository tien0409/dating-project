import create from "zustand";
import ioClient, { Socket } from "socket.io-client";

type SocketStoreType = {
  socket: Socket | null;
  initSocket: () => void;
};
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_BASE_URL;

const useSocketStore = create<SocketStoreType>((setState, getState) => ({
  socket: null,
  initSocket: () => {
    if (SOCKET_URL && !getState().socket) {
      const _socket = ioClient(SOCKET_URL || "", {
        withCredentials: true,
      });

      // _socket.on("connect", () => {
      //   console.log("connected gateway");
      // });
      //
      // _socket.on("disconnect", () => {
      //   console.log("disconnected gateway");
      // });
      //
      setState({ socket: _socket });
    }
  },
}));

export default useSocketStore;
