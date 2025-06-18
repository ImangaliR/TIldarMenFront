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
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState([]);

  useEffect(() => {
    if (!token || !userId) return;

    const socket = new SockJS("https://tildarmen.duckdns.org/ws");
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
          const messageObject = {
            chatId: `${userId}-${recipientId}`,
            senderId: payload.senderId,
            recipientId: payload.recipientId,
            content: payload.content,
            date: payload.date || new Date().toISOString(),
          };
          setMessages((prev) => [...prev, messageObject]);
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

  const subscribeTo = async (destination) => {
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

  const sendMessage = async (messageBody) => {
    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({
        destination: "/app/chat",
        body: JSON.stringify(messageBody),
      });
    }
  };

  const subscribeToUser = async (recipientId) => {
    if (clientRef.current && clientRef.current.connected) {
      client.subscribe(`/user/${recipientId}/queue/messages`, (message) => {
        const payload = JSON.parse(message.body);
        if (selectedUserId === payload.senderId) {
          setMessages((prev) => [...prev, payload]); // show in chat directly
          // Optional scroll control should be done in UI component (ChatDetails) via useEffect
        } else {
          setUnreadMessages((prev) => ({
            ...prev,
            [payload.senderId]: (prev[payload.senderId] || 0) + 1,
          }));
        }
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
        unreadMessages,
        setUnreadMessages,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
