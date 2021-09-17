import axios from 'axios';
import _keycl, { isLoggedIn, getToken, login, userSaved, updateToken } from './keycloak.vendors';

const _axios = async (manualToken) => {
    const freshToken = await getToken()
    axios.create({
        baseURL: 'https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga',
        headers: {
            'Authorization': `Bearer ${ await freshToken }`
        }
    })
}


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
    PROFILE: () => _axios().get('/lid/profiel')
}

const PATCH = {
    CHANGE_EMAIL: (userId, email) => _axios().patch('/lid/' + userId, { email })
}

export {
    GET,
    PATCH
}
