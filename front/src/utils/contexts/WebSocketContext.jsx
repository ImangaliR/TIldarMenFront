import { createContext, useContext, useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import TokenService from "../../services/token.service";
import { useUser } from "../../utils/contexts/UserContext";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const token = TokenService.getLocalAccessToken();
  const { userId } = useUser();
  const clientRef = useRef(null);
  const subscriptionsRef = useRef({});
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

        clientRef.current = stompClient;

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
      clientRef.current = null;
    };
  }, [token, userId]);

  const subscribeTo = (destination) => {
    const client = clientRef.current;
    if (!client || !client.connected || subscriptionsRef.current[destination])
      return;

    const subscription = client.subscribe(destination, (message) => {
      const payload = JSON.parse(message.body);
      setMessages((prev) => [...prev, payload]);
    });

    subscriptionsRef.current[destination] = subscription;
    console.log(`Subscribed to: ${destination}`);
  };

  const sendMessage = (messageBody) => {
    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({
        destination: "/app/chat",
        body: JSON.stringify(messageBody),
      });
    }
  };

  const subscribeToUser = (recipientId) => {
    if (clientRef.current && clientRef.current.connected) {
      client.subscribe(`/user/${recipientId}/queue/messages`, (message) => {
        const payload = JSON.parse(message.body);
        setMessages((prev) => [...prev, payload]);
      });
    }
  };

  return (
    <WebSocketContext.Provider
      value={{
        client,
        isConnected,
        messages,
        setMessages,
        subscribeTo,
        sendMessage,
        subscribeToUser,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
