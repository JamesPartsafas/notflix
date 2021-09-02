import './listItem.scss'
import { PlayArrow, Add, ThumbUpAltOutlined, ThumbDownOutlined } from '@material-ui/icons'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import MyImage from './MyImage'
import useWindowDimensions from '../../hooks/useWindowDimensions'

const ListItem = ({ index, movie }) => {

    const [isHovered, setIsHovered] = useState(false)
    //const [movie, setMovie] = useState({})

    const { height, width } = useWindowDimensions();

    // useEffect(() => {
    //     const getMovie = async () => {
    //         try {
    //             const retrievedMovie = await axios.get(`movies/find/${item}`,
    //                 {
    //                     headers: {
    //                         token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
    //                     }
    //                 }
    //             )
    //             setMovie(retrievedMovie.data)
    //         }
    //         catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     getMovie()
    // }, [item])

    return (
        <Link to={{ pathname: "/watch", movie: movie }}>
            <div 
                className="listItem" 
                style={width > 1000 ? {left: isHovered && index * 400  + index * 7.5} : {left: isHovered && index * 400 -50 + index * 2.5}}
                onMouseEnter={() => setIsHovered(true)} 
                onMouseLeave={() => setIsHovered(false)}
            >   
                <MyImage image={movie.img} />
                {isHovered && (
                    <>
                        {/* <video src={movie.trailer} autoPlay={true} loop /> */}
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
