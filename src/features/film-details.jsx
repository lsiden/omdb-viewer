import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from 'respin'

import CloseButton from 'components/close-button'
import NavButton from 'components/nav-button'
import { scrollToTop } from 'components/scroll'
import { promiseFilmDetails } from 'store/async'
import { updateFilmDetails } from 'store'
import { headerStyle } from 'style'
import { ESC_KEY } from 'omdb_constants'
import Banner from 'components/banner'

const titleStyle = {
  marginBottom: '5pt',
}
const detailsStyle = {
  marginTop: 20,
  fontSize: '14pt',
}
const topButtonStyle = {
  marginBottom: 20,
}
const spinnerStyle = {
  margin: 50,
}

const itemExists = (item) => item && item !== 'N/A'
const imdbUrl = (imdbID) => `https://www.imdb.com/title/${imdbID}`
const titleBannerStyle = {
  ...headerStyle,
  display: 'flex',
  justifyContent: 'space-between',
}

export class _FilmDetails extends React.Component {
  static onKeyDown(ev) {
    if (ev.keyCode === ESC_KEY) {
      window.history.back()
    }
  }

  constructor(props) {
    super(props)
    const { dispatchFetchFilmDetails, imdbID } = this.props
    dispatchFetchFilmDetails(imdbID)
  }

  componentDidMount() {
    document.addEventListener('keydown', _FilmDetails.onKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', _FilmDetails.onKeyDown)
  }

  renderTitle() {
    const { filmDetails } = this.props
    return filmDetails && (
      <header style={titleBannerStyle}>
        <h2 style={{ ...titleStyle, marginTop: 0 }}>{filmDetails.Title}</h2>
        <CloseButton buttonStyle={{ color: 'white' }} />
      </header>
    )
  }

  renderDetails() {
    const { filmDetails } = this.props
    const FilmDetail = ({ name, label }) => (<li>{label || name}: {filmDetails[name]}</li>)
    return (
      <ul style={detailsStyle}>
        <FilmDetail name="Year" />
        <FilmDetail name="Director" />
        <FilmDetail name="Writer" />
        <FilmDetail name="Actors" label="Cast" />
        <FilmDetail name="Language" />
        {itemExists(filmDetails.Awards) && <FilmDetail name="Awards" />}
        <FilmDetail name="Runtime" label="Length" />
        <FilmDetail name="imdbRating" label="IMDB Rating" />
        <FilmDetail name="BoxOffice" />
        {
          itemExists(filmDetails.Website)
          && <FilmDetail key="Website" label="Official Website" />
        }
        <li>
          <a href={imdbUrl(filmDetails.imdbID)}>IMDB page</a>
        </li>
      </ul>
    )
  }

  static renderScrollToTopButton() {
    return (
      <NavButton
        style={topButtonStyle}
        onClick={scrollToTop}
        title="Scroll to top of page"
      >
        Top
      </NavButton>
    )
  }

  render() {
    const { filmDetails, isFetching } = this.props

    if (isFetching) {
      return (
        <div>
          <Banner />
          <Spinner style={spinnerStyle} size={64} />
        </div>
        )
    }
    return filmDetails && (
      <div>
        <Banner />
        {this.renderTitle()}
        <div style={{ marginLeft: 20 }}>
          <img
            src={filmDetails.Poster}
            alt="poster"
            style={{ marginTop: 10 }}
          />
          {this.renderDetails()}
          {_FilmDetails.renderScrollToTopButton()}
        </div>
      </div>
    )
  }
}

_FilmDetails.propTypes = {
  imdbID: PropTypes.string.isRequired,
  filmDetails: PropTypes.object,
  dispatchFetchFilmDetails: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
}
_FilmDetails.defaultProps = {
  filmDetails: null,
}

export default connect(
  (state) => ({
    filmDetails: state.filmDetails,
    isFetching: state.isFetching,
  }),
  (dispatch) => ({
    dispatchFetchFilmDetails: (imdbID) => dispatch(promiseFilmDetails(imdbID)),
  }),
)(_FilmDetails)
