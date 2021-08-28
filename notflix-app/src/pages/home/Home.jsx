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
                    `lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,
                    {
                        headers: {
                            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMjkyMDk1YzFhZjcyZDQ1NzIzNmU2OCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzMDA5NjMxMywiZXhwIjoxNjMwNTI4MzEzfQ.4N5UTxRt0e0I7zqMAo0PmG707D8WroU9qaOXNU6GUbw'
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
            <Featured type={type} />
            {lists.map((list, index) => {
                return <List list={list} key={index} />
            })}
        </div>
    )
}

export default Home
