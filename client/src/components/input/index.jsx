import React, { Fragment } from 'react'

const Input = ({ isRequire, ...others }) => {
    return (
        <Fragment>
            <label>{others?.placeholder}</label>
            <input
                {...others}
                required={isRequire}
            />
        </Fragment>
    )
}

export default Input