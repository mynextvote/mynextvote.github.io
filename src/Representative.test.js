import React from 'react'
import { shallow } from 'enzyme'

import Representative from './Representative'

describe('representative', () => {
    it('should properly display information about the representative', () => {
        const wrapper = shallow(<Representative firstName="Test" lastName="Repson" title="Sen." />)
    })
})
