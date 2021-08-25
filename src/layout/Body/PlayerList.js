import { Toolbar, Grid } from "@material-ui/core";
import React, {Fragment, useContext } from "react";
import { PlayerContext } from "../../store/PlayerContext";
import ActivePlayer from "./ActivePlayer";


const PlayerList = ( props ) => {
  const [players] = useContext( PlayerContext );
  
  
  return (
    <Fragment>
      <Toolbar />
      <Grid container spacing={1} style={{
        margin: '.2rem',
        overflow: 'scroll',
      // width: '80%',
      // justifySelf: 'center'
      }}>
        {players.current.length === 0 && !props.modalOpen && <Grid item container justifyContent='center' alignContent='center'><h2>Let's get this party started!</h2></Grid>}
        {players.current === undefined ? <h2>No Players, Yet</h2> : players.current.map((player, index) => (
          <ActivePlayer name={player.name} isLocked={player.locked} key={index} id={index} icon={player.icon} />
        ))}
      </Grid>
    </Fragment>
    
  );
};

export default PlayerList;
