import './navbar.scss'
import { useState, useContext } from 'react'
import { Search } from '@material-ui/icons'
import { Link, useHistory } from 'react-router-dom'
import { logoutHandler } from '../../authContext/apiCalls'
import { AuthContext } from '../../authContext/authContext'

const Navbar = () => {

    const [isScrolled, setIsScrolled] = useState(false)

    const {dispatch} = useContext(AuthContext)

    const history = useHistory()

    //Detect window scrolling to determine navbar color
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true)
        return () => window.onscroll = null
    }

    const handleLogout = (e) => {
        e.preventDefault()
        logoutHandler(localStorage.getItem('user'), dispatch)
        history.push('/login')
    }

    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" />
                    <Link to='/' className="link">
                        <span>Home</span>
                    </Link>
                    <Link to='/series' className="link">
                        <span className='navbarMainLinks'>TV Shows</span>
                    </Link>
                    <Link to='/movies' className="link">
                        <span className='navbarMainLinks'>Movies</span>
                    </Link>
                    <span>My List</span>
                </div>
                <div className="right">
                    <Search className="icon" />
                    <span className="logout" onClick={handleLogout}>Logout</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar
