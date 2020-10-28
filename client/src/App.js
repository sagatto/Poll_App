import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { ApolloProvider } from "@apollo/react-hooks";
// import ApolloClient from "apollo-boost";
import {
  ThemeProvider,
  theme,
  ColorModeProvider,
  CSSReset
} from '@chakra-ui/core';


import ThemeToggler from './components/ThemeToggler';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ViewQuestions from './pages/ViewQuestions';
import CreateQuestion from './pages/CreateQuestion';


export default function App() {
  return (
    <Router>
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
    </Router>
  );
}

// export default App;
