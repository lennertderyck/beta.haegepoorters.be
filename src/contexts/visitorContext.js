import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import { visitorRoles } from '../data/site';
import { cookieHook } from '../utils';
import * as keycloakServices from '../utils/keycloak.vendors';

const visitorContext = createContext();
const { Provider } = visitorContext;

const useVisitor = () => useContext(visitorContext)
const VisitorProvider = ({ children }) => {
    const storedVisitorType = window.sessionStorage.getItem('visitorType');
    // const storedSensitiveHidden = window.sessionStorage.getItem('sensitiveHidden');
    
    const [ role, setType ] = useState(storedVisitorType || 'kap')
    const [ subRole, setSubRole ] = useState()
    const [ sensitiveHidden, setSensitiveHidden ] = useState(true)
    const [ skippedSignIn, setSkipSignIn ] = useState(cookieHook.exists('skipSignIn'))
    
    useEffect(() => {
        window.sessionStorage.setItem(
            'visitorType',
            role
        )
    }, [role])
    
    useEffect(() => {
        if (skippedSignIn) cookieHook.set('skipSignIn', skippedSignIn)
        else cookieHook.delete('skipSignIn')
    }, [skippedSignIn])
    
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
        showSensitive: () => setSensitiveHidden(false),
        
        skipSignIn: setSkipSignIn,
        skippedSignIn,
        
        // groepsadministratie
        ...keycloakServices
    }}>
        { children }
    </Provider>
}

export { useVisitor }
export default VisitorProvider