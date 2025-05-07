import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { NavLink, Outlet, useMatch } from "react-router-dom";
import ChatCards from "./ChatCard";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import TokenService from "../../services/token.service";
import { useUser } from "../../utils/contexts/UserContext";

const Chat = () => {
  const isDetailPage = useMatch("/chat/chat-details/:id");
  const token = TokenService.getLocalAccessToken();
  const [messages, setMessages] = useState([]);
  const socketUrl = `ws://34.42.251.169:8080/ws?access_token=${token}`;
  const socket = new WebSocket(socketUrl);
  const { userId } = useUser();

  useEffect(() => {
    if (!token) {
      console.error("No valid token found. Please log in.");
      return;
    }

    // First, authenticate via HTTP (could be an API call)
    fetch("http://34.42.251.169:8080/ws", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Once authenticated, connect to WebSocket
          const ws = new WebSocket("ws://34.42.251.169:8080/ws");

          ws.onopen = () => {
            console.log("WebSocket connection opened.");
          };

          ws.onmessage = (event) => {
            console.log("Message received:", event.data);
            setMessages((prev) => [...prev, event.data]);
          };

          ws.onerror = (error) => {
            console.error("WebSocket error:", error);
          };

          ws.onclose = () => {
            console.log("WebSocket connection closed.");
          };
        } else {
          console.error("Authentication failed");
        }
      })
      .catch((error) => {
        console.error("Authentication error:", error);
      });

    return () => {
      // Make sure to close WebSocket when the component unmounts
      ws.close();
    };
  }, [token]);

  const sendMessage = () => {
    // Send a message once the WebSocket connection is open
    const ws = new WebSocket("ws://34.42.251.169:8080/ws");
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ content: "Hello world" }));
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
