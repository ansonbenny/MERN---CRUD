import React, { Fragment } from 'react'

const Input = ({ type, placeHolder, name, className, isRequire, onInputHandle, notLab }) => {
    return (
        <Fragment>
            <label>{placeHolder}</label>
            <input
                className={className}
                type={type ? type : 'text'}
                name={name}
                placeholder={placeHolder}
                required={isRequire}
                onInput={onInputHandle}
            />
        </Fragment>
    )
}

export default Input