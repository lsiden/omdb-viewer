import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { CloseButton } from "components/close-button"
import { ESC_KEY } from "constants"
import { scrollToTop } from "components/scroll"
import ButtonLink from "components/button-link"
import { fetchFilmDetails } from "actions/remote"

const wrapperStyle = {
  marginLeft: "10pt",
}
const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
}
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

const itemExists = item => item && item !== "N/A"

const imdbUrl = imdbID => `https://www.imdb.com/title/${imdbID}`

export class FilmDetail extends React.Component {
  constructor(props) {
    const { imdbID } = props
    super(props)
    this.keyDownListener = this.keyDownListener.bind(this)
    this.imdbUrl = `https://www.imdb.com/title/${imdbID}`
  }

  keyDownListener(ev) {
    if (ev.keyCode === ESC_KEY) {
      // this.props.dispatchViewList()
    }
  }

  componentWillMount() {
    const { dispatchFetchFilmDetails, imdbID } = this.props
    dispatchFetchFilmDetails(imdbID)
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyDownListener)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyDownListener)
  }

  renderTitle() {
    const { filmDetails } = this.props
    return (
      <div style={headerStyle}>
        <h1 style={titleStyle}>{filmDetails.Title}</h1>
        <CloseButton />
      </div>
    )
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

  render() {
    const { filmDetails } = this.props
    return filmDetails ? (
      <div style={wrapperStyle}>
        {this.renderTitle()}
        <img src={filmDetails.Poster} alt="poster" />
        {this.renderDetails()}
        <ButtonLink
          style={topButtonStyle}
          onClick={scrollToTop}
          title="Scroll to top of page"
        >
          Top
        </ButtonLink>
      </div>
    ) : null
  }
}

FilmDetail.propTypes = {
  imdbID: PropTypes.string.isRequired,
  filmDetails: PropTypes.object,
  dispatchFetchFilmDetails: PropTypes.func.isRequired,
}

const ConnectedFilmDetail = connect(
  state => ({
    filmDetails: state.filmDetails,
  }),
  dispatch => ({
    dispatchFetchFilmDetails: imdbID => dispatch(fetchFilmDetails(imdbID)),
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
