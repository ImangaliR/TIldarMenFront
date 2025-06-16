import profileicon from "../../assets/profileicon.png";
import employericon from "../../assets/employericon.png";
import { useUser } from "../../utils/contexts/UserContext";
import { useState, useEffect, useRef } from "react";
import { useWebSocket } from "../../utils/contexts/WebSocketContext";
import { toast } from "react-toastify";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import rightarrow from "../../assets/rightarrow.png";

const ChatDetails = () => {
  const { id: recipientId } = useParams();
  const navigate = useNavigate();
  const {
    client,
    isConnected,
    messages,
    setMessages,
    sendMessage,
    subscribeToUser,
  } = useWebSocket();
  const { userId } = useUser();
  const [input, setInput] = useState("");
  const [userInfo, setUserInfo] = useState();
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    const fetchUserChat = async () => {
      try {
        const res = await api.get(`/users/user/${recipientId}`);
        setUserInfo(res.data.data);
      } catch (err) {
        toast.error("Something went wrong");
      }
    };

    fetchUserChat();
  }, [userId, recipientId]);

  useEffect(() => {
    const subscribeToRecipient = async () => {
      try {
        const response = await api.get(`/messages/${userId}/${recipientId}`);
        console.log("Chat data:", response.data);
        setMessages(response.data.data);

        // Now subscribe to recipient’s queue
        if (client?.connected) {
          subscribeToUser(recipientId);
        }
      } catch (err) {
        console.error("Failed to subscribe to recipient:", err);
      }
    };

    if (userId && recipientId) {
      subscribeToRecipient();
    }
  }, [userId, recipientId, client]);

  const handleSend = async () => {
    if (input.trim() && isConnected) {
      const message = {
        senderId: userId,
        recipientId: recipientId,
        content: input,
        date: new Date().toISOString(),
      };

      sendMessage(message);
      setInput("");
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (dateString) => {
    const options = { hour: "2-digit", minute: "2-digit", hour12: true };
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", options);
  };

  const groupedMessages = [];
  let lastDate = null;

  messages?.forEach((msg, index) => {
    const messageDate = formatDate(msg.date);
    const showDateLabel = messageDate !== lastDate;
    lastDate = messageDate;

    groupedMessages.push({
      ...msg,
      key: index,
      showDateLabel,
      formattedDate: messageDate,
      formattedTime: formatTime(msg.date),
    });
  });

  return (
    <>
      <div className="w-full bg-white md:rounded-lg shadow-md">
        <div className="flex flex-center gap-4 py-5 px-6 md:px-8">
          <button className="md:hidden" onClick={() => navigate("/chat")}>
            <img src={rightarrow} alt="arrow" className="rotate-180 w-4 h-4 " />
          </button>
          {userInfo?.profileImageUrl ? (
            <img
              src={userInfo?.profileImageUrl || profileicon}
              alt="profile image"
              className="w-10 h-10 md:w-13 md:h-13 object-cover rounded-full"
            />
          ) : (
            <img
              src={userInfo?.role === "EMPLOYER" ? employericon : profileicon}
              alt="profile image"
              className="w-10 h-10 md:w-13 md:h-13 object-cover rounded-full"
            />
          )}
          <div className="grid items-center">
            <h1 className="font-semibold text-lg md:text-xl">
              {userInfo?.firstName} {userInfo?.lastName}
            </h1>
          </div>
        </div>

        <hr className="text-[#F3F3F3]" />

        <div className="bg-white flex flex-col h-full max-h-[485px] md:max-h-[570px]">
          <div className="chat-area flex-1 overflow-y-auto min-h-0 mt-5">
            {/* {messages?.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end px-5 py-1  ${
                  msg.senderId == userId ? "justify-end" : "justify-start"
                }`}
              >
                <div className="relative bg-gray-50 px-6 pt-1 pb-5 rounded-lg shadow-sm max-w-xs sm:max-w-sm md:max-w-md">
                  <p
                    className={`break-words ${
                      msg.senderId == userId ? "text-left" : "text-right"
                    }`}
                  >
                    {msg.content}
                  </p>
                  <span
                    className={`text-[10px] text-gray-400 absolute bottom-1 ${
                      msg.senderId == userId ? "right-1" : "left-1"
                    }`}
                  >
                    {formatDate(msg.date)}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} /> */}
            {groupedMessages.map((msg) => (
              <div key={msg.key} className="bg-white">
                {msg.showDateLabel && (
                  <div className="flex justify-center my-3">
                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full shadow-sm">
                      {msg.formattedDate}
                    </span>
                  </div>
                )}
                <div
                  className={`flex items-end px-5 py-1 ${
                    msg.senderId == userId ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="relative max-w-xs sm:max-w-sm md:max-w-md">
                    <p
                      className={`break-words bg-gray-50 px-6 pt-1 pb-4 rounded-lg shadow-sm ${
                        msg.senderId == userId ? "text-left" : "text-right"
                      }`}
                    >
                      {msg.content}
                    </p>
                    <span
                      className={`text-[11px] text-gray-400 absolute bottom-0.5 ${
                        msg.senderId == userId ? "right-1" : "left-1"
                      }`}
                    >
                      {formatTime(msg.date)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="bg-white flex items-center gap-3 px-5 pb-5 md:pb-0 mt-5">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                const el = e.target;
                el.style.height = "auto";
                el.style.height = `${Math.min(el.scrollHeight, 150)}px`;
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  handleSend();
                }
              }}
              className="w-full border-2 border-[#dcdcdc] pl-3 rounded-lg resize-none overflow-hidden transition-all duration-150 ease-in-out"
              rows={1}
            />
            <button
              onClick={handleSend}
              className="text-[#71C39C] border-1 py-1 px-5 rounded-lg fonr-semibold"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatDetails;
