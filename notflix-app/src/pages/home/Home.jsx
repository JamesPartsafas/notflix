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

    useEffect(async () => {
        const getRandomLists = async () => {
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
                console.log(err)
            }
        }

        setLoading(true)
        await getRandomLists()
        setLoading(false)

    }, [type, genre])

    return (
        <div className="home">
            {loading ? (
                <div className={'spinner'}>
                    <CircularProgress color="secondary" size={130} />
                </div>
            ) : (
                <>
                    <Navbar />
                    <Featured type={type} setGenre={setGenre} />
                    <hr />
                    {lists.map((list, index) => {
                        return <List list={list} key={index} />
                    })}
                    <hr />
                </>
            )}
        </div>
    )
}

export default Home
