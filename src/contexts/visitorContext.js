import React, { createContext, useState, useContext, useEffect } from 'react';

import { visitorRoles } from '../data/site';
import { cookieHook, GET } from '../utils';
import * as keycloakServices from '../utils/keycloak.vendors';
import profileData from '../data/fake/profiel.fake.json'

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
    
    const [ profile, setProfile ] = useState()
    
    useEffect(() => {
        window.sessionStorage.setItem(
            'visitorType',
            role
        )
    }, [role])
    
    useEffect(() => {
        if (keycloakServices.userSaved()) {
            GET.PROFILE().then(({ data }) => setProfile(data))
        }
    }, [])
    
    useEffect(() => {
        if (skippedSignIn) cookieHook.set('skipSignIn', skippedSignIn)
        else cookieHook.delete('skipSignIn')
    }, [skippedSignIn])
    
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
        ...keycloakServices,
        profile: process.env.NODE_ENV === 'development' ? profileData : profile;
    }}>
        { children }
    </Provider>
}

export { useVisitor }
export default VisitorProvider