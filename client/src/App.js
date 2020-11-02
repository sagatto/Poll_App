import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import ThemeToggler from "./components/ThemeToggler";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ViewQuestions from "./pages/ViewQuestions";
import CreateQuestion from "./pages/CreateQuestion";
import Auth from "./utils/auth";
import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset,
} from "@chakra-ui/core";

const client = new ApolloClient({
  request: (operation) => {
    const token = localStorage.getItem("id_token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
  uri: "/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <ThemeProvider theme={theme}>
          <ColorModeProvider>
            <CSSReset />
            <ThemeToggler />
            {/* Homepage redirection based on login status  */}
            {Auth.loggedIn() ? (
              <Route exact path="/" component={ViewQuestions} />
            ) : (
              <Route exact path="/" component={Login} />
            )}
            {/* Signup redirection based on login status  */}
            {Auth.loggedIn() ? (
              <Route exact path="/signup" component={ViewQuestions} />
            ) : (
              <Route exact path="/signup" component={Signup} />
            )}
            <Route exact path="/dory" component={ViewQuestions} />
            <Route exact path="/createquestion" component={CreateQuestion} />
          </ColorModeProvider>
        </ThemeProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
