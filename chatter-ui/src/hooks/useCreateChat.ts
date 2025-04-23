import { graphql } from "../gql";
import { useMutation } from "@apollo/client";

const createChatDocument = graphql(`
  mutation CreateChat($createChatInput: CreateChatInput!) {
    createChat(createChatInput: $createChatInput) {
      _id
      userId
      isPrivate
      userIds
      name
    }
  }
`);

const useCreateChat = () => {
  return useMutation(createChatDocument);
};

export { useCreateChat };
