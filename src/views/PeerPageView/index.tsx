import { useEffect, useState } from "react";
import Peer from "peerjs";
import { Button } from "antd";

const PeerPageView = () => {
  const [peer, setPeer] = useState<Peer>();

  useEffect(() => {
    (async () => {
      const { Peer } = await import("peerjs");
      setPeer(new Peer("123"));
    })();
  }, []);
  console.log("peer", peer);

  useEffect(() => {
    if (!peer) return console.log("no peer");

    peer.on("connection", (data) => {
      console.log("data", data);
    });
  }, [peer]);

  const handleConnect = async () => {
    const userMedia = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    peer?.call("123", userMedia);
  };

  return <Button onClick={handleConnect}>Peer Page view</Button>;
};

export default PeerPageView;
