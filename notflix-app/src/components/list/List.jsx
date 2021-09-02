import './list.scss'
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import ListItem from '../listItem/ListItem'
import { useRef, useState } from 'react'
import useWindowDimensions from '../../hooks/useWindowDimensions'

const List = ({ list }) => {

    const [slideNumber, setSlideNumber] = useState(0)
    const [disable, setDisable] = useState(false)

    const { height, width } = useWindowDimensions();

    const listRef = useRef()

    let listItemWidth //box width + margin-right of item

    const handleClick = (direction) => {

        setDisable(true) //prevent multiclicks

        if (width > 1000)
            listItemWidth = 415
        else
            listItemWidth = 230

        let distance = listRef.current.getBoundingClientRect().x - 50 //-50 because there's already a 50px margin

        if (direction === 'left' && slideNumber > 0) {
            setSlideNumber(prev => prev - 1)
            listRef.current.style.transform = `translateX(${listItemWidth + distance}px)`
        }
        else if (direction === 'right' && slideNumber < list.content.length - width/listItemWidth) {
            setSlideNumber(prev => prev + 1)
            listRef.current.style.transform = `translateX(${-listItemWidth + distance}px)`
        }

        setTimeout(() => {
            setDisable(false)
        }, 300) //wait for animation to end
    }

    return (
        <div className="list">
            <span className="listTitle">{list.title}</span>
            <div className="wrapper">
                <button className="left" disabled={disable} style={{display: slideNumber === 0 && "none"}} onClick={() => {handleClick('left')}}><ArrowBackIosOutlined className="sliderArrow" /></button>
                    <div className="container" ref={listRef} >
                        {list.info.map((movie, i) => {
                            return <ListItem index={i} movie={movie} key={i} />
                        })}
                    </div>
                <button className="right" disabled={disable} onClick={() => {handleClick('right')}}><ArrowForwardIosOutlined className="sliderArrow" /></button>
            </div>
        </div>
    )
}

export default List
