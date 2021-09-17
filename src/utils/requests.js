import axios from 'axios';
import _keycl, { isLoggedIn, getToken, login, userSaved, updateToken } from './keycloak.vendors';

const _axios = token => axios.create({
    baseURL: 'https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga',
    headers: {
        'Authorization': `Bearer ${ token }`
    }
})


const request = async (method, url, manualToken) => {
    // check if authenticated
    // const authenticated = _keycl.token
    // const wasSaved = userSaved()
    
    // if (!authenticated && wasSaved) {
    //     await updateToken()
    //     return requestBase
    // } 
    // else if (!authenticated && !wasSaved) {
    //     login()
    //     return requestBase
    // }

    return _axios(manualToken || getToken())
}

const GET = {
    PROFILE: () => request().get('/lid/profiel')
}

const PATCH = {
    CHANGE_EMAIL: (userId, email) => request().patch('/lid/' + userId, { email })
}

export {
    GET,
    PATCH
}
