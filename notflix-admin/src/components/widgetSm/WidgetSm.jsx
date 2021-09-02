import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function WidgetSm() {

  const [newUsers, setNewUsers] = useState([])

  useEffect(() => {
    const getNewUsers = async () => {
      try {
        const res = await axios.get('/users?new=true',
        {
            headers: {
                token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
            }
          }
        )
        setNewUsers(res.data)
      }
      catch (err) {
        console.log(err)
      }
    }
    getNewUsers()
  }, [])

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Members</span>
      <ul className="widgetSmList">
        {newUsers.map((user, i) => {
          return <li className="widgetSmListItem" key={i} >
            <img
              src={user.profilePic || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        })}
      </ul>
    </div>
  );
}
