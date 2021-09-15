import axios from 'axios';
import _keycl, { isLoggedIn, getToken, login, initKeycloak } from './keycloak.vendors';

const _axios = token => axios.create({
    baseURL: 'https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga',
    headers: {
        'Authorization': `Bearer ${ token }`
    }
})


const base = (manualToken) => {
    // check if authenticated
    const authenticated = manualToken || isLoggedIn()
    console.log({ authenticated })
    if (!authenticated) {
        initKeycloak()
        return;
    }
    
    return _axios(manualToken || getToken())
}

const GET = {
    PROFILE: () => base().get('/lid/profiel')
}

export {
    GET
}
