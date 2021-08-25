import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
      },
}))

const AddButton = ( props ) => {
    const classes = useStyles()

    return (
        <Fab color="secondary" aria-label="add" className={classes.fabButton} onClick={ props.fabclick }>
            <AddIcon />
          </Fab>
    )
}

export default AddButton
