import React, { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory,Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { logout } from '../../../redux/actions/user';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const {user} = useSelector(state => state)

    const [auth,setAuth] = useState({
      user:'',
      isAuth: false
    });

    const handleLogout = () => {
      dispatch(logout());
      history.push('/');
    }

    useEffect(() => {
      if(localStorage.getItem('token')){
        setAuth({
          ...auth,
          user:localStorage.getItem('user'),
          isAuth: true
        })
      }
    },[user]);


    return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                News
              </Typography>
              <Typography variant="h6">
                {localStorage.getItem('user')}
              </Typography>
              {localStorage.getItem('token') ? 
                <Button color="inherit" onClick={() => handleLogout()}>Logout</Button>
              :
              <Button color="inherit" component={Link} to="/signup">Sign up</Button>
              }
            </Toolbar>
          </AppBar>
        </div>
    );
}

export default Header;