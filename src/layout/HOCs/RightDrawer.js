import React, { useContext, useEffect } from 'react'

import { PlayerContext } from '../../store/PlayerContext';

import { makeStyles } from '@material-ui/core/styles';
import { ButtonGroup, Button, Divider, Drawer as MUIDrawer, ListItem, Paper, ListItemIcon, ListItemText, IconButton, Typography} from '@material-ui/core'

import GamepadIcon from '@material-ui/icons/Gamepad';
import DeleteIcon from '@material-ui/icons/Delete';

    const useStyles = makeStyles({
        list: {
            width: 0,
            margin: '.3rem',
            //backgroundColor: '#616161',
            //color: '#ffffff'
        },
        listItem: {
            justifyContent: 'start',

        },
        buttonGroup: {
            display: 'flex',
            flexGrow: 1
        }
    });

const RightDrawer = (props) => {
    const [players, setPlayers] = useContext(PlayerContext)
    const classes = useStyles();
    //const [controllers, setControllers] = useState(players.total)

    const deleteLineHandler = (e, index) => {
        players.inLine.splice(index, 1)
        setPlayers(prevPlayer => ({
            ...prevPlayer,
            inLine: [...prevPlayer.inLine]
        }))
    }

    const removeControllerHandler = () => {
        setPlayers(prevPlayer => ({
            ...prevPlayer,
            total: (players.total - 1)
        }))
    }

    useEffect(() => {
        if( players.current.length > players.total ){
            const giveItUp = players.current.pop()
            players.inLine.unshift(giveItUp)
            
            setPlayers(prevPlayer => ({
                ...prevPlayer
            }))
        }
    }, [players, setPlayers])

    const addControllerHandler = () => {
        setPlayers(prevPlayer => ({
            ...prevPlayer,
            total: (players.total + 1)
        }))
    }

    useEffect(() => {
        if(players.total > players.current.length && players.inLine.length >= 1){
            const getInThere = players.inLine.shift()
        
            players.current.push(getInThere)
            console.log(players.current)
            setPlayers(prevPlayer => ({
                ...prevPlayer
            }))
        }
    }, [players, setPlayers])


    return (
        <MUIDrawer
            open = { props.isOpen }
            className={classes.list}
            onClose = { props.openToggle }
            anchor='right'
        >
            {players.inLine.map((player, index) => (
        
                <Paper key={index} className={classes.list} style={{background: '#616161', width: '300px',}}>
                    
                    <ListItem >
                        <ListItemIcon>
                            <GamepadIcon />
                        </ListItemIcon>
                        <ListItemText style={{fontSize: '.7rem'}}>
                            <h3>{player.name}</h3>
                        </ListItemText>
                        <IconButton style={{backgroundColor: '#212121'}} onClick={(e) => deleteLineHandler(e, index)}>
                            <DeleteIcon style={{color: '#ffffff'}}/>
                        </IconButton>
                    </ListItem>

                </Paper>
            ))}
            <Divider />
            <Divider />
            {/* <Grid container direction='row' style={{paddingTop: '10px', width: '100%'}}> */}
                {/* <Grid item xs={12} > */}
                    <Typography variant='h5' style={{textAlign: 'center'}}>
                        # of Controllers
                    </Typography>
                    <Typography variant='h5' style={{textAlign: 'center'}}>
                        {players.total}
                    </Typography>
                    <ListItem style={{justifyContent: 'center', width: '300px'`}}>
                        <ButtonGroup variant='contained' color='primary'>
                            <Button
                                disabled={players.total === 2}
                                onClick={removeControllerHandler}
                            >Remove</Button>
                            <Button
                                disabled={players.total === 8}
                                onClick={addControllerHandler}
                            >Add</Button>
                        </ButtonGroup>
                    </ListItem>
                    {players.total === 2 && <ListItem style={{justifyContent: 'center'}}>
                        <Typography variant='h6' style={{color: 'red'}}>
                            Can't remove any <br></br> more controllers
                        </Typography>
                    </ListItem>}
                    {players.total === 8 && <ListItem style={{justifyContent: 'center'}}>
                        <Typography variant='h6' style={{color: 'red'}}>
                            Can't add any <br></br> more controllers
                        </Typography>
                    </ListItem>}

            
        </MUIDrawer>
    )
}

export default RightDrawer
