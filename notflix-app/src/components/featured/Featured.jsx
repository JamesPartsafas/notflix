import './featured.scss'
import { InfoOutlined, PlayArrow } from '@material-ui/icons'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Featured = ({ type, setGenre }) => {

    const [content, setContent] = useState({})

    useEffect(() => {
        const getRandomFeatured = async () => {
            try {
                const res = await axios.get(`movies/random?type=${type}`,
                    {
                        headers: {
                            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjkyMDk1YzFhZjcyZDQ1NzIzNmU2OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMDA5NjMxMywiZXhwIjoxNjMwNTI4MzEzfQ.4N5UTxRt0e0I7zqMAo0PmG707D8WroU9qaOXNU6GUbw'
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
            {type && (
                <div className="category">
                    <span>{type === "movie" ? "Movies" : "Series"}</span>
                    <select name="genre" id="genre" onChange={e => setGenre(e.target.value)}>
                        <option value="adventure">Adventure</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="crime">Crime</option>
                        <option value="comedy">Comedy</option>
                        <option value="horror">Horror</option>
                        <option value="romance">Romance</option>
                        <option value="thriller">Thriller</option>
                        <option value="sci-fi">Sci-Fi</option>
                        <option value="western">Western</option>
                        <option value="animation">Animation</option>
                        <option value="drama">Drama</option>
                        <option value="documentary">Documentary</option>
                        <option value="historical">Historical</option>
                    </select>
                </div>
            )}
            <img src={content.img} alt="Featured Film" /> {/* Background image */}
            <div className="info">
                <img src={content.imgTitle} alt="" />
                <span className="desc">{content.description}</span>
                <div className="buttons">
                    <button className="play">
                        <PlayArrow />
                        <span>Play</span>
                    </button>
                    <button className="more">
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Featured
