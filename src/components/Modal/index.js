import React, { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade';
import { className } from '../../utils';
import Button from '../Button';
import Icon from '../Icon';

const Modal = ({ open: initialState = false, onClose, disableOverlayClick, className: cls, title, children }) => {
    const [ open, setOpen ] = useState(initialState)
    
    const handleManualClose = () => {
        setOpen(false)
    }
    
    useEffect(() => {
        setOpen(initialState)
        if (!initialState && onClose) onClose(open)
    }, [initialState])
    
    if (!open) return null
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
            <div className="z-50 flex justify-center items-center">
                <div {...className(
                    'p-6 md:p-8 bg-white z-50 min-w-screen-2/3 md:min-w-screen-1/2',
                    cls
                )}>
                    <div className="flex justify-between items-center mb-6"> 
                        { title && <h3 className="text-gray-600 mr-6">{ title }</h3>}
                        <Button theme="clear" onClick={ handleManualClose }>  
                            <Icon name="close" size="1.6rem" />
                        </Button>
                    </div>
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