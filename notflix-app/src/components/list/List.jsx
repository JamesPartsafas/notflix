import './list.scss'
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import ListItem from '../listItem/ListItem'
import { useRef, useState, useEffect } from 'react'
import useWindowDimensions from '../../hooks/useWindowDimensions'

const List = ({ list }) => {

    const [slideNumber, setSlideNumber] = useState(0)
    const [disable, setDisable] = useState(false)

    const { width } = useWindowDimensions();

    const listRef = useRef()

    let listItemWidth //box width + margin-right of item

    const handleClick = (direction) => {

        setDisable(true) //prevent multiclicks

        let distance
        if (width > 1000) {
            listItemWidth = 415
            distance = listRef.current.getBoundingClientRect().x - 50 //-50 because there's already a 50px margin
        }
        else if (width > 660) {
            listItemWidth = 195
            distance = listRef.current.getBoundingClientRect().x - 50
        }
        else {
            listItemWidth = 195
            distance = listRef.current.getBoundingClientRect().x - 15
        }

        

        if (direction === 'left' && slideNumber > 0) {
            setSlideNumber(prev => prev - 1)
            listRef.current.style.transform = `translateX(${listItemWidth + distance}px)`
        }
        else if (direction === 'right' && slideNumber < list.info.length - width/listItemWidth) {
            setSlideNumber(prev => prev + 1)
            listRef.current.style.transform = `translateX(${-listItemWidth + distance}px)`
        }

        setTimeout(() => {
            setDisable(false)
        }, 300) //wait for animation to end
    }

    //Reset scroll position of list on page resizing
    useEffect(() => {
        if (list.info && list.info.length > 0) {
            setSlideNumber(0)
            listRef.current.style.transform = 'translateX(0px)'
        }
    }, [width, list.info])

    return (
        <div className="list">
            <span className="listTitle">{list.title}</span>
            {list.info && list.info.length > 0 ? <div className="wrapper">
                <button className="left" disabled={disable} style={{display: slideNumber === 0 && "none"}} onClick={() => {handleClick('left')}}><ArrowBackIosOutlined className="sliderArrow" /></button>
                    <div className="container" ref={listRef} >
                        {list.info.map((movie, i) => {
                            return <ListItem movie={movie} key={i} />
                        })}
                    </div>
                <button className="right" disabled={disable} onClick={() => {handleClick('right')}}><ArrowForwardIosOutlined className="sliderArrow" /></button>
            </div> :
            <div className="wrapper">
                <p className="noContent">It appears you haven't added anything to your list yet!</p>
            </div>}
        </div>
    )
}

export default List
