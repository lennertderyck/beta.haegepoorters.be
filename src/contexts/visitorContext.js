import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import { visitorRoles } from '../data/site';

const visitorContext = createContext();
const { Provider} = visitorContext;

const useVisitor = () => useContext(visitorContext)
const VisitorProvider = ({ children }) => {
    const storedVisitorType = window.sessionStorage.getItem('visitorType');
    const [ type, setType ] = useState(storedVisitorType || 'oud')
    const [ sensitiveHidden, setSensitiveHidden ] = useState(true)
    
    useEffect(() => {
        window.sessionStorage.setItem(
            'visitorType',
            type
        )
    }, [type])

    return <Provider value={{
        visitorRoles,
        role: visitorRoles.find(({ value }) => value === type ),
        setRole: setType,
        sensitiveHidden,
        hideSensitive: () => setSensitiveHidden(true),
        showSensitive: () => setSensitiveHidden(false)
    }}>
        { children }
    </Provider>
}

export { useVisitor }
export default VisitorProvider