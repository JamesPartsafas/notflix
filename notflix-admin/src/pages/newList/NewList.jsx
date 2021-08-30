import "./newList.css"
import { useState, useContext, useEffect } from "react"
import { getMovies } from "../../context/movieContext/apiCalls"
import { MovieContext } from '../../context/movieContext/MovieContext'
import { ListContext } from '../../context/listContext/ListContext'
import { createList } from "../../context/listContext/apiCalls"
import { useHistory } from "react-router-dom"

const NewList = () => {

  const [list, setList] = useState(null)
  const history = useHistory()
  
  const {dispatch} = useContext(ListContext)
  const {movies, dispatch: dispatchMovie} = useContext(MovieContext)

  //Get movies on page load
  useEffect(() => {
    getMovies(dispatchMovie)
  }, [dispatchMovie])

  const handleChange = (e) => {
    const value = e.target.value
    setList({...list, [e.target.name]: value})
  }

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value)
    setList({...list, [e.target.name]: value})    
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createList(list, dispatch)
    history.push('/list')
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Create List</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input type="text" placeholder="List Title" name='title' onChange={handleChange} />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <input type="text" placeholder="Genre" name='description' onChange={handleChange} />
          </div>
          <div className="addProductItem">
            <label>Movie or Series?</label>
            <select name="type" onChange={handleChange}>
              <option value='movie'>Movie</option>
              <option value='series'>Series</option>
            </select>
          </div>
        </div>

        <div className="formRight">
          <div className="addProductItem">
            <label>List Content</label>
            <select multiple name="content" onChange={handleSelect} style={{height:'300px'}}>
              {movies.map(movie => (
                  <option key={movie._id} value={movie._id}>{movie.title}</option>
                )
              )}
            </select>
          </div>
        </div>
        
        <button className="addProductButton" onClick={handleSubmit}>Create List</button>
        
      </form>
    </div>
  );
}

export default NewList