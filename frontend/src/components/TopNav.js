import React from 'react'
import ickyLogo from '../disgusting.png'

const TopNav = () => {
  return <div>
    <nav>
      <div>
        <img className="logo" src={ickyLogo} />
      </div>
      
      <h2>Icky</h2>
    </nav>
  </div>
}

export default TopNav