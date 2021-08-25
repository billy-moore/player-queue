import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { PlayerContext } from '../../store/PlayerContext';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import RestoreIcon from '@material-ui/icons/Restore';
import { Button, Grid } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        padding: '10px'
    },
});

export default function SimpleBottomNavigation( props ) {
    const classes = useStyles();
    const [players, setPlayers] = useContext( PlayerContext )
    
    const resetListHandler = () => {
        setPlayers(prevPlayer => ({
            ...prevPlayer,
            current: [],
            inLine: [],
            locked: [],
        }))
    }

    const newGameHandler = () => {
        const openSpaces = players.total - players.locked.length
        const nextInLine = players.inLine.splice(0, openSpaces)
        
        setPlayers(prevPlayer => ({
            ...prevPlayer,
            current: prevPlayer.locked.concat(nextInLine)
        }))
    }

    return (
        // <BottomNavigation
        //     style={{paddingTop: '10px'}}
        //     value={value}
        //     onChange={(event, newValue) => {
        //         setValue(newValue);
        //     }}
        //     className={classes.root}
        //     showlabel
        // >
        <Grid container spacing={1} justifyContent='center' className={classes.root}>
            <Grid item>
                <Button
                    variant='contained'
                    color='primary'
                    size='large'
                    disabled={players.current.length === 0}
                    label="Reset List" 
                    startIcon={<RestoreIcon />} 
                    onClick={resetListHandler}
                    
                    >Reset List</Button>
            </Grid>
            <Grid item>
                {!props.modalOpen && 

                    <Button 
                        variant='contained'
                        color='secondary'
                        size='large' 
                        label="Add Player" 
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={ props.newName }
                        >
                            Add Player
                    </Button>
            }
            </Grid>
            <Grid item>
                    <Button 
                        variant='contained'
                        color='primary'
                        size='large'
                        disabled={players.inLine.length < 1}
                        label="New Game" 
                        startIcon={<VideogameAssetIcon />}
                        onClick={newGameHandler}
                        >
                            New Game
                    </Button>
            </Grid>
        </Grid>
        //</BottomNavigation>
    );
}