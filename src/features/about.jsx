import React from 'react'
import ReactMarkdown from 'react-markdown'

import CloseButton from 'components/close-button'
import { headerStyle } from 'style'
import { BANNER_TITLE } from 'omdb_constants'

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

const AboutBanner = () => (
  <header style={aboutBannerStyle}>
    <h1 style={{ fontSize: 28 }}>{`About ${BANNER_TITLE}`}</h1>
    <CloseButton buttonStyle={{ color: 'white' }} />
  </header>
)

const About = () => (
  <div>
    <AboutBanner />
    <div style={{ marginLeft: 20 }}>
      <ReactMarkdown source={source} />
    </div>
  </div>
)

export default About
