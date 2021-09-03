import './home.scss'
import Navbar from '../../components/navbar/Navbar'
import Featured from '../../components/featured/Featured'
import List from '../../components/list/List'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Home = ({ type }) => {

    const [lists, setLists] = useState([])
    const [genre, setGenre] = useState(null)

    useEffect(() => {
        const getRandomLists = async () => {
            try {
                const res = await axios.get(
                    `lists/page${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,
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
        getRandomLists()
    }, [type, genre])

    return (
        <div className="home">
            <Navbar />
            <Featured type={type} setGenre={setGenre} />
            <hr />
            {lists.map((list, index) => {
                return <List list={list} key={index} />
            })}
            <hr />
        </div>
    )
}

export default Home
