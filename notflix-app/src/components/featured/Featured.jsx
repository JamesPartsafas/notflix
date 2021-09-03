import './featured.scss'
import { InfoOutlined, PlayArrow } from '@material-ui/icons'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Featured = ({ type }) => {

    const [content, setContent] = useState({})

    useEffect(() => {
        const getRandomFeatured = async () => {
            try {
                const res = await axios.get(`movies/random?type=${type}`,
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
            <img src={content.img} alt="Featured Film" /> {/* Background image */}
            <div className="info">
                <h2>{content.title}</h2>
                <span className="desc">{content.description}</span>
                <span className="descInfo">Released: {content.year}</span>
                <span className="descInfo">Rated: {content.limit}</span>
                <span className="descInfo">Score: {content.rating} / 100</span>
                <div className="buttons">
                    <button className="play">
                        <PlayArrow />
                        <span>Play</span>
                    </button>
                    <button className="more">
                        <InfoOutlined />
                        <span>More Info</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Featured
