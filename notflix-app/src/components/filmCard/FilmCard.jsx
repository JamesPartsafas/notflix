import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Slide from '@material-ui/core/Slide'
import './filmCard.scss'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const FilmCard = ({ open, handleClose, movie }) => {

  return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        scroll='body'
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent className="DialogContent" style={{backgroundColor: '#181818'}}>
            <div className="filmCard">
                <h2>{movie.title}</h2>
            </div>
        </DialogContent>
      </Dialog>
  );
}

export default FilmCard

{/* <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
            <DialogContent style={{backgroundColor: 'red'}}>
            <DialogContentText id="alert-dialog-slide-description">
                {movie.description}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => handleClose()} color="primary">
                Disagree
            </Button>
            <Button onClick={handleClose} color="primary">
                Agree
            </Button>
            </DialogActions> */}