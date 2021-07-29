import React, { useState } from 'react';
import ReactVisibilitySensor from 'react-visibility-sensor';

const InViewport = ({ children, otherProps }) => {
    const [ visible, setVisible ] = useState(false)
    
    // const handleChange = (state) => {
    //     console.log('state', state)
    //     if (!visible && state) setVisible(true)
    // }
    
    return (
        <ReactVisibilitySensor onChange={ e => console.log({e}) } { ...otherProps }>
            {
                children(visible)
            }
        </ReactVisibilitySensor>
    )
}

export default InViewport