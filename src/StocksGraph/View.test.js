import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import View from './View'

configure({ adapter: new Adapter() })

describe('View', () => {
    it('Rendering', () => {
        const wrapper = shallow(<View/>)
        expect(wrapper.find('.viewTitle')).toBeDefined()
        expect(wrapper.find('.viewTitle').text()).toEqual('FAAMG stocks volume chart')
    })
})
