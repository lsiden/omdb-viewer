import React from 'react'
import { shallow } from 'enzyme'

import 'test-helpers/setup'
import {FilmDetail} from 'film-detail'

const films = require('./films.json').Search
let  dispatchViewList

const defaultProps = () => {
  dispatchViewList = jest.fn()
  return {
    filmSummary: films[0],
    dispatchViewList,
  }
}

const createWrapper = (props={}) => shallow(
  <FilmDetail {...{...defaultProps(), ...props}} />
)

it('renders a title', () => {
  const wrapper = createWrapper()
  expect(wrapper.text()).toEqual(expect.stringContaining(films[0].Title))
})

test('click on close invokes dispatchViewList()', () => {
  const wrapper = createWrapper()
  wrapper.find('#close-button').simulate('click')
  expect(dispatchViewList).toHaveBeenCalled()
})
