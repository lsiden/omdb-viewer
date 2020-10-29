import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import FilmTitle from 'components/film-title'
import { getFilms } from 'store'

const ulStyle = {
  listStyleType: 'none',
  lineHeight: 1.5,
  marginTop: 20,
}

export const _FilmList = ({ films }) => (
  <ul style={ulStyle}>
    {films.map((film) => (
      <FilmTitle key={film.imdbID} filmSummary={film} />
    ))}
  </ul>
)

_FilmList.propTypes = {
  films: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default connect(
  (state) => ({
    films: getFilms(state),
  }),
)(_FilmList)
