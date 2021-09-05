import './navbar.scss'
import { useState, useContext, useEffect } from 'react'
import { Search } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { logoutHandler } from '../../authContext/apiCalls'
import { AuthContext } from '../../authContext/authContext'
import logo from './logo.png'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
}))

const Navbar = ({ type }) => {

    const classes = useStyles()

    const [isScrolled, setIsScrolled] = useState(false)
    const [page, setPage] = useState('')

    const {dispatch} = useContext(AuthContext)

    
    const handleChange = (event) => {
        setPage(event.target.value);
    }

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
                    <div className="navLinks">
                        <Link to='/' className="link">
                            <span className={`navbarMainLinks ${type == null && 'selected'}`}>Home</span>
                        </Link>
                        <Link to='/series' className="link">
                            <span className={`navbarMainLinks ${type === 'series' && 'selected'}`}>TV Shows</span>
                        </Link>
                        <Link to='/movies' className="link">
                            <span className={`navbarMainLinks ${type === 'movie' && 'selected'}`}>Movies</span>
                        </Link>
                        <Link to='/mylist' className="link">
                            <span className={`navbarMainLinks ${type === 'list' && 'selected'}`}>My List</span>
                        </Link>
                    </div>

                    <FormControl variant="" className={`${classes.formControl} selectForm`}>
                        <InputLabel className="selectLabel" id="selectedPage">Browse</InputLabel>
                        <Select
                            labelId="selectedPage"
                            id="selectedPage"
                            value={page}
                            onChange={handleChange}
                            className="selectShown"
                        >
                            <Link to='/' className="link">
                                <MenuItem className="menuItem" value="home">Home</MenuItem>
                            </Link>
                            <Link to='/series' className="link">
                                <MenuItem className="menuItem" value='series'>TV Shows</MenuItem>
                            </Link>
                            <Link to='/movies' className="link">
                                <MenuItem className="menuItem" value='movie'>Movies</MenuItem>
                            </Link>
                            <Link to='/mylist' className="link">
                                <MenuItem className="menuItem" value='list'>My List</MenuItem>
                            </Link>
                        </Select>
                    </FormControl>
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
