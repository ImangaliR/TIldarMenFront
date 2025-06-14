import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { Outlet, useMatch } from "react-router-dom";
import { useUser } from "../../utils/contexts/UserContext";
import ChatSidebar from "./ChatSidebar";
import api from "../../services/api";
import { toast } from "react-toastify";

const Chat = () => {
  const isDetailPage = useMatch("/chat/chat-details/:id");
  const { userId } = useUser();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await api.get(`/users/chats`);
        setChats(res.data.data);
      } catch (err) {
        toast.error("Something went wrong");
      }
    };

    fetchChats();
  }, [userId]);

  return (
    <>
      <Navbar />
      <main className="flex gap-4 md:px-10 pt-5 pb-1">
        <ChatSidebar chats={chats} />
        {isDetailPage ? (
          <Outlet />
        ) : (
          <p className="hidden md:flex flex-1 items-center justify-center text-xl pb-20">
            Select a chat to start messaging
          </p>
        )}
      </main>
    </>
  );
};

export default Chat;
