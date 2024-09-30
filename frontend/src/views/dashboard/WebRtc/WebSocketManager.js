// src/components/WebSocketManager.js
import React, { useEffect, useState } from "react";
import WebSocketClient from "./WebSocketClient";

const WebSocketManager = () => {
  const [webSocketClient, setWebSocketClient] = useState(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (username && password) {
      const client = WebSocketClient;
      client.connect(username, password);
      setWebSocketClient(client);

      return () => {
        client.disconnect();
      };
    }
  }, []);

  return null; // No UI, this just manages WebSocket connection
};

export default WebSocketManager;
