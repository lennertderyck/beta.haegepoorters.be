import React, { createContext, useContext, useState } from 'react';

const createdContext = createContext()
const { Provider } = createdContext;

const useContextStore = () => useContext(createdContext)

const ContextStore = ({ children }) => {
    const [ context, setContext ] = useState()
    
    return <Provider value={[ context, setContext ]}>
        { children }
    </Provider>
}

export {
    useContextStore
}
export default ContextStore