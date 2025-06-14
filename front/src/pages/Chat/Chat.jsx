import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { NavLink, Outlet, useMatch } from "react-router-dom";
import TokenService from "../../services/token.service";
import { useUser } from "../../utils/contexts/UserContext";
import { useWebSocket } from "../../utils/contexts/WebSocketContext";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import ChatSidebar from "./ChatSidebar";
import api from "../../services/api";
import { toast } from "react-toastify";

const Chat = () => {
  const isDetailPage = useMatch("/chat/chat-details/:id");
  const { client, isConnected, messages, setMessages } = useWebSocket();
  const { userId } = useUser();
  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");
  const [recipientId, setRecipientId] = useState();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await api.get(`/users/chats`);
        console.log(res.data.data);
        setChats(res.data.data);
      } catch (err) {
        toast.error("Something went wrong");
      }
    };

    fetchChats();
  }, [userId]);

  const sendPrivateMessage = () => {
    if (input.trim() && client?.connected) {
      const message = {
        senderId: userId,
        recipientId: recipientId,
        content: input,
      };

      client.publish({
        destination: "/app/chat",
        body: JSON.stringify(message),
      });

      setMessages((prev) => [...prev, `You to ${recipientId}: ${input}`]);
      setInput("");
    }
  };

  const sendPublicMessage = () => {
    if (input.trim() && client?.connected) {
      const message = {
        senderId: userId,
        content: input,
      };

      client.publish({
        destination: "/app/chat-sendMessage",
        body: JSON.stringify(message),
      });

      setMessages((prev) => [...prev, `You (public): ${input}`]);
      setInput("");
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex gap-4 md:px-10 pt-5 pb-1">
        <ChatSidebar chats={chats} />
        {isDetailPage ? (
          <Outlet
            client={client}
            sendPrivateMessage={sendPrivateMessage}
            setInput={setInput}
            input={input}
            messages={messages}
            setMessages={setMessages}
            setRecipientId={setRecipientId}
          />
        ) : (
          <p className="flex flex-1 items-center justify-center text-xl pb-20">
            Select a chat to start messaging
          </p>
        )}
      </main>
    </>
  );
};

export default Chat;
