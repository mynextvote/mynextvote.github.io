import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import ZipCodeInput from './ZipCodeInput'

describe('ZipCodeInput', () => {

    const zip = 12345

    it('should call the provided change handler when typing occurs', () => {
        const onChange = sinon.spy()
        const wrapper = shallow(<ZipCodeInput onChange={onChange} />)

        wrapper.find('input').simulate('change', { target: { value: zip }})
        expect(onChange.called).toEqual(true)
    })

    it('should display a zipcode value when provided', () => {
        const wrapper = shallow(<ZipCodeInput zipcode={zip} />)
        expect(wrapper.find('input').props().value).toEqual(zip)
    })

})
