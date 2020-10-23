import React from 'react'
import ReactMarkdown from 'react-markdown'

import CloseButton from 'components/close-button'
import { headerStyle } from 'style'
import { BANNER_TITLE, ESC_KEY } from 'omdb_constants'

const OMDB_API_URL = 'https://www.omdbapi.com/'
const SOURCE_CODE_URL = 'https://github.com/lsiden/omdb-film-browser-web'
const WESTSIDE_CONSULTING_URL = 'http://westsideconsultingllc.com'

const source = `
## Written By
Lawrence Siden

[Westside Consulting LLC](${WESTSIDE_CONSULTING_URL})

[westsideconsultingllc@gmail.com](mailto:westsideconsultingllc@gmail.com)

## Credits
[Open Movie Database API](${OMDB_API_URL})

## Source Code
${SOURCE_CODE_URL}
`

const aboutBannerStyle = {
  ...headerStyle,
  display: 'flex',
  justifyContent: 'space-between',
}

class _About extends React.Component {
  static onKeyDown(ev) {
    if (ev.keyCode === ESC_KEY) {
      window.history.back()
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', _About.onKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', _About.onKeyDown)
  }

  render() {
    return (
      <div style={{ outline: 'none' }}>
        <header style={aboutBannerStyle}>
          <h1 style={{ fontSize: 28 }}>{`About ${BANNER_TITLE}`}</h1>
          <CloseButton buttonStyle={{ color: 'white' }} />
        </header>
        <div style={{ marginLeft: 20 }}>
          <ReactMarkdown source={source} />
        </div>
      </div>
    )
  }
}

export default _About
