import './featured.scss'
import { InfoOutlined, PlayArrow } from '@material-ui/icons'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import FilmCard from '../filmCard/FilmCard'
import axios from 'axios'

const Featured = ({ type }) => {

    const [content, setContent] = useState({})
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        const getRandomFeatured = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_PROXY}movies/random?type=${type}`,
                    {
                        headers: {
                            token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
                        }
                    }
                )
                const data = res.data
                setContent(data[Math.floor(Math.random()*data.length)]) //Choose random item from array
            }
            catch (err) {
                console.log(err)
            }
        }
        getRandomFeatured()
    }, [type])

    return (
        <div className="featured">
            <img src={content.img} alt="" /> {/* Background image */}
            <div className="info">
                <h2>{content.title}</h2>
                <span className="desc">{content.description}</span>
                <span className="descInfo"><span className="descriptor">{content.isSeries ? 'Series Score: ' : 'Movie Score: '}</span>{content.rating === 'N/A' ? 'N/A' : `${content.rating} / 100`}</span>
                <span className="descInfo"><span className="descriptor">Genre:</span> {content.genre}</span>
                <span className="descInfo"><span className="descriptor">Release Year:</span> {content.year}</span>
                <span className="descInfo"><span className="descriptor">Rated:</span> {content.limit}</span>
                <div className="buttons">
                    <Link to={{ pathname: "/watch", movie: content }} style={{ textDecoration: 'none' }}>
                        <button className="play">
                            <PlayArrow />
                            <span>Play</span>
                        </button>
                    </Link>
                        <button onClick={() => setOpen(true)} className="more">
                            <InfoOutlined />
                            <span>More Info</span>
                        </button>
                </div>
            </div>
            <FilmCard open={open} handleClose={handleClose} movie={content} />
        </div>
    )
}

export default Featured
