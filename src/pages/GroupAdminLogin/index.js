import React, { useEffect } from 'react';
import { Button, CenterMessage } from '../../components';
import { useVisitor } from '../../contexts/visitorContext';
import PageLayout from '../../layouts/PageLayout';
import { GET } from '../../utils';
import { initKeycloak } from '../../utils/keycloak.vendors';

const GroupAdminLogin = () => {
    const { getToken } = useVisitor()

    useEffect(() => {
        // console.log(isLoggedIn())
        // GET.PROFILE().then(d => console.log(d))
        initKeycloak(auth => {
            console.log(`Authenticated: ${ auth }`)
            if (auth) {
                console.log(getToken())
            }
        })
    }, [])

    // useEffect(() => {
    //     let initOptions = {
    //         url: 'https://login.scoutsengidsenvlaanderen.be/auth',
    //         realm: 'scouts',
    //         clientId: 'groep-O1306G-Haegepoorters-Destelbergen',
    //         redirectUri: window.location.href
    //     }
        
    //     // eslint-disable-next-line
    //     let keycloak = new Keycloak(initOptions); 
    //     keycloak.init({
    //       onLoad: 'login-required'
    //     }).then((auth) => {
    //       if (!auth) console.log('Not authenticated')
    //       else console.log('User authenticated', keycloak.token)
    //     }).catch(err => console.log({ err }))
    // }, [])

    return (
        <PageLayout
            title="Groepsadmin"
            subtitle="Meld je aan om en haal alles uit onze site"
        >
            <Button theme="button">Aanmelden</Button>
            <CenterMessage
                intro="We zetten alles voor je op"
            >
                Binnenkort kan je hier je persoonlijke gegevens bij Scouts en Gidsen Vlaanderen bekijken
            </CenterMessage>
            <small className="block mt-12 font-serif text-md">*Wij bewaren je gegevens nooit op externe madia.<br />Al je peresoonlijke data blijft veilig bij Scouts en Gidsen Vlaanderen of lokaal op je computer.</small>
        </PageLayout>
    )
}

export default GroupAdminLogin
