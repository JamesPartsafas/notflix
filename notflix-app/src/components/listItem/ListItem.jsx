import './listItem.scss'
import PosterImage from './PosterImage'
import FilmCard from '../../components/filmCard/FilmCard'
import { useState } from 'react'

const ListItem = ({ movie }) => {
    
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false);
    }

    return (
            <div className="listItem">
                <div className="imageHolder" >
                    <div onClick={() => setOpen(true)}>
                        <PosterImage image={movie.img} />
                    </div>
                    <FilmCard open={open} handleClose={handleClose} movie={movie} />
                </div>
            </div>
    )
}

export default ListItem
