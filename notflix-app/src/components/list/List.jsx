import './list.scss'
import { ArrowBackIosOutlined, ArrowForwardIosOutlined } from '@material-ui/icons'
import ListItem from '../listItem/ListItem'
import { useRef, useState } from 'react'

const List = ({ list }) => {

    const [slideNumber, setSlideNumber] = useState(0)
    const [disable, setDisable] = useState(false)

    const listRef = useRef()

    const handleClick = (direction) => {

        setDisable(true) //prevent multiclicks

        let distance = listRef.current.getBoundingClientRect().x - 50 //-50 because there's already a 50px margin
        if (direction === 'left' && slideNumber > 0) {
            setSlideNumber(prev => prev - 1)
            listRef.current.style.transform = `translateX(${230 + distance}px)`
        }
        else if (direction === 'right' && slideNumber < 5) {
            setSlideNumber(prev => prev + 1)
            listRef.current.style.transform = `translateX(${-230 + distance}px)`
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
                        {list.content.map((item, i) => {
                            return <ListItem index={i} item={item} key={i} />
                        })}
                    </div>
                <button className="right" disabled={disable} onClick={() => {handleClick('right')}}><ArrowForwardIosOutlined className="sliderArrow" /></button>
            </div>
        </div>
    )
}

export default List
