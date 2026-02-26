import { useLocation, useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import { Box, Grid, InputBase, Paper, Stack } from "@mui/material";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useEffect, useRef, useState } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";
import { messageAddedDocument } from "../../hooks/useMessageAdded";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

const Chat = () => {
  const params = useParams();
  const [message, setMessage] = useState("");
  const chatId = params._id!;
  const { data } = useGetChat({ _id: chatId });
  const [createMessage] = useCreateMessage(chatId);
  const { data: messages, subscribeToMore } = useGetMessages({ chatId });
  const divRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const scrollToBottom = () => divRef.current?.scrollIntoView();

  useEffect(() => {
    setMessage("");
    scrollToBottom();
  }, [location, messages]);

  useEffect(() => {
    let unsubscribe: () => void;
    if (chatId) {
      unsubscribe = subscribeToMore({
        document: messageAddedDocument as any,
        variables: { chatId },
        updateQuery: (prev: any, { subscriptionData }: any) => {
          if (!subscriptionData.data) return prev;
          const newMessage = (subscriptionData.data as any).messageAdded;
          if (prev.messages.some((m: any) => m._id === newMessage._id)) return prev;
          return Object.assign({}, prev, {
            messages: [...prev.messages, newMessage],
          });
        },
      });
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [chatId, subscribeToMore]);

  const handleCreateMessage = async () => {
    await createMessage({
      variables: {
        createMessageInput: {
          content: message,
          chatId,
        },
      },
    });
    setMessage("");
    scrollToBottom();
  };

  return (
    <Stack sx={{ height: "100%", justifyContent: "space-between" }}>
      <h1>{data?.chat.name}</h1>
      <Box sx={{ maxHeight: "70vh", overflow: "auto" }}>
        {messages?.messages.map((message: any) => (
          <Grid container alignItems="center" marginBottom="1rem">
            <Grid size={1}>
              <Avatar src="" sx={{ width: 52, height: 52 }} />
            </Grid>
            <Grid size={11}>
              <Stack>
                <Paper sx={{ width: "fit-content" }}>
                  <Typography sx={{ padding: "0.9rem" }}>
                    {message.content}
                  </Typography>
                </Paper>
                <Typography variant="caption" sx={{ marginLeft: "0.25rem" }}>
                  {new Date(message.createdAt).toLocaleTimeString()}
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        ))}
        <div ref={divRef}></div>
      </Box>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, width: "100%" }}
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          placeholder="Message"
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              await handleCreateMessage();
            }
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          onClick={handleCreateMessage}
          color="primary"
          sx={{ p: "10px" }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
