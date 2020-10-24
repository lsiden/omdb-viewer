import React from 'react'
import { Link } from 'react-router-dom'

import { headerStyle, titleStyle } from 'style'
import { BANNER_TITLE } from 'omdb_constants'

const inAboutPath = () => /about\/?$/.test(window.location.href)

export default () => (
  <header style={headerStyle}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h1 style={titleStyle}>{BANNER_TITLE}</h1>
      {!inAboutPath() && <Link to="/about" style={{ color: 'white' }}>About</Link>}
    </div>
  </header>
)
