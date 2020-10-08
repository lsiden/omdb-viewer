import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FilmTitle from 'film-title'
import MoreButton from 'components/more-button'
import { scrollToTop, scrollToBottom } from 'components/scroll'
import ButtonLink from 'components/button-link'
import QueryForm from 'query-form'
import { headerStyle, titleStyle } from 'style'
import { setQuery } from 'actions'
import { BANNER_TITLE, TITLE_COLOR } from './constants'

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

const renderFilmList = ({ films = [], totalResults = 0 }) => (
  <div>
    <Banner />
    {films.length === 0 ? (
      <div>
        <div style={msgStyle}>
          There are no films that match your query.
        </div>
      </div>
    ) : (
      <div>
        <ul style={ulStyle}>
          {films.map((filmSummary) => (
            <FilmTitle key={filmSummary.imdbID} filmSummary={filmSummary} />
          ))}
        </ul>
        <div style={bottomRowStyle}>
          {films.length < totalResults && <MoreButton />}
          <ButtonLink
            onClick={scrollToTop}
            style={topButtonStyle}
            title="Scroll to top of page"
          >
            top
          </ButtonLink>
        </div>
      </div>
    )}
  </div>
)

renderFilmList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object),
  totalResults: PropTypes.number,
}

renderFilmList.defaultProps = {
  films: [],
  totalResults: 0,
}

class FilmList extends React.Component {
  componentDidUpdate() {
    scrollToBottom()
  }

  /* eslint-disable-next-line class-methods-use-this */
  componentDidCatch(err, errInfo) {
    console.error(err, errInfo)
  }

  render() {
    return renderFilmList(this.props)
  }
}

const ConnectedFilmList = connect((state) => ({
  films: state.films,
  totalResults: state.totalResults,
}))(FilmList)

const RoutedFilmList = ({ match, dispatchSetQuery }) => {
  dispatchSetQuery(match.params.query)
  return <ConnectedFilmList />
}

RoutedFilmList.propTypes = {
  match: PropTypes.object.isRequired,
  dispatchSetQuery: PropTypes.func.isRequired,
}

export default connect(null, (dispatch) => ({
  dispatchSetQuery: (query) => dispatch(setQuery(query)),
}))(RoutedFilmList)
