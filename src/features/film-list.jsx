import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FilmTitle from 'components/film-title'
import MoreButton from 'components/more-button'
import { scrollToTop, scrollToBottom } from 'components/scroll'
import NavButton from 'components/nav-button'
import { getFilms } from 'store'
import Spinner from 'respin'

const ulStyle = {
  listStyleType: 'none',
  lineHeight: 1.5,
  marginTop: 20,
}
const bottomRowStyle = {
  marginLeft: 40,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'baseline',
}
const topButtonStyle = {
  marginLeft: 40,
  fontSize: 16,
  color: 'darkgrey',
}
const spinnerStyle = {
  margin: 50,
}

export class _FilmList extends React.Component {
  componentDidUpdate() {
    scrollToBottom()
  }

  componentDidCatch(err, errInfo) {
    console.error(err, errInfo)
  }

  // TODO - ScollToTop as separate component
  render() {
    const { films, totalResults, isFetching } = this.props
    return (
      <div>
        <ul style={ulStyle}>
          {films.map((filmSummary) => (
            <FilmTitle key={filmSummary.imdbID} filmSummary={filmSummary} />
          ))}
        </ul>
        { isFetching && <Spinner style={spinnerStyle} /> }
        <div style={bottomRowStyle}>
          { films.length < totalResults && <MoreButton /> }
          { films.length && (
          <NavButton
            onClick={scrollToTop}
            style={topButtonStyle}
            title="Scroll to top of list"
          >Scroll to Top of List
          </NavButton>
          )}
        </div>
      </div>
    )
  }
}

_FilmList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object).isRequired,
  totalResults: PropTypes.number.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

export default connect(
  (state) => ({
    films: getFilms(state),
    totalResults: state.totalResults || 0,
    isFetching: state.isFetching || false,
  }),
)(_FilmList)
