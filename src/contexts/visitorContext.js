import React, { createContext, useState, useContext, useEffect } from 'react';

import { siteGroups } from '../data/site';
import { cookieHook, GET, memberCheck } from '../utils';
import * as keycloakServices from '../utils/keycloak.vendors';
import profileData from '../data/fake/nele-profiel.fake.json'
import fakeUserTags from '../data/fake/tags.fake.json'
import { Button, Icon, Modal, PwaNotify } from '../components';

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
    const [ devTools, setDevTools ] = useState()
    const [ profile, setProfile ] = useState()
    const [ pwaInstaller, setPwaInstaller ] = useState()
    
    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
          // Prevent the mini-infobar from appearing on mobile
          e.preventDefault();
          
          // Stash the event so it can be triggered later.
          setPwaInstaller(e.prompt);
        });
        
        window.addEventListener('appinstalled', (evt) => {
            console.log('a2hs installed');
        });
    }, [])
    
    useEffect(() => {
        window.sessionStorage.setItem(
            'visitorType',
            role
        )
    }, [role])
    
    useEffect(() => {
        if (keycloakServices.userSaved()) {
            GET.PROFILE().then(({ data: profileData }) => {
                
                GET.USER_TAGS().then(({ data: tagsData }) => {
                    setProfile({
                        ...profileData,
                        ...memberCheck(profileData['functies'], tagsData.functies)
                    })
                })
            })
        }
    }, [])
    
    useEffect(() => {
        if (skippedSignIn) cookieHook.set('skipSignIn', skippedSignIn)
        else cookieHook.delete('skipSignIn')
    }, [skippedSignIn])
    
    return <Provider value={{
        /**
         * Everything that is needed for providing and reading the role of a user
         */
        siteGroups,
        role: siteGroups.find(({ value }) => value === role ),
        setRole: setRole,
        subRole,
        setSubRole,
        
        /**
         * Check if sensitive informatation such as telephone-numbers should be shown or hidden.
         * Used for spam protection
         */
        sensitiveHidden,
        hideSensitive: () => setSensitiveHidden(true),
        showSensitive: () => setSensitiveHidden(false),
        
        
        /**
         * Give users the abillity to skip the sign-in process, but still customize the site
         */
        skipSignIn: setSkipSignIn,
        skippedSignIn,
        
        // groepsadministratie
        ...keycloakServices,
        profile: process.env.NODE_ENV === 'development' ? {
            ...profileData,
            ...memberCheck(profileData['functies'], fakeUserTags.functies)
        } : profile,
        
        devTools,
        setDevTools,
        
        pwaInstaller,
        setPwaInstaller
    }}>
        {/* <PwaNotify /> */}
        { children }
    </Provider>
}

export { useVisitor }
export default VisitorProvider