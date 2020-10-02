import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

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

const logout = (e) => {
  localStorage.removeItem("token")
  window.location.reload(false)
}

export default function NavBar(props) {
  const classes = useStyles();
  const [anchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  return (
    <div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                </IconButton>
              <Typography variant="h6" className={classes.title}>
                  <Button href="/" color="inherit" >
                    <h3>
                    RemoteEDU
                    </h3>
                  </Button>
              {props.user ? <NavLink to="/users/courses" style={{"color": "white", "textDecoration": "none"}} >Dashboard</NavLink> : null}
              </Typography>
              {props.user ? <Button onClick={logout} color="inherit">Logout</Button> : <Button href="/login" color="inherit">Login</Button>}
              {props.user ? null : <Button href="/signup" color="inherit">Signup</Button>}
            <div>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}>
                </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}