import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Slide from '@material-ui/core/Slide'
import PosterImage from '../listItem/PosterImage'
import CloseIcon from '@material-ui/icons/Close'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import './filmCard.scss'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const FilmCard = ({ open, handleClose, movie }) => {

  const [isHovered, setIsHovered] = useState(false)

  return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        scroll='body'
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        className="Dialog"
      >
        <DialogContent className="DialogContent" style={{backgroundColor: '#181818', border: "2px solid white"}}>
            <div className="filmCard">
                <div className="closeCard"><CloseIcon className="xIcon" onClick={() => handleClose()} /></div>
                <Link to={{ pathname: "/watch", movie: movie }}><div 
                  className="imageHolder" 
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <PosterImage image={movie.img} />
                  {isHovered ? 
                    <PlayCircleFilledIcon className="playIcon" /> :
                    <PlayCircleOutlineIcon className="playIcon" />
                  }
                </div></Link>
                <h2>{movie.title}</h2>
                <p className="description">{movie.description}</p>
                <p className="moreInfo"><span>{movie.isSeries ? 'Series Score: ' : 'Movie Score: '}</span>{movie.rating === 'N/A' ? 'N/A' : `${movie.rating} / 100`}</p>
                <p className="moreInfo"><span>Genre:</span> {movie.genre}</p>
                <p className="moreInfo"><span>Release Year:</span> {movie.year}</p>
                <p className="moreInfo"><span>Rated:</span> {movie.limit}</p>
            </div>
        </DialogContent>
      </Dialog>
  );
}

export default FilmCard
