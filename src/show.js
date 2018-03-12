import PropTypes from 'prop-types'

export const Show =
	({when, children}) => when && children

Show.propTypes = {
  when: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired
}

export default Show
