import React, {useEffect } from 'react';
import { Switch, useRouteMatch, Route } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { cityActions } from '../city/citySlice';
import AddEditPage from './pages/AddEditPage';
import ListPage from './pages/ListPage';



export default function Students() {
  const match = useRouteMatch();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cityActions.fetchCityList());
   
  }, [dispatch])
  return (
    <Switch>
      <Route path={match.path} exact>
        <ListPage />
      </Route>
      <Route path={`${match.path}/add`}>
        <AddEditPage />
      </Route>
      <Route path={`${match.path}/:studentId`}>
        <AddEditPage />
      </Route>
    </Switch>
  );
}
