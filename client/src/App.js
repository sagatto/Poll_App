import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost-upload";
import { StoreProvider } from "./utils/GlobalState";
import ThemeToggler from "./components/ThemeToggler";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ViewQuestions from "./pages/ViewQuestions";
import CreateQuestion from "./pages/CreateQuestion";
import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset,
} from "@chakra-ui/core";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");
    console.log("token app.js", token)
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "http://localhost:3001/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <StoreProvider>
          <ThemeProvider theme={theme}>
            <ColorModeProvider>
              <CSSReset />
              <ThemeToggler />
              <Route exact path="/" component={ViewQuestions} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/createquestion" component={CreateQuestion} />
            </ColorModeProvider>
          </ThemeProvider>
        </StoreProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
