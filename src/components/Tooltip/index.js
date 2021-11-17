import React, { useRef, useEffect, useState } from 'react';
import { usePopper } from 'react-popper'
import { className } from '../../utils';

const Component = ({ children, popper, className: cls }) => {
    const activatorRef = useRef()
    const popperRef = useRef()
    const { styles, attributes } = usePopper(activatorRef.current, popperRef.current)
    
    return <>
        <div
            ref={ activatorRef }
            { ...className(
                cls
            )}
        >
            { children }
        </div>
        <div 
            ref={ popperRef }
            style={ styles.popper }
            { ...attributes.popper }
        >{ popper }</div>
    </>
}

export default Component