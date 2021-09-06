import { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import FilmCard from '../../components/filmCard/FilmCard'

const useStyles = makeStyles((theme) => ({
    root: {
        background: 'white',
        border: '1px solid #E50914',
        borderRadius: '4px',
        margin: 'auto',
    }
}))

export default function SearchBar() {

    //Content displayed from search
    const [displayed, setDisplayed] = useState([])

    //Controls for filmCard
    const [open, setOpen] = useState(false)
    const [filmData, setFilmData] = useState({})

    const handleClose = () => {
        setOpen(false);
    }

    const classes = useStyles()

    //Use debouncing to reduce server load
    const debounce = (fn, delay) => {
        let timer
        return (...args) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                fn(...args)
            }, delay)
        }
    }

    let handleOnChange = async (e) => {
        const query = e.target.value

        if (query === '')
            return

        try {
            const res = await axios.get(
                `${process.env.REACT_APP_PROXY}movies/search?input=${query}`,
                {
                    headers: {
                        token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
                    }
                }
            )
            setDisplayed(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    handleOnChange = debounce(handleOnChange, 500)

    //Open filmCard
    const handleMovieSelection = (movie) => {
        if (movie === null)
            return
        
        setFilmData(movie)
        setOpen(true)
    }

    return (
        <div style={{ width: 300 }}>
            <Autocomplete
                onChange={(event, movie) => handleMovieSelection(movie)}
                id="movieSearch"
                options={displayed} //Assign each movie object to a section of the autocomplete
                getOptionLabel={option => option.title} //Choose what to display in each section of autocomplete, based on object assigned to it
                getOptionSelected={(option, value) => option.iso === value.iso} //Autocomplete uses strict equality by default. Override this, as we are comparing objects
                renderInput={(params) => (
                    <TextField className={classes.root} {...params} label="Search..." margin="normal" variant="outlined" onChange={handleOnChange} />
                )}
            />
            <FilmCard open={open} handleClose={handleClose} movie={filmData} />
        </div>
    )
}