import cxs from 'cxs'
import React from 'react'

const style = cxs({ display: 'flex', alignItems: 'center' })

const Representative = ({
    firstName,
    lastName,
    title
}) =>
    <div className={style}>
        <img
            width={50}
            height={50}
            alt={`${firstName} ${lastName}`}
        />
        <h2>{`${title}. ${firstName} ${lastName}`}</h2>
    </div>

export default Representative
