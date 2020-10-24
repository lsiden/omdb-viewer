import React from 'react'
import { Link } from 'react-router-dom'

import { headerStyle } from 'style'
import { BANNER_TITLE } from 'omdb_constants'
import logo from 'img/movie-icon.svg'

const inAboutPath = () => /about\/?$/.test(window.location.href)

export default () => (
  <header style={headerStyle}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h1>
        <img
          src={logo}
          height={20}
          style={{ margin: 12 }}
          alt="OMDB Browser logo"
        />
        {BANNER_TITLE}
      </h1>
      {!inAboutPath() && <Link to="/about" style={{ color: 'white' }}>About</Link>}
    </div>
  </header>
)
