import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

import { viewList } from "actions"
import { CloseButton } from "components/close-button"
import { ESC_KEY } from "constants"
import { scrollToTop } from "components/scroll"

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
  fontSize: "14pt",
  color: "#888",
}

export class FilmDetail extends React.Component {
  constructor(props) {
    const { imdbID } = props.filmDetails
    super(props)
    this.keyDownListener = this.keyDownListener.bind(this)
    this.imdbUrl = `https://www.imdb.com/title/${imdbID}`
  }

  keyDownListener(ev) {
    if (ev.keyCode === ESC_KEY) {
      this.props.dispatchViewList()
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyDownListener)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyDownListener)
  }

  renderTitle() {
    const { dispatchViewList, filmSummary } = this.props
    return (
      <div style={headerStyle}>
        <h1 style={titleStyle}>{filmSummary.Title}</h1>
        <CloseButton onClick={() => dispatchViewList()} />
      </div>
    )
  }

  renderDetails() {
    const { filmSummary, filmDetails } = this.props
    return (
      <ul style={detailsStyle}>
        <li>{filmSummary.Year}</li>
        <li>Directed by {filmDetails.Director}</li>
        <li>Written by {filmDetails.Writer}</li>
        <li>Cast: {filmDetails.Actors}</li>
        <li>Language: {filmDetails.Language}</li>
        {filmDetails.Awards && <li>Awards: {filmDetails.Awards}</li>}
        <li>Run Time: {filmDetails.Runtime}</li>
        <li>IMDB Rating: {filmDetails.imdbRating}/10</li>
        <li>Box Office: {filmDetails.BoxOffice}</li>
        {filmDetails.Website && (
          <li>
            <a href={filmDetails.Website}>Official website</a>
          </li>
        )}
        <li>
          <a href={this.imdbUrl}>{"IMDB page"}</a>
        </li>
      </ul>
    )
  }

  render() {
    const { filmSummary } = this.props
    return (
      <div style={wrapperStyle}>
        {this.renderTitle()}
        <img src={filmSummary.Poster} alt="poster" />
        {this.renderDetails()}
        <div>
          <a onClick={scrollToTop}>Top</a>
        </div>
      </div>
    )
  }
}

FilmDetail.propTypes = {
  filmSummary: PropTypes.object.isRequired,
  filmDetails: PropTypes.object,
  dispatchViewList: PropTypes.func.isRequired,
}

FilmDetail.defaultProps = {
  filmDetails: {},
}

export default connect(
  state => ({
    filmSummary: state.filmSummary,
    filmDetails: state.filmDetails,
  }),
  dispatch => ({
    dispatchViewList: () => dispatch(viewList()),
  })
)(FilmDetail)
