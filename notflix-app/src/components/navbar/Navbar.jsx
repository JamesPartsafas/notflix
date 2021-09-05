import './navbar.scss'
import { useState, useContext, useEffect } from 'react'
import { Search } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { logoutHandler } from '../../authContext/apiCalls'
import { AuthContext } from '../../authContext/authContext'
import logo from './logo.png'

const Navbar = ({ type }) => {

    const [isScrolled, setIsScrolled] = useState(false)

    const {dispatch} = useContext(AuthContext)

    //Detect window scrolling to determine navbar color
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true)
        return () => window.onscroll = null
    }

    const handleLogout = (e) => {
        e.preventDefault()
        logoutHandler(localStorage.getItem('user'), dispatch)
    }

    useEffect(() => {
        return () => {
            setIsScrolled(false) //triggers on unmount to prevent memory leaks if isScrolled has become true
        }
    }, [])

    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="leftSection">
                    <img src={logo} alt="" />
                    <Link to='/' className="link">
                        <span className={`navbarMainLinks ${type == null && 'selected'}`}>Home</span>
                    </Link>
                    <Link to='/series' className="link">
                        <span className={`navbarMainLinks ${type === 'series' && 'selected'}`}>TV Shows</span>
                    </Link>
                    <Link to='/movies' className="link">
                        <span className={`navbarMainLinks ${type === 'movie' && 'selected'}`}>Movies</span>
                    </Link>
                    <span className={`navbarMainLinks ${type === 'list' && 'selected'}`}>My List</span>
                </div>
                <div className="rightSection">
                    <Search className="icon navbarMainLinks" />
                    <span className="logout" onClick={handleLogout}>Logout</span>
                </div>
            </div>
        </div>
    )
}

export default Navbar
