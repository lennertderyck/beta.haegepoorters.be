import React from 'react';

/**
 * @typedef {"block" | "strict"} Mode
 */

/**
 * @param {String} [mode=block] {Mode}
 */

const Withauth = ({ mode = "block" }) => {
    return (
        <div>{ mode }</div>
    )
}

export default Withauth