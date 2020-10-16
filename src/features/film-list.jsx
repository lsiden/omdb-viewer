import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from 'respin'

import FilmTitle from 'components/film-title'
import MoreButton from 'components/more-button'
import { scrollToTop, scrollToBottom } from 'components/scroll'
import NavButton from 'components/nav-button'
import { setQuery } from 'actions'
import { queryFetch } from 'actions/remote'
import { TITLE_COLOR } from 'omdb_constants'
import Banner from 'components/banner'

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
  constructor(props) {
    const { query, dispatchSetQuery } = props
    super(props)
    dispatchSetQuery(query)
  }

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
          {films.length < totalResults && <MoreButton />}
          { films && films.length && (
          <NavButton
            onClick={scrollToTop}
            style={topButtonStyle}
            title="Scroll to top of page"
          >top
          </NavButton>
          )}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Banner />
        {this.renderInner()}
      </div>
    )
  }
}

_FilmList.propTypes = {
  query: PropTypes.string,
  films: PropTypes.arrayOf(PropTypes.object),
  totalResults: PropTypes.number,
  dispatchSetQuery: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
}

_FilmList.defaultProps = {
  query: '',
  films: [],
  totalResults: 0,
}

export default connect(
  (state, ownProps) => ({
    query: ownProps.query,
    films: state.films,
    totalResults: parseInt(state.totalResults, 10) || 0,
    isFetching: state.isFetching || false,
  }),
  (dispatch) => ({
    dispatchSetQuery: (query) => {
      dispatch(setQuery(query))
      dispatch(queryFetch(query))
    },
  }),
)(_FilmList)
