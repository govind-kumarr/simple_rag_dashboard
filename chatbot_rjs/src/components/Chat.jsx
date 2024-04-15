import React, { useEffect, useState } from "react";
import { instance } from "../config/axios_config";

const Chat_Message = (props) => {
  const { content, sender, date_created } = props;
  return (
    <div
      className={`max-w-[75%] border-2 rounded-lg px-2 py-2 bg-${
        sender.toUpperCase() == "AI" ? "gray-200" : "blue-700"
      }`}
      style={{
        alignSelf: sender.toUpperCase() == "AI" ? "flex-start" : "flex-end",
      }}
    >
      <p
        className={`text-${
          sender.toUpperCase() == "AI" ? "gray-700" : "white"
        }`}
      >
        {content}
      </p>
    </div>
  );
};
const UserInput = ({ addUserMessage }) => {
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() === "") return;
    addUserMessage(message);
    setMessage("");
  };
  return (
    <form className="max-w-full mx-auto" onSubmit={handleSubmit}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <input
          type="search"
          id="default-search"
          className="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required={true}
        />
        <button
          type="submit"
          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Send
        </button>
      </div>
    </form>
  );
};

const Chat = ({ chat }) => {
  console.log({ chat });
  const senders = {
    user: "USER",
    ai: "AI",
  };
  const [messages, setMessages] = useState(chat?.messages);

  const prepareUserMessage = (message) => {
    return {
      sender: senders.user,
      content: message,
      date_created: new Date(),
    };
  };

  const prepareAiMessage = (message) => {
    return {
      sender: senders.ai,
      content: message,
      date_created: new Date(),
    };
  };

  async function getAnswer(question) {
    try {
      const chatId = chat._id;
      console.log({ chatId });
      const { data } = await instance.post("/api/v1/ask", { question, chatId });
      const { text } = data;
      const newMessage = prepareAiMessage(text);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    } catch (error) {
      console.log(error);
    }
  }

  const addUserMessage = (message) => {
    const newMessage = prepareUserMessage(message);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    getAnswer(message);
  };

  useEffect(() => {
    setMessages(chat?.messages);
  }, [chat]);
  return (
    <div className="h-[calc(100vh-7.5rem)] flex flex-col">
      <div className="flex-grow overflow-auto flex flex-col gap-1 mb-4 pr-2">
        {messages &&
          messages.length > 0 &&
          messages.map((message, index) => (
            <Chat_Message key={index} {...message} />
          ))}
      </div>
      <div className="">
        <UserInput addUserMessage={addUserMessage} />
      </div>
    </div>
  );
};

export default Chat;
