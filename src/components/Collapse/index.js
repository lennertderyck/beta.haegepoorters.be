import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';

const CollapseWrapper = styled.div`
    max-height: ${({ open }) => open ? '100vh' : '0vh'};
    overflow: hidden;
    opacity: ${({ open }) => open ? '1' : '0'};
    transition: all .3s ease;
`

const Collapse = ({ label, open: defaultState, className, children }) => {
    const [ open, setOpen ] = useState(defaultState)
    
    return (<div className={ className }>
        <Button 
            iconAfter="arrow-down-s"
            theme="simple"
            onClick={() => setOpen(s => !s)}
        >{ label }</Button>
        <CollapseWrapper open={ open }><div className="mt-3">
            { children }
        </div></CollapseWrapper>
    </div>)
}

export default Collapse