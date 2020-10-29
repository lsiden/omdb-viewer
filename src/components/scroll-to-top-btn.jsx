import React from 'react'

const btnStyle = {
  marginLeft: 40,
  fontSize: 16,
  color: 'darkgrey',
}

class ScrollToTopButton extends React.Component {
  constructor(props) {
    super(props)
    this.toggleVisibility = this.toggleVisibility.bind(this)
    this.state = {
      isVisible: this.hasScrollbar()
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.toggleVisibility)
    window.addEventListener('scroll', this.toggleVisibility)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.toggleVisibility)
    window.removeEventListener('scroll', this.toggleVisibility)
  }

  scrollToTop() {
    window.scrollTo(0, 0)
  }

  hasScrollbar() {
    return window.scrollY > 0
  }

  toggleVisibility() {
    this.setState({
      isVisible: this.hasScrollbar()
    })
  }

  render() {
    return this.state.isVisible && (
      <button
        type="button"
        onClick={this.scrollToTop}
        title="Scroll To Top"
        className="btn btn-link"
        style={btnStyle}
      >
        Scroll To Top
      </button>
    )
  }
}

export default ScrollToTopButton
