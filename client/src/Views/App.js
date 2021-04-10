import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'assets/styles/GlobalStyle';
import { theme } from 'assets/styles/theme';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import RegisterView from './RegisterView';
import LoginView from './LoginView';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Route path="/" exact>
          <LoginView />
        </Route>
        <Route path="/register">
          <RegisterView />
        </Route>
      </ThemeProvider>
    </Router>
  );
}

export default App;
