import React, { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';

const Modal = ({ open: initialState, children }) => {
    const [ open, setOpen ] = useState(initialState)
    
    if (!open) return null
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
            <Fade bottom when={ open } collapse>
                <div className="p-6 md:p-8 bg-white z-50">
                    { typeof children === 'function' ? children({ 
                        toggle: setOpen
                    }) : children }
                </div>
            </Fade>
            <Fade when={ open } collapse>
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 h-screen w-screen" onClick={() => setOpen(false)} />
            </Fade>
        </div>
    )
}

export default Modal