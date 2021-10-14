import React, { useEffect, useRef, useState } from 'react';

const Component = ({ children }) => {
    const ref = useRef()
    const [ newChild, setNewChild ] = useState()
    
    const isOnlyChild = typeof children === 'object';
    
    useEffect(() => {
        if (isOnlyChild) {
            const nC = {...children}
            nC.ref = ref;
            setNewChild(nC)
        }
    }, [])
    
    useEffect(() => {
        if (ref?.current) ref.current.setAttribute('data-recording-sensitive', '')
    }, [newChild])
    

    if (!isOnlyChild) return null
    return (
        <>
            { newChild }
        </>
    )
}

export default Component