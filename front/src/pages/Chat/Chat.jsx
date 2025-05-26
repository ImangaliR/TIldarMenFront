import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { NavLink, Outlet, useMatch } from "react-router-dom";
import TokenService from "../../services/token.service";
import { useUser } from "../../utils/contexts/UserContext";
import SockJS from "sockjs-client/dist/sockjs.min.js";
import { Client } from "@stomp/stompjs";

const Chat = () => {
  const isDetailPage = useMatch("/chat/chat-details/:id");
  const token = TokenService.getLocalAccessToken();
  const { userId } = useUser();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [client, setClient] = useState(null); // Replace with actual logged-in user ID
  const recipientId = "1"; // Replace dynamically based on chat selection

  useEffect(() => {
    if (!token) return; // no token, do not connect
    const socket = new SockJS(`https://tildarmen.duckdns.org/ws`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      connectHeaders: {
        Authorization: `Bearer ${token}`, // <-- Add your JWT token here
      },
      onConnect: () => {
        console.log("Connected");

        stompClient.subscribe(`/user/${userId}/queue/messages`, (message) => {
          const payload = JSON.parse(message.body);
          setMessages((prev) => [
            ...prev,
            `From ${payload.senderId}: ${payload.content}`,
          ]);
        });

        stompClient.subscribe("/topic/public", (message) => {
          const payload = JSON.parse(message.body);
          setMessages((prev) => [...prev, `Public: ${payload.content}`]);
        });
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    return () => {
      stompClient.deactivate();
    };
  }, [token, userId]);

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
      <main className="flex gap-4 px-10 pt-5 pb-1">
        <div className="bg-white rounded-lg h-screen min-w-95 shadow-md">
          <div className="flex items-center justify-center gap-3 p-8">
            <h1 className="font-bold text-xl">Messages</h1>
            <p className="w-10 rounded-full bg-gray-200 text-center font-semibold">
              12
            </p>
          </div>
          <hr className="text-[#F3F3F3]" />
          <div className="grid gap-2 py-4 px-5">
            {/* {navigation.map((item, i) => (
              <NavLink
                key={i}
                to={`/chat/chat-details/:${id}`}
                className={({ isActive }) =>
                  `flex gap-4 hover:bg-gray-100 p-3 rounded-xl ${
                    isActive ? "bg-gray-100" : ""
                  }`
                }
              >
                <img
                  src={profileicon}
                  alt="profile image"
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div>
                  <h1 className="font-semibold text-lg">Florencio Dorrance</h1>
                  <p className="text-start text-sm opacity-50">woohoooo</p>
                </div>
              </NavLink>
            ))} */}
          </div>
        </div>
        {isDetailPage ? (
          <Outlet />
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
