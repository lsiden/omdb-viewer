import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from 'respin'

import CloseButton from 'components/close-button'
import NavButton from 'components/nav-button'
import { scrollToTop } from 'components/scroll'
import { fetchFilmDetails } from 'actions/remote'
import { updateFilmDetails } from 'actions'
import { headerStyle } from 'style'
import { ESC_KEY, BANNER_TITLE } from 'omdb_constants'

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
  static keyDownListener(ev) {
    if (ev.keyCode === ESC_KEY) {
      window.history.back()
    }
  }

  componentDidMount() {
    const { dispatchFetchFilmDetails, imdbID } = this.props
    dispatchFetchFilmDetails(imdbID)
    document.addEventListener('keydown', _FilmDetails.keyDownListener)
  }

  componentWillUnmount() {
    const { dispatchEraseFilmDetails } = this.props
    dispatchEraseFilmDetails()
    document.removeEventListener('keydown', _FilmDetails.keyDownListener)
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
      return <Spinner style={spinnerStyle} size={64} />
    }
    return filmDetails && (
      <div>
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
  dispatchEraseFilmDetails: PropTypes.func.isRequired,
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
    dispatchFetchFilmDetails: (imdbID) => dispatch(fetchFilmDetails(imdbID)),
    dispatchEraseFilmDetails: () => dispatch(updateFilmDetails(null)),
  }),
)(_FilmDetails)
