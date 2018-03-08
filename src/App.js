import React, { Component } from 'react'

import logo from './logo.svg'
import ListFilms from './list-films'
import './App.css'

// FIXME - for demo only
const films = require('./__tests__/films.json').Search

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <ListFilms films={films} />
            </div>
        )
    }
}

export default App
