import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'assets/styles/GlobalStyle';
import { theme } from 'assets/styles/theme';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import RegisterView from './RegisterView';
import LoginView from './LoginView';

import { selectUserToken } from '../features/appSlice';
import { useSelector } from 'react-redux';
import HomePage from './HomePage';

function App() {
  const userToken = useSelector(selectUserToken);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Switch>
          <Route path="/" exact>
            <LoginView />
          </Route>
          <Route path="/register">
            <RegisterView />
          </Route>
          <Route path="/homepage">
            <HomePage />
          </Route>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
