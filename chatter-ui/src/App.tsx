import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { RouterProvider } from "react-router-dom";
import Router from "./components/routes";
import { ApolloProvider } from "@apollo/client";
import client from "./constants/apollo-client";
import Guard from "./components/auth/guard";
import Header from "./components/header/header";
import Snackbar from "./components/snackbar/snackbar";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Container>
          <Guard>
            <RouterProvider router={Router} />
          </Guard>
        </Container>
        <Snackbar />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
