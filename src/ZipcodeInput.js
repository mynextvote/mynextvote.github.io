import cxs from 'cxs'
import React from 'react'

const styles = cxs({ padding: '2em', fontSize: '1em', display: 'block', width: '100%' })

const ZipCodeInput = ({
    zipcode, onChange
}) =>
    <div>
        <input
            className={styles}
            type="text"
            value={zipcode}
            placeholder="Enter your zipcode"
            autoFocus
            onChange={({target: { value }}) => onChange(value)}
        />
    </div>

export default ZipCodeInput
