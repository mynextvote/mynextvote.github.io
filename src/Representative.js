import cxs from 'cxs'
import React from 'react'

import { defaultText } from './colors'

const style = cxs({
    alignItems: 'center',
    display: 'flex',
    fontFamily: 'Source Sans Pro',
    color: defaultText
})

const Representative = ({
    firstName,
    lastName,
    title
}) =>
    <div className={style}>
        <img
            width={80}
            height={80}
            alt={`${firstName} ${lastName}`}
        />
        <h2 className={cxs({ marginLeft: '1em' })}>{`${title}. ${firstName} ${lastName}`}</h2>
    </div>

export default Representative
