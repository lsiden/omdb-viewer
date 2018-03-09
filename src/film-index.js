import React, { Component } from 'react'
import { connect } from 'react-redux'

import logo from './logo.svg'
import ListFilms from './list-films'
import { Actions } from './actions'

import './film-index.css'

// FIXME - for demo only
const films = require('./__tests__/films.json').Search

export const FilmIndex = () => (
	<div className="App">
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<h1 className="App-title">Welcome to React</h1>
		</header>
		<ListFilms films={films} />
	</div>
)

export default connect()(FilmIndex)
