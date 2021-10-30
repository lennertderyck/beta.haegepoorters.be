import React, { useState, useEffect } from 'react';

const DelayedUnmount = ({ children, delay = 1000, when, onUnmount }) => {
    const [ displayed, setDisplayed ] = useState(when)
    
    useEffect(() => {
        if (!when) {
            console.log('when changed')
            const timeOut = setTimeout(() => {
                setDisplayed(false)
                if (onUnmount) onUnmount()
            }, delay)
            
            return clearTimeout(timeOut)
        }
    }, [when])
    
    if (displayed) return children
    else return null;
}

export default DelayedUnmount