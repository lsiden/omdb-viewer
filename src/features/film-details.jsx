import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from 'respin'

import CloseButton from 'components/close-button'
import NavButton from 'components/nav-button'
import { scrollToTop } from 'components/scroll'
import { fetchFilmDetails } from 'actions/remote'
import { headerStyle as bannerHeaderStyle } from 'style'
import { ESC_KEY, BANNER_TITLE, FETCH_TIMEOUT } from 'omdb_constants'

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
const spinnerWrapperStyle = {
  height: '100vh',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
}

const spinnerStyle = {
  margin: 50,
}

const itemExists = (item) => item && item !== 'N/A'
const imdbUrl = (imdbID) => `https://www.imdb.com/title/${imdbID}`
const titleBannerStyle = {
  ...bannerHeaderStyle,
  display: 'flex',
  justifyContent: 'space-between',
}

export class _FilmDetails extends React.Component {
  static keyDownListener(ev) {
    if (ev.keyCode === ESC_KEY) {
      window.location.href = '/'
    }
  }

  constructor(props) {
    const { imdbID } = props
    super(props)
    this.imdbUrl = `https://www.imdb.com/title/${imdbID}`
  }

  componentDidMount() {
    document.addEventListener('keydown', _FilmDetails.keyDownListener)
    setTimeout(() => {
      if (!this.props.filmDetails) {
        const { dispatchFetchFilmDetails, imdbID } = this.props
        dispatchFetchFilmDetails(imdbID)
      }
    }, FETCH_TIMEOUT)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', _FilmDetails.keyDownListener)
  }

  renderTitle() {
    return (
      <header style={titleBannerStyle}>
        <div style={{ lineHeight: 1 }}>
          <h1 style={{ fontSize: 24 }}>{BANNER_TITLE}</h1>
          <br />
          <h2 style={{ ...titleStyle, marginTop: 0 }}>{this.props.filmDetails.Title}</h2>
        </div>
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
    const { filmDetails } = this.props

    if (!filmDetails) {
      return <Spinner style={spinnerStyle} size={64} />
    }
    return (
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
}
_FilmDetails.defaultProps = {
  filmDetails: null,
}

export default connect(
  (state) => ({
    filmDetails: state.filmDetails,
  }),
  (dispatch) => ({
    dispatchFetchFilmDetails: (imdbID) => dispatch(fetchFilmDetails(imdbID)),
  }),
)(_FilmDetails)
