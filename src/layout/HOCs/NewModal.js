import React, { useContext, useState } from 'react'
import { Fab, Grid, Modal, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { PlayerContext } from '../../store/PlayerContext';
import Joycons from '../../imgs/Joycons.png'
import Gamecube from '../../imgs/Gamecube.png'
import SwitchPro from '../../imgs/SwitchPro.png'
import Snes from '../../imgs/Snes.png'
//import { useSpring, animated } from 'react-spring/web.cjs';

function rand() {
    return Math.round(Math.random() * 20) - 10;
    }
    
    function getModalStyle() {
        const top = 50 + rand();
        const left = 50 + rand();
    
        return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
        };
    }

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        },
    }));

const NewModal = ( props ) => {
    const [players, setPlayers] = useContext( PlayerContext )
    const [newPlayer, setNewPlayer ] = useState({'name': '', 'locked': false})
    const [error, setError] = useState(false)

    const icons = [Joycons, Gamecube, SwitchPro, Snes]
    const randomIcon = icons[Math.floor(Math.random() * icons.length)]

    const classes = useStyles()
    const [modalStyle] = useState(getModalStyle);

    const addNewPlayerToQueue = (e) => {
        e.preventDefault()
        if ( newPlayer === ''){
            setError(true)
        } else if (players.current.length < players.total){
            setPlayers(prevPlayers => ({
                ...prevPlayers,
                current: [...prevPlayers.current, newPlayer],
            }))
        setError(false)
            } else {
            setPlayers(prevPlayers => ({
                ...prevPlayers,
                inLine: [...prevPlayers.inLine, newPlayer],
            }))
        setError(false)
        }
        //console.log(players.current)
    setNewPlayer(prevPlayer => ({...prevPlayer, 'name': ''}))
    
    }


    return (
        <Modal
        open={ props.isOpen }
        onClose={ props.openToggle }
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        > 
            <form style={modalStyle} className={classes.paper} onSubmit={ addNewPlayerToQueue }>
                <Grid container spacing={2} justifyContent='center'>
                    <Grid item xs={9}>
                        <TextField 
                            id="outlined-basic" 
                            label="New Player" 
                            variant="outlined" 
                            fullWidth
                            value={newPlayer.name}
                            onChange={(e) => setNewPlayer(oldName => ({...oldName, 'name': e.target.value.toUpperCase(), 'icon': randomIcon}))}
                            error={error}
                            />
                    </Grid>
                    <Grid item >
                        <Fab color="secondary" onClick={ addNewPlayerToQueue }>
                            <AddIcon />
                        </Fab>
                    </Grid>
                </Grid>
            </form>
        </Modal>
    )
}

export default NewModal
