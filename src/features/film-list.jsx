import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from 'respin'

import FilmTitle from 'components/film-title'
import MoreButton from 'components/more-button'
import { scrollToTop, scrollToBottom } from 'components/scroll'
import NavButton from 'components/nav-button'
import QueryForm from 'components/query-form'
import { headerStyle, titleStyle } from 'style'
import { setQuery } from 'actions'
import { BANNER_TITLE, TITLE_COLOR } from 'constants'

const Banner = () => (
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

export class FilmList_ extends React.Component {
  componentDidUpdate() {
    scrollToBottom()
  }

  componentDidCatch(err, errInfo) {
    console.error(err, errInfo)
  }

  render_inner() {
    const {films, totalResults} = this.props

    if (!films) {
      return <Spinner />
    }

    if (films.length === 0) {
      return (
        <div>
          <div style={msgStyle}>
            There are no films that match your query.
          </div>
        </div>
      )
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
          <NavButton
            onClick={scrollToTop}
            style={topButtonStyle}
            title="Scroll to top of page"
          >
            top
          </NavButton>
        </div>
      </div>
    )
  }

  render() {
    const  { query, films, totalResults } = this.props
    if (!films) {
      dispatchSetQuery(query)
    }
    return (
      <div>
        <Banner />
        {this.render_inner()}
      </div>
    )
  }
}

FilmList_.propTypes = {
  query: PropTypes.string.isRequired,
  films: PropTypes.arrayOf(PropTypes.object),
  totalResults: PropTypes.number,
}

FilmList_.defaultProps = {
  query: '',
  films: [],
  totalResults: 0,
}

export default connect(
  (state, ownProps) => ({
    query: ownProps.query,
    films: state.films,
    totalResults: state.totalResults,
  }),
  (dispatch) => ({
    dispatchSetQuery: (query) => dispatch(setQuery(query)),
  }),
)(FilmList_)
