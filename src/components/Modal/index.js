import React, { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
import { className } from '../../utils';

const Modal = ({ open: initialState = false, onClose, disableOverlayClick, className: cls, children }) => {
    const [ open, setOpen ] = useState(initialState)
    
    useEffect(() => {
        setOpen(initialState)
        if (!initialState && onClose) onClose(open)
    }, [initialState])
    
    if (!open) return null
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
            <div className="z-50 flex justify-center items-center">
                <div {...className(
                    'p-6 md:p-8 bg-white z-50',
                    cls
                )}>
                    { typeof children === 'function' ? children({ 
                        toggle: setOpen
                    }) : children }
                </div>
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 h-screen w-screen" onClick={() => !disableOverlayClick && setOpen(false)} />
        </div>
    )
}

export default Modal