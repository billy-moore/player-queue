import React, { useContext } from "react";
import clsx from 'clsx'
import { PlayerContext } from "../../store/PlayerContext";

import {AppBar, Toolbar, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  // appBar: {
  //   transition: theme.transitions.create(['margin', 'width'], {
  //     easing: theme.transitions.easing.sharp,
  //     duration: theme.transitions.duration.leavingScreen,
  //   }),
  // },
  title: {
    flexGrow: 1,
  },
}));

const Header = ( props ) => {
  const [players] = useContext(PlayerContext);

  const classes = useStyles();

  

  return (
    <AppBar
        position="fixed"
        // className={clsx(classes.appBar, {
        //   [classes.appBarShift]: props.isOpen,
        // })}
      >
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Playing: {players.current.length !== undefined ? players.current.length : 0}
          </Typography>
          <Typography variant="h6" noWrap className={classes.title}>
            In Line: {players.inLine.length !== undefined ? players.inLine.length : 0}
          </Typography>
          <Typography variant="h6" noWrap className={classes.title}>
            Locked: {players.locked.length !== undefined ? players.locked.length : 0}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={props.openToggle}
            className={clsx(props.isOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
  );
};

export default Header;
