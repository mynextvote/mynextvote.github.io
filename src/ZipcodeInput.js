import cxs from 'cxs'
import React from 'react'

const styles = cxs({
    padding: '2em',
    fontSize: '1em',
    display: 'block',
    width: '100%' ,
    fontFamily: 'Source Sans Pro'
})

const ZipCodeInput = ({
    zipcode,
    onChange
}) =>
    <input
        autoFocus
        className={styles}
        onChange={({target: { value }}) => onChange(value)}
        placeholder="Enter your zipcode"
        type="text"
        value={zipcode}
    />

export default ZipCodeInput
