import React from "react"
import TestRenderer from 'react-test-renderer';
import { StaticRouter } from 'react-router'
import { Provider } from 'react-redux'
import FilmTitle from "film-title"

import { FilmList } from "film-list"
import store from 'actions/store'

const defaultProps = {
  dispatchUpdateFilms: () => {},
}
const films = require("./films.json").Search

it("renders list of titles", () => {
  const testInstance = TestRenderer.create(<StaticRouter context={{}}>
		<Provider store={store}>
			<FilmList { ...{films, ...defaultProps} } />
		</Provider>
	</StaticRouter>)
  const filmTitles = testInstance.root.findAllByType(FilmTitle)
  expect(filmTitles).toHaveLength(films.length)
})
