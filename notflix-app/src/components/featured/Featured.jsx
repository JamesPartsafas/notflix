import './featured.scss'
import { InfoOutlined, PlayArrow } from '@material-ui/icons'

const Featured = ({ type }) => {
    return (
        <div className="featured">
            {type && (
                <div className="category">
                    <span>{type === "movie" ? "Movies" : "Series"}</span>
                    <select name="genre" id="genre">
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
            <img src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="Featured Film" />
            <div className="info">
                <img src="https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABQq7tk0559I6V-2JOzeZUVb9NBKmKbBGHy5tFraxB9jN-O9cBB595XlGhG9Ao2JK2aF3Q0ydLBYyFHSe0OFyThDRCqsrVt-bioHd.webp?r=933" alt="" />
                <span className="desc">Le lorem ipsum est, en imprimerie, une 
                suite de mots sans signification utilisée à titre provisoire 
                pour calibrer une mise en page, 
                le texte définitif venant remplacer le faux-texte dès 
                qu'il est prêt ou que la mise en page est achevée.</span>
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
