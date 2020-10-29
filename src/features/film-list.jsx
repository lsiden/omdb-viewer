import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import MoreButton from 'components/more-button'
import { scrollToBottom } from 'components/scroll'
import Spinner from 'components/spinner'
import ScrollToTopButton from 'components/scroll-to-top-btn'
import SearchStats from 'components/search-stats'
import FilmList from 'components/film-list'

const bottomRowStyle = {
  marginLeft: 40,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'baseline',
}
const spinnerStyle = {
  margin: 50,
}

export class FilmListWrapper extends React.Component {
  componentDidUpdate() {
    scrollToBottom()
  }

  componentDidCatch(err, errInfo) {
    console.error(err, errInfo)
  }

  render() {
    return (
      <div>
        <SearchStats style={{marginLeft: 40}} />
        <FilmList />
        <Spinner style={spinnerStyle} />
        <div style={bottomRowStyle}>
          <MoreButton />
          <ScrollToTopButton />
        </div>
      </div>
    )
  }
}

export default FilmListWrapper
