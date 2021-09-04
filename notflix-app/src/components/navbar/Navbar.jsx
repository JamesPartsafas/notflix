import './navbar.scss'
import { useState, useContext } from 'react'
import { Search } from '@material-ui/icons'
import { Link, useHistory } from 'react-router-dom'
import { logoutHandler } from '../../authContext/apiCalls'
import { AuthContext } from '../../authContext/authContext'
import logo from './logo.png'

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
                <div className="leftSection">
                    <img src={logo} alt="" />
                    <Link to='/' className="link">
                        <span className='navbarMainLinks'>Home</span>
                    </Link>
                    <Link to='/series' className="link">
                        <span className='navbarMainLinks'>TV Shows</span>
                    </Link>
                    <Link to='/movies' className="link">
                        <span className='navbarMainLinks'>Movies</span>
                    </Link>
                    <span className='navbarMainLinks'>My List</span>
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
