import React, { useEffect } from 'react';
import { CenterMessage } from '../../components';
import PageLayout from '../../layouts/PageLayout';
import * as Keycloak from 'keycloak-js';
// import * as Keycloak from 'keycloak-js';

const GroupAdminLogin = () => {
    useEffect(() => {
        // https://login.scoutsengidsenvlaanderen.be/auth/realms/scouts/protocol/openid-connect/auth?client_id=groepsadmin-production-client&redirect_uri=https%3A%2F%2Fgroepsadmin.scoutsengidsenvlaanderen.be%2Fgroepsadmin%2Fclient%2F%23%2Fgroepsinstellingen&state=d8145be6-578e-44cb-8c96-614f7bfbf104&response_mode=fragment&response_type=code&scope=openid&nonce=a02fcf95-4818-45b3-bd3d-2635308eff58
        // https://login.scoutsengidsenvlaanderen.be/auth/realms/master/protocol/openid-connect/token
        // https://login.scoutsengidsenvlaanderen.be/auth/realms/scouts/protocol/openid-connect/auth?client_id=groepsadmin-production-client&redirect_uri=https://groepsadmin.scoutsengidsenvlaanderen.be/client&state=308524a1-fbab-4e19-896f-f209fa7cf758&response_mode=fragment&response_type=code&scope=openid&nonce=4ed52399-dc15-4986-8e98-943b4fe849ff
        // https://login.scoutsengidsenvlaanderen.be/auth/realms/scouts/protocol/openid-connect/auth?client_id=groepsadmin-production-client&redirect_uri=https://groepsadmin.scoutsengidsenvlaanderen.be.haegepoorters.be
        // https://login.scoutsengidsenvlaanderen.be/auth/realms/scouts/protocol/openid-connect/login-status-iframe.html/init?client_id=groepsadmin-production-client&origin=http%3A%2F%2Flocalhost%3A3000
        // https://login.scoutsengidsenvlaanderen.be/auth/realms/scouts/protocol/openid-connect/auth?client_id=groepsadmin-production-client&origin=http%3A%2F%2Flocalhost%3A3000
        // https://login.scoutsengidsenvlaanderen.be/auth/realms/scouts/protocol/openid-connect/auth?client_id=groepsadmin-production-client&redirect_uri=https://localhost:3000&state=e4cc12c4-7d54-4f12-8bbc-612b39a87bf4&response_mode=fragment&response_type=code&scope=openid&nonce=a5c95309-0fa5-4f37-8541-0bc0c459e74a
        // https://login.scoutsengidsenvlaanderen.be/auth/realms/scouts/protocol/openid-connect/auth?client_id=groepsadmin-production-client&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fga&state=7824175e-d237-47fe-8fcf-9638d40e002d&response_mode=fragment&response_type=code&scope=openid&nonce=4a099a2b-d140-4aad-9e1a-e233114e50b3
        // https://login.scoutsengidsenvlaanderen.be/auth/realms/scouts/protocol/openid-connect/auth?client_id=groepsadmin-production-client&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fga&state=f946f025-2d3d-4cf4-86d1-01c3395e855d&response_mode=fragment&response_type=code&scope=openid&nonce=581ac3f5-5514-40ab-b9ad-1f82ef3a2f01
        
        let initOptions = {
            url: 'https://login.scoutsengidsenvlaanderen.be/auth',
            realm: 'scouts',
            clientId: 'groep-O1306G-Haegepoorters-Destelbergen',
            redirectUri: window.location.href
        }
        
        // eslint-disable-next-line
        let keycloak = new Keycloak(initOptions); 
        keycloak.init({
          onLoad: 'login-required'
        }).then((auth) => {
          if (!auth) console.log('Not authenticated')
          else console.log('User authenticated', keycloak.token)
        }).catch(err => console.log({ err }))
    }, [])

    return (
        <PageLayout
            title="Groepsadmin"
            subtitle="Meld je aan om en haal alles uit onze site"
        >
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
