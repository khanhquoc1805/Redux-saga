import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';


export function PrivateRoute(props: RouteProps) {
  const idLoggedIn = Boolean(localStorage.getItem('access_token'));
  if (!idLoggedIn) return <Redirect to="/login" />;
  return <Route {...props} />;
}
