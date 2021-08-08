import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './features/auth/pages/LoginPage';
import { Admin } from './Components/Layout';
import { NotFound, PrivateRoute } from './Components/Common';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/admin">
          <Admin />
        </PrivateRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
