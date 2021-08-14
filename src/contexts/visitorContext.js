import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import { visitorRoles } from '../data/site';

const visitorContext = createContext();
const { Provider } = visitorContext;

const useVisitor = () => useContext(visitorContext)
const VisitorProvider = ({ children }) => {
    const storedVisitorType = window.sessionStorage.getItem('visitorType');
    // const storedSensitiveHidden = window.sessionStorage.getItem('sensitiveHidden');
    
    const [ role, setType ] = useState(storedVisitorType || 'jgv')
    const [ subRole, setSubRole ] = useState()
    const [ sensitiveHidden, setSensitiveHidden ] = useState(true)
    
    useEffect(() => {
        window.sessionStorage.setItem(
            'visitorType',
            role
        )
    }, [role])
    
    // useEffect(() => {
    //     if (!sensitiveHidden) window.localStorage.setItem('sensitiveHidden', false)
    //     else window.localStorage.removeItem('sensitiveHidden')
    // }, [sensitiveHidden])

    return <Provider value={{
        visitorRoles,
        role: visitorRoles.find(({ value }) => value === role ),
        setRole: setType,
        subRole,
        setSubRole,
        sensitiveHidden,
        hideSensitive: () => setSensitiveHidden(true),
        showSensitive: () => setSensitiveHidden(false)
    }}>
        { children }
    </Provider>
}

export { useVisitor }
export default VisitorProvider