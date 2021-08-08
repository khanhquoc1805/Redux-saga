import { makeStyles,Paper,Typography,Box, Button, CircularProgress } from '@material-ui/core'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { authActions } from '../authSlice';


const useStyle = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
    },
    paper : {
        padding: theme.spacing(3),
    }
}) )


export default function LoginPage(){

    const classes = useStyle();
    const dispatch = useAppDispatch(); 
    const isLoggedIn = useAppSelector(state => state.auth.logging)

    const handelLoginClick = () => {
        dispatch(authActions.login({
            username: '',
            password: '',
        }))
    }
    return (
        <div className={classes.root}>
            <Paper elevation={2} className={classes.paper}>
                <Typography variant="h5" component="h1">
                    Student Management
                </Typography>
                <Box mt={4}>
                    <Button variant="contained" color="secondary" fullWidth onClick={handelLoginClick}>
                   {isLoggedIn && <CircularProgress size={20} color="primary"/>} &nbsp; Fake Login
                    </Button>
                </Box>
            </Paper>
        </div>
    )
}
