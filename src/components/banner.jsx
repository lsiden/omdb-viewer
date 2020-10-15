import React from 'react'

import { headerStyle, titleStyle } from 'style'
import { BANNER_TITLE } from 'omdb_constants'
import QueryForm from 'components/query-form'

export default () => (
  <header style={headerStyle}>
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h1 style={titleStyle}>{BANNER_TITLE}</h1>
      <a href="/about" style={{ color: 'white' }}>
        about
      </a>
    </div>
    <QueryForm />
  </header>
)
