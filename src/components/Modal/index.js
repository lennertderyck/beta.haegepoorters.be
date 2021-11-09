import React, { useEffect, useState } from 'react';
import { className } from '../../utils';
import Button from '../Button';
import Icon from '../Icon';

const Modal = ({ 
    open: initialState = false, 
    onClose, 
    disableOverlayClick, 
    disableClose, 
    className: cls,
    title, 
    button, 
    buttonTheme, 
    buttonIconAfter,
    children,
    bottom
}) => {
    const [ open, setOpen ] = useState(initialState)
    
    const handleManualClose = () => {
        setOpen(false)
        if (onClose) onClose()
    }
    
    useEffect(() => {
        setOpen(initialState)
        if (!initialState && onClose) onClose(open)
    }, [initialState]) // eslint-disable-line
    
    useEffect(() => {
        console.log({ open })
        if (open === true || initialState === true) document.body.classList.add('overflow-hidden')
        else if (open === false || initialState === false) document.body.classList.remove('overflow-hidden')
    }, [open, initialState])
    
    return (
        <>
            { button && <Button theme={ buttonTheme } iconAfter={ buttonIconAfter } onClick={() => setOpen(true)}>{ button }</Button> }
            { open && (
                <div
                    {...className(
                        'fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center ',
                        bottom ? 'items-end' : 'items-center'
                    )}
                >
                    <div { ...className(
                        'z-50 flex justify-center items-center w-full',
                        bottom ? 'p-0' : 'p-6'
                    )}>
                        <div 
                            {...className(
                                'bg-white z-50 w-full lg:w-min md:min-w-screen-1/2',
                                cls
                            )}
                            style={{
                                maxHeight: '90vh',
                                overflow: 'scroll'
                            }}
                        >
                            <div className="flex justify-between items-center sticky top-0 left-0 right-0 bg-white z-30 px-6 py-6 md:px-8"> 
                                { title && <h3 className="text-gray-600 mr-6">{ title }</h3>}
                                { !disableClose && <Button theme="clear" onClick={ handleManualClose }>  
                                    <Icon name="close" size="1.6rem" />
                                </Button>}
                            </div>
                            <div className="px-6 pb-6 md:px-8 md:pb-8">
                                { typeof children === 'function' ? children({ 
                                    toggle: setOpen,
                                    handleManualClose
                                }) : children }
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60 h-screen w-screen" onClick={() => !disableOverlayClick && setOpen(false)} />
                </div>
            )}
        </>
    )
}

export default Modal