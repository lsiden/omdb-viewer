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

export class _FilmList extends React.Component {
  componentDidUpdate() {
    scrollToBottom()
  }

  componentDidCatch(err, errInfo) {
    console.error(err, errInfo)
  }

  renderButtonRow(films, totalResults) {
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

  renderInner() {
    const { films, totalResults } = this.props

    if (!films) {
      const spinnerStyle = {
        marginLeft: 45,
        marginBottom: 20,
      }
      return <Spinner style={spinnerStyle} />
    }

    if (films.length === 0) {
      return (
        <div style={msgStyle}>
          There are no films that match your query.
        </div>
      )
    }
    return this.renderButtonRow(films, totalResults)
  }

  render() {
    const { query, films, dispatchSetQuery } = this.props

    if (!films) {
      dispatchSetQuery(query)
    }
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
}

_FilmList.defaultProps = {
  query: '',
  films: null,
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
)(_FilmList)
