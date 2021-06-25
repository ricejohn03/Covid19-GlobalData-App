import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'
import { TiSocialFacebook, TiSocialTwitter, TiSocialLinkedin, TiSocialInstagram } from "react-icons/ti";

import Charts from './components/Charts'

function App() {
    const [data, setData] = useState({})
    const [isloading, setIsLoading] = useState(true)
    const [filter, setFilter] = useState({
        "deaths": false,
        "active": true,
        "confirmed": false
    })


    const getData = async () => {
        const headers = {
            "headers": {
                "x-rapidapi-key": "Your KEY",
                "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
                "useQueryString": true
            }
        }
        const res = await axios.get('https://covid-19-data.p.rapidapi.com/report/totals', headers )
        console.log(res)
        setData(res.data)
    }

    useEffect(() => {
        getData()

    }, [])

    useEffect(() => {
        checkLoading()
    },[data])

    const checkLoading = () => {
        if (Object.keys(data).length !== 0) {
            setIsLoading(false)
        }
    }

    const handleFilter = (e) => {
        console.log(e)
      

        setFilter({
            "deaths": false,
            "active": false,
            "confirmed": false
, [e] : true})
    }

  return (
      <div className="main-div">
          { isloading === true ? <div className="loader"></div> : (
              <>
                  <div className="nav">
                      <h3 href="https://rapidapi.com/Gramzivi/api/covid-19-data/">COVID-19 data API</h3>
                      <h1 > Global Covid 19</h1>
                      <h3> <TiSocialLinkedin size={30} /> <TiSocialFacebook size={30} /> <TiSocialInstagram size={ 30} /> <TiSocialTwitter size={30} /> </h3>

                  </div>
                  <div className="main-content">
                      <div className="main-card">
                          <h4 className="sm-text">As of {data[200].date}</h4>
                          <h1>Active Cases: {data[200].active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                          <h1>Confirmed: {data[200].confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                          <h1>Deaths: {data[200].deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
                          <h1>Recovered: {data[200].recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} </h1>
                      </div>
                     

                      <div className="btn-container">

                          <button id="active" onClick={(e) => handleFilter(e.target.id)} className={"btn " + (filter.active === true ? " active blue" : "")}> Active Cases Over Time </button>
                          <button id="confirmed" onClick={(e) => handleFilter(e.target.id)} className={"btn " + (filter.confirmed === true ? " active green" : "")}> Confirmed Cases over time </button>
                          <button id="deaths" onClick={(e) => handleFilter(e.target.id)} className={"btn " + (filter.deaths === true ? " active red" : "")}> Death Cases over time </button>

                      </div>

                      <div className="chart-conatiner">
                          <Charts props={data} filter={filter} />
                      </div>

                     
                  </div>

                  </>
              )}
          
    </div>
  );
}

export default App;
