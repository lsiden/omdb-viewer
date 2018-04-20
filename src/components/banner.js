import React from "react"
import QueryForm from "query-form"
import { OMDB_URL } from "constants"

const headerStyle = {
  background: "linear-gradient(to right, #000040, #3b00ff)",
  padding: "10px",
  color: "white",
}
const titleStyle = {
  fontSize: "18pt",
  marginBottom: "18pt",
}

const linkStyle = {
  color: "white",
  fontSize: "small",
}

const Banner = () => (
  <header style={headerStyle}>
    <h1 style={titleStyle}>
      {"Search Open Movie Database"}&nbsp;
      <a href={OMDB_URL} style={linkStyle}>
        (OMDB)
      </a>
    </h1>
    <QueryForm />
  </header>
)

export default Banner
