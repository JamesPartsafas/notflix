import "./newProduct.css"
import { useState } from "react";

export default function NewProduct() {

  const [movie, setMovie] = useState(null)
  const [img, setImg] = useState(null)
  const [imgTitle, setImgTitle] = useState(null)
  const [imgSm, setImgSm] = useState(null)
  const [trailer, setTrailer] = useState(null)
  const [video, setVideo] = useState(null)

  const handleChange = (e) => {
    const value = e.target.value
    setMovie({...movie, [e.target.name]: value})
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Create Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="img" name='img' />
        </div>
        <div className="addProductItem">
          <label>Title Image</label>
          <input type="file" id="imgTitle" name='imgTitle' />
        </div>
        <div className="addProductItem">
          <label>Thumbnail</label>
          <input type="file" id="imgSm" name='imgSm' />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="Movie Title" name='title' onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="Description" name='description' onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input type="text" placeholder="Release Year" name='year' onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="Genre" name='genre' onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input type="text" placeholder="Film Duration" name='duration' onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Age Limit</label>
          <input type="text" placeholder="Age Limit" name='limit' onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Movie or Series?</label>
          <select name="isSeries" id="isSeries" onChange={handleChange}>
            <option value="false">Movie</option>
            <option value="true">Series</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" name='trailer' />
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input type="file" name='video' />
        </div>
        <button className="addProductButton">Create Film</button>
      </form>
    </div>
  );
}
