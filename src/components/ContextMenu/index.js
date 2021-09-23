import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { useDetectClickOutside } from 'react-detect-click-outside';
import Fade from 'react-reveal/Fade';

import Icon from '../Icon';
import { className } from '../../utils';

const Wrapper = styled.div`
    position: fixed;
    top: ${({ position: [ x, y ]}) => y }px;
    left: ${({ position: [ x, y ]}) => x }px;
    overflow: hidden;
    z-index: 100;
`

const Item = ({ icon, label, disabled = false, callback }) => (
    <li
        onClick={ callback && callback }
        {...className(
            `flex items-center
            p-4 border-b-2 last:border-b-0 
            uppercase tracking-widest text-sm`,
            disabled ? 'opacity-40 cursor-default pointer-events-none' : 'cursor-pointer hover:bg-gray-200'
        )}
    >
        <Icon name={ icon || 'cactus' } {...className(
            'mr-3',
            !icon && 'opacity-0'
        )} size="1.2rem" />
        <span className="font-semibold whitespace-nowrap">{ label }</span>
    </li>
)

const checkIfTextSelected = () => {
    const { baseOffset, anchorOffset, focusOffset } = document.getSelection()
    const test = anchorOffset === 0 && baseOffset === 0 && focusOffset !== 0
    return test
}

const ContextMenu = () => {
    const [ isOpen, setOpen ] = useState(false);
    const [ position, setPosition ] = useState([0, 0]);
    const [ textSelected, setTextSelected] = useState(false);
    const ref = useDetectClickOutside({ onTriggered: () => {
        setOpen(false)
    }});
    
    const handleOpening = (state, event) => {
        event.preventDefault();
        
        const { clientX, clientY } = event;
        const testTextSelection = checkIfTextSelected();
        
        if (isOpen) setOpen(false)
        setTextSelected(testTextSelection)
        setPosition([ clientX, clientY])
        setOpen(p => state ? state : !p)
    }  
    
    const handleClosing = () => {
        setOpen(false)
    }
    
    useEffect(() => {
        const contextFn = (e) => handleOpening(true, e)
        // const selectionFn = () => setTextSelected(checkIfTextSelected())
        
        window.addEventListener('contextmenu', contextFn)
        
        return () => {
            window.removeEventListener('contextmenu', contextFn)
        }
    }, []) // eslint-disable-line
    
    
    return <>
        { false && <div className="fixed top-0 left-0 right-0 bottom-0 z-50" /> }
        { isOpen && <Wrapper
            position={ position }
            ref={ ref }
            onClick={ handleClosing }
            className="shadow-lg bg-white"
        >
            <Fade collapse cascade>
                <ul>
                    <Item 
                        icon="file-copy-2" 
                        label="Kopieer"
                        disabled={ !textSelected }
                        callback={() => {
                            setOpen(false)
                            console.log(window.lennert.space)
                            document.execCommand('copy')
                        }}
                    />
                    <Item icon="home-5" label="Startpagina" />
                    <Item icon="book-3" label="Haegeprekerke" />
                    <Item icon="customer-service" label="Contacteer webmaster" />
                </ul>
            </Fade>
        </Wrapper>}
    </>
}

export default ContextMenu