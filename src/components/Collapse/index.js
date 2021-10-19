import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { className } from '../../utils';
import Button from '../Button';

const CollapseWrapper = styled.div`
    max-height: ${({ open }) => open ? '1000vh' : '0vh'};
    overflow: hidden;
    opacity: ${({ open }) => open ? '1' : '0'};
    transition: all .3s ease;
`

const Collapse = ({ label, open: defaultState, disabled, className: cls, buttonClassname, children, onClick }) => {
    const [ open, setOpen ] = useState(disabled ? 'true' : defaultState)
    
    const nestedFunction = typeof children === 'function';

    const handleOpening = () => {
        if (onClick) onClick({ isOpen: open })
        setOpen(s => !s)
    }

    useEffect(() => {
        if (defaultState) {
            console.log('DEFAULT STATE CHANGED')
            setOpen(defaultState)
        }
    }, [defaultState])

    return (<div className={ cls }>
        { (!disabled && label) && <Button 
            { ...className(buttonClassname) }
            iconAfter={ open ? 'arrow-up-s' : 'arrow-down-s'}
            theme="simple"
            type="button"
            onClick={ handleOpening }
        >{ label }</Button>}
        <CollapseWrapper open={ open }><div className="mt-3">
            { nestedFunction ? children({ isOpen: open }) : children }
        </div></CollapseWrapper>
    </div>)
}

export default Collapse