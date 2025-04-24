import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { ListItemButton } from "@mui/material";
import router from "../../routes";
import { Chat } from "../../../gql/graphql";

interface ChatListProps {
  chat: Chat;
}

const ChatListItem = ({ chat }: ChatListProps) => {
  return (
    <>
      <ListItem alignItems="flex-start" disablePadding={true}>
        <ListItemButton onClick={() => router.navigate(`/chats/${chat._id}`)}>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={chat.name}
            secondary={
              <>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: "text.primary", display: "inline" }}
                >
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </>
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default ChatListItem;
