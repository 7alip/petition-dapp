import React, { createContext } from 'react';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import theme from './theme';

import useWeb3 from './ethereum/useWeb3';

import Me from './pages/me';
import Auth from './pages/auth';
import Home from './pages/home';
import PetitionPage from './pages/petitions';
import Layout from './components/layout/Layout';
import CreatePetition from './components/petition/CreatePetition';

export const AuthContext = createContext(null);

function App() {
  let { web3, account, error, contractInstance } = useWeb3();

  const PrivateRoute = ({ children, ...rest }) => (
    <Route
      {...rest}
      render={({ location }) =>
        account ? (
          children
        ) : (
          <Redirect to={{ pathname: 'auth', state: { from: location } }} />
        )
      }
    />
  );

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={{ account, web3, contractInstance, error }}>
        <CSSReset />
        {!web3 || error ? (
          <Auth isPage />
        ) : (
          <Router>
            <Layout>
              <Switch>
                <PrivateRoute path="/me">
                  <Me />
                </PrivateRoute>
                <PrivateRoute path="/start">
                  <CreatePetition />
                </PrivateRoute>
                <Route path="/petitions" component={PetitionPage} />
                <Route path="/auth" component={Auth} />
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </Layout>
          </Router>
        )}
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
