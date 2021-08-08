import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import { Header,SideBar } from '../Common'

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRow: 'auto 1fr',
    gridTemplateColumns: '300px 1fr',
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
  },
}));

export function Admin() {
  const classes = useStyle();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}><Header></Header></Box>
      <Box className={classes.sidebar}><SideBar></SideBar></Box>
      <Box className={classes.main}>Main</Box>
    </Box>
  );
}
