import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from 'respin'

import FilmTitle from 'components/film-title'
import MoreButton from 'components/more-button'
import { scrollToTop, scrollToBottom } from 'components/scroll'
import NavButton from 'components/nav-button'
import QueryForm from 'components/query-form'
import { setQuery, getFilms } from 'store'
import { promiseQueryResults } from 'store/async'
import { TITLE_COLOR } from 'omdb_constants'

const ulStyle = {
  listStyleType: 'none',
  lineHeight: 1.5,
  marginTop: 20,
}
const msgStyle = {
  fontSize: '14pt',
  color: TITLE_COLOR,
  margin: '1em',
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

  renderInner() {
    const { query, films, totalResults, isFetching } = this.props

    if (isFetching) {
      return <Spinner style={spinnerStyle} />
    }

    if (query.length === 0) {
      return <div style={msgStyle}> Search for a title. </div>
    }

    if (query.length > 0 && films.length === 0) {
      return <div style={msgStyle}> There are no films that match your query. </div>
    }

    return (
      <div>
        <ul style={ulStyle}>
          {films.map((filmSummary) => (
            <FilmTitle key={filmSummary.imdbID} filmSummary={filmSummary} />
          ))}
        </ul>
        <div style={bottomRowStyle}>
          { films.length < totalResults && <MoreButton /> }
          { films.length && (
          <NavButton
            onClick={scrollToTop}
            style={topButtonStyle}
            title="Scroll to top of page"
          >Scroll to Top of List
          </NavButton>
          )}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <QueryForm />
        {this.renderInner()}
      </div>
    )
  }
}

_FilmList.propTypes = {
  query: PropTypes.string,
  films: PropTypes.arrayOf(PropTypes.object),
  totalResults: PropTypes.number,
  isFetching: PropTypes.bool.isRequired,
}

_FilmList.defaultProps = {
  query: '',
  films: [],
  totalResults: 0,
}

export default connect(
  (state, ownProps) => ({
    query: state.query || ownProps.query,
    films: getFilms(state),
    totalResults: state.totalResults || 0,
    isFetching: state.isFetching || false,
  }),
  (dispatch) => ({
    dispatchSetQuery: (query) => {
      dispatch(setQuery(query))
      dispatch(promiseQueryResults(query))
    },
  }),
)(_FilmList)
