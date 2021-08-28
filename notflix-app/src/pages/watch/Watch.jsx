import './watch.scss'
import { ArrowBackOutlined } from '@material-ui/icons'
import { useLocation, Link } from 'react-router-dom'

const Watch = () => {

    //useLocation hook gets url and movie object that was passed in by ListItem
    const location = useLocation() 
    const movie = location.movie

    return (
        <div className="watch">
            <Link to="/">
                <div className="back">
                    <ArrowBackOutlined />
                    Home
                </div>
            </Link>
            <video 
                className="video" 
                autoPlay 
                progress 
                controls 
                src={movie.video}
            />
        </div>
    )
}

export default Watch
