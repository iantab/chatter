import List from "@mui/material/List";
import ChatListItem from "./chat-list-item/chatlistitem";
import { Stack } from "@mui/material";
import ChatListHeader from "./chat-list-header/chatlistheader";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import ChatListAdd from "./chat-list-add/chatlistadd";
import { useGetChats } from "../../hooks/useGetChats";

const ChatList = () => {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  const { data } = useGetChats();

  return (
    <>
      <ChatListAdd
        open={chatListAddVisible}
        handleClose={() => setChatListAddVisible(false)}
      />
      <Stack>
        <ChatListHeader handleAddChat={() => setChatListAddVisible(true)} />
        <Divider />
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          {data?.chats.map((chat) => <ChatListItem name={chat.name} />)}
        </List>
      </Stack>
    </>
  );
};

export default ChatList;
