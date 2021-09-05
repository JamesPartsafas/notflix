import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import imageExists from 'image-exists'
import placeholder from './placeholder.png'
import 'react-lazy-load-image-component/src/effects/blur.css'
 
const PosterImage = ({ image, title }) => {

  const [displayedImage, setDisplayedImage] = useState(placeholder)

  useEffect(() => {
    imageExists(image, (exists) => {
      if (exists) {
        setDisplayedImage(image)
      }
    })
  }, [image])

  return (
    <div>
      <LazyLoadImage
          src={displayedImage}
          alt={`${title} Poster`}
          effect="blur"
      />
    </div>
  )
}
 
export default PosterImage;