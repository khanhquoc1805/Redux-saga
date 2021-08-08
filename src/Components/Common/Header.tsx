import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { authActions } from '../../features/auth/authSlice';
import { useAppDispatch } from '../../app/hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  }),
);

export function Header() {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const handleLogOutClick = () => {
    dispatch(authActions.logout());
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Student Management
          </Typography>
          <Button color="inherit" onClick={handleLogOutClick}>Log Out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

