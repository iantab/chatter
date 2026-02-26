import { graphql } from "../gql";

export const messageAddedDocument = graphql(`
  subscription MessageAdded($chatId: String!) {
    messageAdded(chatId: $chatId) {
      ...MessageFragment
    }
  }
`);
