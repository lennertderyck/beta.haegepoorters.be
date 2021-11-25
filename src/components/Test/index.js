import React, { useRef, useEffect } from 'react';

const Test = ({ children }) => {
    const testRef = useRef()
    
    useEffect(() => {
        console.log('testRef', testRef)
    }, [testRef])
    
    return { ...children, ref: testRef }
}

export default Test