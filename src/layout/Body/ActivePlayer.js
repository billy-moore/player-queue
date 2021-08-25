import React, { useContext } from "react";
import {Button, Grid, Paper} from '@material-ui/core'
import { PlayerContext } from "../../store/PlayerContext";
import LockIcon from '@material-ui/icons/Lock';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  nameSpace: {
    fontFamily: 'Bangers, cursive',
    fontSize: '5rem',
    padding: '.8rem',
    boxSizing: 'border-box',
    background: '#37474f',
    color: '#ffffff',
  },
  image: {
    height: '8rem',
    minHeight: '3rem',
  },
  logo:{

  },
  //red
  tier0: {
    padding: '.5rem',
    backgroundColor: 'rgb(194,24,91)',
    background: 'linear-gradient(90deg, rgba(194,24,91,1) 0%, rgba(216,27,96,1) 35%, rgba(240,98,146,1) 100%)',
  },
  //Orange
  tier1: {
    padding: '.5rem',
    backgroundColor: 'rgb(255,143,0)',
    background: 'linear-gradient(90deg, rgba(255,143,0,1) 0%, rgba(255,160,0,1) 35%, rgba(255,193,7,1) 100%)',
  },
  //Yellow
  tier2: {
    padding: '.5rem',
    backgroundColor: 'rgb(253,216,53)',
    background: 'linear-gradient(90deg, rgba(253,216,53,1) 0%, rgba(255,238,88,1) 35%, rgba(255,249,196,1) 100%)',
  },
  //Green
  tier3: {
    padding: '.5rem',
    backgroundColor: 'rgb(76,175,80)',
    background: 'linear-gradient(90deg, rgba(76,175,80,1) 0%, rgba(102,187,106,1) 35%, rgba(129,199,132,1) 100%)',
  },
  //blue
  tier4: {
    padding: '.5rem',
    backgroundColor: 'rgb(3,155,229)',
    background: 'linear-gradient(90deg, rgba(3,155,229,1) 0%, rgba(41,182,246,1) 35%, rgba(79,195,247,1) 100%)',
  },
  //darkBlue
  tier5: {
    padding: '.5rem',
    backgroundColor: 'rgb(48,63,159)',
    background: 'linear-gradient(90deg, rgba(48,63,159,1) 0%, rgba(63,81,181,1) 35%, rgba(92,107,192,1) 100%)',
  },
  //Purple
  tier6: {
    padding: '.5rem',
    backgroundColor: 'rgb(81,45,168)',
    background: 'linear-gradient(90deg, rgba(81,45,168,1) 0%, rgba(103,58,183,1) 35%, rgba(126,87,194,1) 100%)',
  },
  //black
  tier7: {
    padding: '.5rem',
    backgroundColor: 'rgb(66,66,66)',
    background: 'linear-gradient(90deg, rgba(66,66,66,1) 0%, rgba(117,117,117,1) 35%, rgba(158,158,158,1) 100%)',
  }
});

const ActivePlayer = (props) => {
  const classes = useStyles()
  const [players, setPlayers] = useContext( PlayerContext )

  const deletePlayerHandler = (e, index, name) => {
    players.current.splice(index, 1)

    setPlayers(prevPlayer => ({
      ...prevPlayer
    }))

    if( players.inLine.length > 0){
      const nextLine = players.inLine.shift()
      setPlayers(prevPlayer => ({
        ...prevPlayer,
        current: [...prevPlayer.current, nextLine]
      }))
    }
  }

const lockNameHandler = (e, index, name, isLocked) => {
  
  if (!isLocked){
    players.current[index].locked = true

    setPlayers(prevPlayers => ({
      ...prevPlayers,
      locked: [...prevPlayers.locked, prevPlayers.current[index]]
    }))

  } else {
    players.current[index].locked = false

    const playerIndex = players.locked.findIndex(player => player === name)
    players.locked.splice(playerIndex, 1)

    setPlayers(prevPlayer => ({
      ...prevPlayer
    }))
}}

  const tierList = [classes.tier0, classes.tier1, classes.tier2, classes.tier3, classes.tier4, classes.tier5, classes.tier6, classes.tier7]
  
  return (
    <Grid item xs={12} >
        <Paper>
          <Grid container direction='row' justifyContent='center' alignItems='center' className={tierList[props.id]} >
            <Grid item xs={4} className={classes.logo} onClick={(e) => lockNameHandler(e, props.id, props.name, props.isLocked)}>
              <img src={props.icon} alt="player logo" className={classes.image} />
            </Grid>
            <Grid item xs={6} onClick={(e) => lockNameHandler(e, props.id, props.name, props.isLocked)} >
              <Paper className={classes.nameSpace}>
                {props.name}
              </Paper>
            </Grid>
            {props.isLocked ? <Grid item xs={2} className={classes.button} onClick={(e) => lockNameHandler(e, props.id, props.name, props.isLocked)}>
              <Button variant='contained' size='small' onClick={(e) => lockNameHandler(e, props.id, props.name, props.isLocked)}>{<LockIcon />}Unlock</Button>
              </Grid>
              : <Grid item xs={2} className={classes.button} >
                  <Button variant='contained' color='secondary' size='small' onClick={(e) => deletePlayerHandler(e, props.id, props.name)}><HighlightOffIcon />Delete</Button>
                </Grid>
          }
          </Grid>
        </Paper>
    </Grid>
  )
}

export default ActivePlayer;
