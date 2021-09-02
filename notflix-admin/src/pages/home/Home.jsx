import Chart from "../../components/chart/Chart"
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo"
import "./home.css"
import WidgetSm from "../../components/widgetSm/WidgetSm"
import WidgetLg from "../../components/widgetLg/WidgetLg"
import axios from 'axios'
import { useState, useEffect, useMemo } from "react"

export default function Home() {

  const MONTHS = useMemo(() => [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ], [])

  const [userStats, setUserStats] = useState([])

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get('users/stats',
        {
            headers: {
                token: `Bearer ${JSON.parse(localStorage.getItem('user')).accessToken}`
            }
          }
        )
        const stats = res.data.sort((a, b) => {
          return a._id - b._id
        })
        stats.map(item => {
          setUserStats(prev => [...prev, {name:MONTHS[item._id-1], "New Users":item.total}])
          return null
        })
      }
      catch (err) {
        console.log(err)
      }
    }
    getStats()
  }, [MONTHS])

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New Users"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
