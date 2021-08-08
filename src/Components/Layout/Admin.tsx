import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { Header, SideBar } from '../Common';
import { Switch, Route } from 'react-router-dom';
import DashBoard from '../../features/dashboard/DashBoard';
import Students from '../../features/student/Students';
const useStyle = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '240px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,
    height: '100vh',
  },
  header: {
    gridArea: 'header',
  },

  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    gridArea: 'main',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 3),
  },
}));

export function Admin() {
  const classes = useStyle();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header></Header>
      </Box>
      <Box className={classes.sidebar}>
        <SideBar></SideBar>
      </Box>
      <Box className={classes.main}>
        <Switch>
          <Route path="/admin/dashboard">
            <DashBoard />
          </Route>
          <Route path="/admin/students">
            <Students />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}
