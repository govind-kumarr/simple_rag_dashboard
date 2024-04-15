import React from "react";

const Chat_sidebar = ({ chats, changeChat, currentChat }) => {
  return (
    <div className="border-2 mr-5 rounded-lg">
      <h1 className="font-bold my-2 text-center">All Chats</h1>
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
