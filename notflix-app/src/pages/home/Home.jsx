import './home.scss'
import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import axios from 'axios'
import { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const Home = ({ type }) => {

    const [lists, setLists] = useState([])
    const [genre, setGenre] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getRandomLists = async () => {
            
            setLoading(true)
            
            try {
                const res = await axios.get(
                    `${process.env.REACT_APP_PROXY}lists/page${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,
                    {
                        headers: {
                            token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
                        }
                    }
                )
                setLists(res.data)
            }
            catch (err) {
                setError(true)
                console.log('error')
            }

            setLoading(false)
        }

        getRandomLists()

    }, [type, genre])

    return (
        <div className="home">
            {error ? (
                <div className="error">
                    There was an error. Our servers may be down. Please try again later.
                </div>
            ) :
                <>
                    {loading ? (
                        <div className={'spinner'}>
                            <CircularProgress color="secondary" size={130} />
                        </div>
                    ) : (
                        <>
                            <Navbar type={type} />
                            <Featured type={type} setGenre={setGenre} />
                            <hr />
                            {lists.map((list, index) => {
                                return <List list={list} key={index} />
                            })}
                            <hr />
                        </>
                    )}
                </>
            }
        </div>
    )
}

export default Home
