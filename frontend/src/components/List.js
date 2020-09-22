import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Business from './Business'
// import importLogo from './import_1.png'
import oneStar from '../yelp_stars/web_and_ios/regular/regular_1.png'
// import { oneStar } from '../yelp_stars/web_and_ios/large'

// // Example POST method implementation:
// async function postData(url = '', data = {}) {
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     headers: {
//       'Content-Type': 'application/json'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     redirect: 'follow', // manual, *follow, error
//     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
//   });
//   return response.json(); // parses JSON response into native JavaScript objects
// }


function List() {
  debugger
  const [businesses, setBusinesses] = useState([])
  const [searchStats, setSearchStats] = useState({
    total: 0,
    dailyLimit: -1,
    remainingLimit: -1,
    elapsedTime: 0, 
  })
  // const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  // const [remainingLimit, setRemainingLimit] = useState(-1)
  // const [dailyLimit, setDailyLimit] = useState(-1)
  const [searchLocation, setSearchLocation] = useState("30033")
  // const [elapsedTime, setElapsedTime] = useState(0)
  const [radius, setSearchRadius] = useState(5)

  const handleSearchLocation = (event) => {
    event.preventDefault()
    setSearchLocation(event.target.value)
  }

  const handleSearchRadius = (event) => {
    event.preventDefault()
    setSearchRadius(event.target.value)
  }

  const handleSubmit = (event) => {
    debugger
    event.preventDefault()
    fetchData()
  }

  const fetchData = async () => {
    setBusinesses([])
    const url = 'http://localhost:3001/businesses'
    // debugger
    await axios.get(url, {
      headers: {
        Authorization: 'authString'
      },
      params: {
        // categories: 'breakfast_brunch',
        searchLocation: searchLocation,
        radius: radius,
        // location: '30033'
    //     // latitude: '37.786882',
    //     // longitude: '-122.399972',
      }
    })
    .then(response => {
      debugger
      if (response.status === 200) {
        setBusinesses(response.data.businesses)
        setSearchStats(response.data.searchStats)
        // setTotal(response.data.total)
        // setDailyLimit(response.data.dailyLimit)
        // setRemainingLimit(response.data.remainingLimit)
        
        // setElapsedTime(response.data.elapsedTime)
      } else {
        throw Error("Error fetching posts")
      }
    })
    .catch(err => setError(err))
  }

  useEffect(() => {
    setIsLoading(true)
    // fetchData()
    setIsLoading(false)
  }, [])

  if (error) {
    return <p>{ error.message }</p>
  }

  if (isLoading) {
    return <p>Posts loading...</p>
  } 
  
  return (
    <div className="main">
      <div className="search-box">
        <div className="search-title">
          <h1>Where's some gross food?</h1>
        </div>
        <div className="search-param">
          
          <label className="param-label" for="location">Location: </label>
          <input 
            type="text" 
            id="location" 
            name="location"
            className="param-input"
            value={searchLocation}
            onChange={e => handleSearchLocation(e)}
          ></input>          
        </div>
        <div className="search-param">
          <label className="param-label" for="radius">Radius (km): </label>
          <select 
            id="radius" 
            name="radius"
            value={radius}
            onChange={e => handleSearchRadius(e)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="10">10</option>
          </select>
        </div>
        <div className="search-button">
          <input 
            type="button" 
            id="submit"
            name="submit"
            onClick={e => handleSubmit(e)}             
            value="Search"
          ></input>          
        </div>
      </div>
      {/* <img src={oneStar}/> */}
      {/* <img src={importLogo}/> */}
      {/* <h1>{searchStats.total} from {searchLocation} in {searchStats.elapsedTime} seconds</h1>
      <h2>Searches: {searchStats.remainingLimit } of {searchStats.dailyLimit}</h2> */}
      <div className="businesses">
        <ul className="business-list">
          { businesses.map(business =>
            <Business 
              name={ business.name } 
              rating={ business.rating } 
              url={ business.url }  
              address={ business.location.address1 }
              image_url={ business.image_url }
              // price={ business.price }
            />
          ) }
        </ul>         
      </div>
    </div>
  )
}
            {/* <li className="business">
              <h1>{ business.name }</h1>
              <h3>{ business.rating }</h3>
            </li> */}
export default List;

