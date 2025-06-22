import {
  createContext,
  use,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import TokenService from "../../services/token.service";
import { useUser } from "../../utils/contexts/UserContext";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const token = TokenService.getLocalAccessToken();
  const { userId } = useUser();
  const clientRef = useRef(null);
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState({});
  const [chatList, setChatList] = useState([]);
  const selectedUserRef = useRef(null);

  useEffect(() => {
    selectedUserRef.current = selectedUserId;
  }, [selectedUserId]);

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
            chatId: `${userId}-${payload.recipientId}`,
            senderId: payload.senderId,
            recipientId: payload.recipientId,
            content: payload.content,
            date: payload.date || new Date().toISOString(),
          };

          const isIncoming = payload.senderId !== userId;
          const chatPartnerId = isIncoming
            ? payload.senderId
            : payload.recipientId;
          if (selectedUserRef.current === chatPartnerId) {
            setMessages((prev) => [...prev, messageObject]);
          } else {
            setUnreadMessages((prev) => ({
              ...prev,
              [payload.senderId]: (prev[payload.senderId] || 0) + 1,
            }));
          }
        });

        /* stompClient.subscribe(`/user/${userId}/queue/chats`, (message) => {
          const chatList = JSON.parse(message.body);
          console.log("💬 Chat list received:", chatList);
          // TODO: store chat list in state if needed, e.g.:
          setChatList(chatList);
        });

        // Request chat list
        stompClient.publish({
          destination: "/app/getChats",
          body: JSON.stringify({}),
        }); */
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

  const sendMessage = async (messageBody) => {
    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({
        destination: "/app/chat",
        body: JSON.stringify(messageBody),
      });
    }
  };

  const subscribeToUser = async (recipientId) => {
    setSelectedUserId(recipientId);
    setUnreadMessages((prev) => ({
      ...prev,
      [recipientId]: 0,
    }));
  };

  return (
    <WebSocketContext.Provider
      value={{
        client,
        isConnected,
        messages,
        setMessages,
        sendMessage,
        subscribeToUser,
        unreadMessages,
        setUnreadMessages,
        setSelectedUserId,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
