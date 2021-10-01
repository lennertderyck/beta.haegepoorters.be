import React, { createContext, useState, useContext, useEffect } from 'react';

import { siteGroups } from '../data/site';
import { activeRoles, cookieHook, findTag, GET, memberCheck } from '../utils';
import * as keycloakServices from '../utils/keycloak.vendors';
import profileData from '../data/fake/profiel.fake.json'

const visitorContext = createContext();
const { Provider } = visitorContext;

const useVisitor = () => useContext(visitorContext)
const VisitorProvider = ({ children }) => {
    const storedVisitorType = window.sessionStorage.getItem('visitorType');
    // const storedSensitiveHidden = window.sessionStorage.getItem('sensitiveHidden');
    
    const [ role, setRole ] = useState(storedVisitorType || 'kap')
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
            GET.PROFILE().then(({ data }) => {
                setProfile({
                    ...data,
                    ...memberCheck(data['functies'])
                })

                console.log('functies', findTag(data['functies']))
                // setRole()
            })
        }
    }, [])
    
    useEffect(() => {
        if (skippedSignIn) cookieHook.set('skipSignIn', skippedSignIn)
        else cookieHook.delete('skipSignIn')
    }, [skippedSignIn])
    
    return <Provider value={{
        siteGroups,
        role: siteGroups.find(({ value }) => value === role ),
        setRole: setRole,
        subRole,
        setSubRole,
        
        sensitiveHidden,
        hideSensitive: () => setSensitiveHidden(true),
        showSensitive: () => setSensitiveHidden(false),
        
        skipSignIn: setSkipSignIn,
        skippedSignIn,
        
        // groepsadministratie
        ...keycloakServices,
        profile: process.env.NODE_ENV === 'development' ? {
            ...profileData,
            ...memberCheck(profileData['functies'])
        } : profile
    }}>
        { children }
    </Provider>
}

export { useVisitor }
export default VisitorProvider