import './listItem.scss'
import { PlayArrow, Add, ThumbUpAltOutlined, ThumbDownOutlined } from '@material-ui/icons'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ListItem = ({ index, item }) => {

    const [isHovered, setIsHovered] = useState(false)
    const [movie, setMovie] = useState({})

    useEffect(() => {
        const getMovie = async () => {
            try {
                const retrievedMovie = await axios.get(`movies/find/${item}`,
                    {
                        headers: {
                            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjkyMDk1YzFhZjcyZDQ1NzIzNmU2OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMDA5NjMxMywiZXhwIjoxNjMwNTI4MzEzfQ.4N5UTxRt0e0I7zqMAo0PmG707D8WroU9qaOXNU6GUbw'
                        }
                    }
                )
                setMovie(retrievedMovie.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        getMovie()
    }, [item])

    return (
        <Link to={{ pathname: "/watch", movie: movie }}>
            <div 
                className="listItem" 
                style={{left: isHovered && index * 225 -50 + index * 2.5}}
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
            >
                <img src={movie.img} alt="Poster" />
                {isHovered && (
                    <>
                        <video src={movie.trailer} autoPlay={true} loop />
                        <div className="itemInfo">
                            <div className="icons">
                                <PlayArrow className="icon" />
                                <Add className="icon" />
                                <ThumbUpAltOutlined className="icon" />
                                <ThumbDownOutlined className="icon" />
                            </div>
                            <div className="itemInfoTop">
                                {/* The duration is not currently saved */}
                                <span>{movie.duration}</span>
                                <span className="limit">+{movie.limit}</span>
                                <span>{movie.year}</span>
                            </div>
                            <div className="desc">
                                {movie.description}
                            </div>
                            <div className="genre">{movie.genre}</div>
                        </div>
                    </>
                )}
            </div>
        </Link>
    )
}

export default ListItem
