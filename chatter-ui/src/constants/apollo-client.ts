import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { API_URL } from "./urls";
import { onError } from "@apollo/client/link/error";
import excludedRoutes from "./excluded-routes";
import { onLogout } from "../utils/onLogout";

const logoutLink = onError((error) => {
  if (
    error.graphQLErrors?.length &&
    (error.graphQLErrors[0].extensions?.originalError as any)?.statusCode ===
      401
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      onLogout();
    }
  }
});

const httpLink = new HttpLink({ uri: `${API_URL}/graphql` });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(httpLink),
});

export default client;
