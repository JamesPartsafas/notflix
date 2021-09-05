import './home.scss'
import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import axios from 'axios'
import { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const Home = ({ type }) => {

    const [lists, setLists] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const getRandomLists = async () => {
            
            setLoading(true)

            //Check if user wants to see favorites list or another page
            if (type === 'list') {
                try {
                    const currentUser = JSON.parse(localStorage.getItem('user')) || null
                    const res = await axios.post(
                        `${process.env.REACT_APP_PROXY}movies/favorites`, {favorites: currentUser.favorites}, 
                        {
                            headers: {
                                token: `Bearer ${currentUser.accessToken}`
                            }
                        }
                    )
                    
                    setLists(res.data)
                }
                catch (err) {
                    setError(true)
                }
            }
            else {
                try {
                    const res = await axios.get(
                        `${process.env.REACT_APP_PROXY}lists/page${type ? "?type=" + type : ""}`,
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
                }
            }

            setLoading(false)
        }

        getRandomLists()

    }, [type])

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
                            <Featured type={type} />
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
