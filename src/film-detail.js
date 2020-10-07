import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import Spinner from "respin"

import { CloseButton } from "components/close-button"
import { ESC_KEY } from "./constants"
import { scrollToTop } from "components/scroll"
import ButtonLink from "components/button-link"
import { fetchFilmDetails } from "actions/remote"
import { headerStyle as bannerHeaderStyle } from "style"
import { BANNER_TITLE, FETCH_TIMEOUT } from "./constants"

const titleStyle = {
  marginBottom: "5pt",
}
const detailsStyle = {
  marginTop: 20,
  fontSize: "14pt",
}
const topButtonStyle = {
  marginBottom: 20,
}
const spinnerWrapperStyle = {
  height: "100vh",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
}

const itemExists = (item) => item && item !== "N/A"

const imdbUrl = (imdbID) => `https://www.imdb.com/title/${imdbID}`

const titleBannerStyle = {
  ...bannerHeaderStyle,
  display: "flex",
  justifyContent: "space-between",
}

const TitleBanner = ({ title }) => (
  <header style={titleBannerStyle}>
    <div style={{ lineHeight: 1 }}>
      <h1 style={{ fontSize: 24 }}>{BANNER_TITLE}</h1>
      <br />
      <h1 style={{ ...titleStyle, marginTop: 0 }}>{title}</h1>
    </div>
    <CloseButton buttonStyle={{ color: "white" }} />
  </header>
)
TitleBanner.propTypes = {
  title: PropTypes.string.isRequired,
}

export class FilmDetail extends React.Component {
  constructor(props) {
    const { imdbID } = props
    super(props)
    this.keyDownListener = this.keyDownListener.bind(this)
    this.imdbUrl = `https://www.imdb.com/title/${imdbID}`
  }

  keyDownListener(ev) {
    if (ev.keyCode === ESC_KEY) {
      window.location.href = "/"
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyDownListener)
    setTimeout(() => {
      if (!this.props.filmDetails) {
        window.location.href = "/"
      } else {
        const { dispatchFetchFilmDetails, imdbID } = this.props
        dispatchFetchFilmDetails(imdbID)
      }
    }, FETCH_TIMEOUT)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyDownListener)
  }

  renderTitle() {
    const { filmDetails } = this.props
    return <TitleBanner title={filmDetails.Title} />
  }

  renderDetails() {
    const { filmDetails } = this.props
    return (
      <ul style={detailsStyle}>
        <li>{filmDetails.Year}</li>
        <li>Directed by {filmDetails.Director}</li>
        <li>Written by {filmDetails.Writer}</li>
        <li>Cast: {filmDetails.Actors}</li>
        <li>Language: {filmDetails.Language}</li>
        {itemExists(filmDetails.Awards) && (
          <li>Awards: {filmDetails.Awards}</li>
        )}
        <li>Run Time: {filmDetails.Runtime}</li>
        <li>IMDB Rating: {filmDetails.imdbRating}/10</li>
        <li>Box Office: {filmDetails.BoxOffice}</li>
        {itemExists(filmDetails.Website) && (
          <li>
            <a href={filmDetails.Website}>Official website</a>
          </li>
        )}
        <li>
          <a href={imdbUrl(filmDetails.imdbID)}>{"IMDB page"}</a>
        </li>
      </ul>
    )
  }

  renderScrollToTopButton() {
    return (
      <ButtonLink
        style={topButtonStyle}
        onClick={scrollToTop}
        title="Scroll to top of page"
      >
        Top
      </ButtonLink>
    )
  }

  render() {
    const { filmDetails, isFetching } = this.props
    return isFetching ? (
      <div style={spinnerWrapperStyle}>
        <Spinner size={64} />
      </div>
    ) : filmDetails ? (
      <React.Fragment>
        {this.renderTitle()}
        <div style={{ marginLeft: 20 }}>
          <img
            src={filmDetails.Poster}
            alt="poster"
            style={{ marginTop: 10 }}
          />
          {this.renderDetails()}
          {this.renderScrollToTopButton()}
        </div>
      </React.Fragment>
    ) : null
  }
}

FilmDetail.propTypes = {
  imdbID: PropTypes.string.isRequired,
  filmDetails: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  dispatchFetchFilmDetails: PropTypes.func.isRequired,
}

const ConnectedFilmDetail = connect(
  (state) => ({
    filmDetails: state.filmDetails,
    isFetching: !!state.isFetching,
  }),
  (dispatch) => ({
    dispatchFetchFilmDetails: (imdbID) => dispatch(fetchFilmDetails(imdbID)),
  })
)(FilmDetail)

const RoutedFilmDetail = ({ match }) => {
  const { imdbID } = match.params
  return <ConnectedFilmDetail imdbID={imdbID} />
}

RoutedFilmDetail.propTypes = {
  match: PropTypes.object.isRequired,
}

export default RoutedFilmDetail
