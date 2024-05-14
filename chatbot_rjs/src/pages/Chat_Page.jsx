import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Chat from "../components/Chat";
import { instance } from "../config/axios_config";
import Chat_sidebar from "../components/Chat_sidebar";

const Chat_Page = () => {
  const [chats, setChats] = useState([]);
  const [chatTitle, setChatTitle] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  async function getChats() {
    const { data } = await instance.get("/api/v1/chats");
    console.log(data);
    setChats(data);
    setCurrentChat(data[0]);
  }
  const changeChat = (chat) => {
    console.log({ currentChat: chat });
    setCurrentChat(chat);
  };
  const startNewChat = async () => {
    try {
      const res = await instance.post("/api/v1/createNewChats", { chatTitle });
      console.log(res);
      getChats();
    } catch (error) {
      console.log(error, "error");
    }
  };
  useEffect(() => {
    getChats();
  }, []);
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 pl-1 pt-1 border-gray-200 dark:border-gray-700 mt-14 grid grid-cols-[20%_80%]">
        <Chat_sidebar
          chats={chats}
          changeChat={changeChat}
          currentChat={currentChat}
          startNewChat={startNewChat}
          chatTitle={chatTitle}
          setChatTitle={setChatTitle}
        />
        <Chat chat={currentChat} />
      </div>
    </div>
  );
};

export default Chat_Page;
