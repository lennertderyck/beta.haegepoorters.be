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
    const authenticated = manualToken || getToken()
    console.log({ authenticated })
    
    if (!authenticated) {
        initKeycloak()
        return new Promise((resolve, reject) => resolve());
    }
    
    return _axios(manualToken || getToken())[method](url)
}

const GET = {
    PROFILE: () => request('GET', '/lid/profiel')
}

export {
    GET
}
