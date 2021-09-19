import React, { createContext, useContext, useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const collapseContext = createContext();
const { Provider } = collapseContext;
const useCollapse = () => useContext(collapseContext);

const CollapseGroup = ({ initalState, children }) => {
    const ref = useRef();
    const { openChild, setOpenChild } = useCollapse();
    const [ isOpen, setOpen ] = useState(initalState);
    
    const handleCollapse = ({ target }) => {
        setOpenChild(target);
        setOpen(true);
    }
    
    useEffect(() => {
        ref.current !== openChild && setOpen(false)
    }, [ openChild ])
    
    return (
        <div onClick={ handleCollapse } ref={ ref }>
            { children }
        </div>
    )
}

const CollapseWrapper = ({ children }) => {
    const [ openChild, setOpenChild ] = useState();
    
    return (
        <Provider value={{
            openChild,
            setOpenChild
        }}>
            { children }
        </Provider>
    )
}

export { 
    useCollapse, 
    CollapseGroup
}
export default CollapseWrapper