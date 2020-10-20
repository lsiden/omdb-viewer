import React from 'react'

import { headerStyle, titleStyle } from 'style'
import { BANNER_TITLE } from 'omdb_constants'

const AboutLink = () => (
  <a href="/about" style={{ color: 'white' }}>
    about
  </a>
)

const inAboutPath = () => {
  return /about\/?$/.test(window.location.href)
}

export default () => {
  return (
    <header style={headerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 style={titleStyle}>{BANNER_TITLE}</h1>
        {!inAboutPath() && <AboutLink />}
      </div>
    </header>
  )
}