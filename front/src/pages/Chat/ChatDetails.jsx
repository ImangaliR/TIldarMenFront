import { useParams } from "react-router-dom";
import profileicon from "../../assets/profileicon.png";
import { useUser } from "../../utils/contexts/UserContext";
import { useState, useEffect } from "react";

const ChatDetails = ({
  client,
  sendPrivateMessage,
  setInput,
  input,
  messages,
  setMessages,
  setRecipientId,
}) => {
  const { id } = useParams();
  const { userId } = useUser();

  useEffect(() => {
    setRecipientId(id);
    console.log("ChatDetails component mounted");
    if (!client?.connected) return;
    console.log("Subscribing to messages for recipientId:", id);

    const subscription = client.subscribe(
      `/user/${userId}/queue/messages`,
      (message) => {
        const payload = JSON.parse(message.body);

        if (payload.senderId === id || payload.id === id) {
          setMessages((prev) => [...prev, payload]);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [client, userId, id]);

  return (
    <>
      <div className="hidden md:block w-full bg-white rounded-lg shadow-md">
        <div className="flex flex-center gap-2 py-5 px-8">
          <img
            src={profileicon}
            alt="profile image"
            className="w-13 h-13 object-cover rounded-lg"
          />
          <div className="grid items-center">
            <h1 className="font-semibold text-xl">Florencio Dorrance</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <p>Online</p>
            </div>
          </div>
        </div>

        <hr className="text-[#F3F3F3]" />

        <div className="flex flex-col justify-between">
          <div className="chat-area max-h-135 min-h-135 overflow-y-auto">
            {messages?.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.senderId === nickname ? "sender" : "receiver"
                }`}
              >
                <p>{msg.content}</p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 px-5">
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              className="w-full border-2 border-[#dcdcdc] pl-3 py-1 rounded-lg"
            />
            <button
              onClick={() => sendPrivateMessage(input)}
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
