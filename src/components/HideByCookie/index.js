import React, { useState  } from 'react';
import { cookieHook } from '../../utils';

const HideByCookie = ({ name, children }) => {
    const isHidden = cookieHook.exists('hidden:' + name)
    
    const [ hidden, setHidden ] = useState(isHidden);
    
    const handleHide = () => {
        setHidden(true)
        cookieHook.set('hidden:' + name, true)
    }
    
    if (hidden) return null
    return typeof children === 'function' ? children({ hide: handleHide }) : children
}

export default HideByCookie