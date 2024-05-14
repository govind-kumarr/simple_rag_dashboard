import React from "react";
import { BiMessageEdit } from "react-icons/bi";
const Chat_sidebar = ({
  chats,
  changeChat,
  currentChat,
  startNewChat,
}) => {
  return (
    <div className="border-2 mr-5 rounded-lg">
      {/* <h1 className="font-bold my-2 text-center">All Chats</h1> */}
      <div
        className="flex mb-2 rounded-md bg-primary-500 cursor-pointer"
        onClick={startNewChat}
      >
        <div className="font-bold my-2 ml-4 text-center text-white">
          New chat
        </div>
        <BiMessageEdit className="ml-4 mt-[12px] text-center text-white " />
      </div>

      <div className="flex flex-col gap-1 items-center">
        {chats.length > 0 &&
          chats.map((chat) => {
            return (
              <div
                className={`border-gray-100 text-gray-500 rounded-md p-2 w-[90%] cursor-pointer ${
                  currentChat && currentChat._id == chat._id
                    ? "bg-primary-500 font-bold text-white"
                    : ""
                }`}
                key={chat._id}
                onClick={() => changeChat(chat)}
              >
                <p>{chat.title}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Chat_sidebar;
