import React from 'react'
import Rating from './Rating'
import yelpLogo from '../yelp_logo/logo_desktop_xsmall_outline.png'

const Business = (props) => {
  return <li className="business">
    <div className="business-heading">
      <h1>{ props.name }</h1>
    </div>
    <div className="business-body">
      <div className="body-left">
        <div>
          <h2>{ props.address }</h2>
          {/* <h2>{ props.price }</h2> */}
        </div>
        <div>
          <Rating rating={ props.rating } />
          <div className="yelp-logo">
            <a href={ props.url } target="_blank">
              <img src={yelpLogo} />
            </a>
          </div>  
        </div>
      </div>      
      <div className="body-right">
        <img className="business-image" src={ props.image_url }/>
      </div>

    </div>
    {/* <div className="business-bottom">

    </div>  */}
  </li>
}

export default Business