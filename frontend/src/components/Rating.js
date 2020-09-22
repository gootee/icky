import React from 'react';
import zeroStar from '../yelp_stars/web_and_ios/large/large_1.png'
import oneStar from '../yelp_stars/web_and_ios/large/large_1.png'
import oneAndHalfStar from '../yelp_stars/web_and_ios/large/large_1_half.png'
import twoStar from '../yelp_stars/web_and_ios/large/large_2.png'
import twoAndHalfStar from '../yelp_stars/web_and_ios/large/large_2_half.png'
import threeStar from '../yelp_stars/web_and_ios/large/large_3.png'
import threeAndHalfStar from '../yelp_stars/web_and_ios/large/large_3_half.png'
import fourStar from '../yelp_stars/web_and_ios/large/large_4.png'
import fourAndHalfStar from '../yelp_stars/web_and_ios/large/large_4_half.png'
import fiveStar from '../yelp_stars/web_and_ios/large/large_5.png'

const Rating = (props) => {
  switch (props.rating) {
    case 0:
      return <img src={ zeroStar } alt="0 stars"></img>
    case 1:
      return <img src={ oneStar } alt="1 star"></img>
    case 1.5:
      return <img src={ oneAndHalfStar } alt="1.5 stars"></img>
    case 2:
      return <img src={ twoStar } alt="2 stars"></img>
    case 2.5:
      return <img src={ twoAndHalfStar } alt="2.5 stars"></img>  
    case 3:
      return <img src={ threeStar } alt="3 stars"></img>
    case 3.5:
      return <img src={ threeAndHalfStar } alt="3.5 stars"></img>
    case 4:
      return <img src={ fourStar } alt="4 stars"></img>
    case 4.5:
      return <img src={ fourAndHalfStar } alt="4.5 stars"></img>
    case 5:
      return <img src={ fiveStar } alt="5 stars"></img>
    default:
      return <div>none</div>
  }
}

export default Rating