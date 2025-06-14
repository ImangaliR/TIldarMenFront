import { createContext, useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import TokenService from "../../services/token.service";
import { useUser } from "../../utils/contexts/UserContext";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const token = TokenService.getLocalAccessToken();
  const { userId } = useUser();
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!token || !userId) return;

    const socket = new SockJS("http://34.42.251.169:8080/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        console.log("✅ WebSocket Connected");
        setIsConnected(true);

        stompClient.subscribe(`/user/${userId}/queue/messages`, (message) => {
          const payload = JSON.parse(message.body);
          setMessages((prev) => [
            ...prev,
            `From ${payload.senderId}: ${payload.content}`,
          ]);
        });
      },
      onDisconnect: () => {
        console.log("❌ WebSocket Disconnected");
        setIsConnected(false);
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
      setClient(null);
      setIsConnected(false);
    };
  }, [token, userId]);

  return (
    <WebSocketContext.Provider
      value={{ client, isConnected, messages, setMessages }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
