import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Slide from '@material-ui/core/Slide'
import CloseIcon from '@material-ui/icons/Close'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { AuthContext } from '../../authContext/authContext'
import axios from 'axios'
import './filmCard.scss'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const FilmCard = ({ open, handleClose, movie }) => {
  
  const {user} = useContext(AuthContext)

  const [isHovered, setIsHovered] = useState(false)
  const [isInMyList, setIsInMyList] = useState(user.favorites && user.favorites.includes(movie._id))

  //Handle adding or removing from favorites list
  const handleMyList = async () => {
    const currentUser = JSON.parse(localStorage.getItem('user')) || null
    if (isInMyList) {
      const index = currentUser.favorites.indexOf(movie._id)
      if (index > -1) {
        currentUser.favorites.splice(index, 1) //Remove the id
      }
    }
    else {
      currentUser.favorites.push(movie._id)
    }

    //Update local storage
    localStorage.setItem('user', JSON.stringify(currentUser))
        
    setIsInMyList(prev => !prev)

    //Save to database
    try {
      await axios.put(`${process.env.REACT_APP_PROXY}users/${currentUser._id}`, {favorites: currentUser.favorites},
      {
          headers: {
              token: `Bearer ${currentUser.accessToken}`
          }
      })
    }
    catch (err) {
      console.log(err)
    }
  }

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
                <Link to={{ pathname: "/watch", movie: movie }}>
                  <div 
                    className="imageHolder" 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <img src={movie.img} alt={`${movie.title} Poster`} />
                    {isHovered ? 
                      <PlayCircleFilledIcon className="playIcon" /> :
                      <PlayCircleOutlineIcon className="playIcon" />
                    }
                  </div>
                </Link>
                <button onClick={handleMyList}><AddCircleOutlineIcon className='addIcon' /> {isInMyList ? 'Remove from list' : 'Add to list'}</button>
                <h2>{movie.title}</h2>
                <p className="description">{movie.description}</p>
                <p className="moreInfo"><span>{movie.isSeries ? 'Series Score: ' : 'Movie Score: '}</span>{movie.rating === 'N/A' ? 'N/A' : `${movie.rating} / 100`}</p>
                <p className="moreInfo"><span>Genre:</span> {movie.genre}</p>
                <p className="moreInfo"><span>Release Year:</span> {movie.year}</p>
                <p className="moreInfo"><span>Rated:</span> {movie.limit}</p>
            </div>
        </DialogContent>
      </Dialog>
  )
}

export default FilmCard
