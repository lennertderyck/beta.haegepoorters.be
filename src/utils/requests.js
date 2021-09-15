import axios from 'axios';
import _keycl, { isLoggedIn, getToken, login, initKeycloak } from './keycloak.vendors';

const _axios = token => axios.create({
    baseURL: 'https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga',
    headers: {
        'Authorization': `Bearer ${ token }`
    }
})


const request = (method, url, manualToken) => {
    // check if authenticated
    const authenticated = getToken()
    
    if (!authenticated) {
        _keycl.login()
        return;
    }
    
    return _axios(manualToken || getToken())
}

const GET = {
    PROFILE: () => request().get('/lid/profiel')
}

export {
    GET
}
