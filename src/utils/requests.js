import axios from 'axios';
import _keycl, { isLoggedIn, getToken, login, userSaved, updateToken } from './keycloak.vendors';

const _axios = async (method, url, data) => {
    const freshToken = await getToken()

    return axios({
        method,
        url,
        data,
        headers: {
            'Authorization': `Bearer ${ await freshToken }`
        }
    })
}

const GET = {
    PROFILE: () => _axios('GET', '/lid/profiel')
}

const PATCH = {
    CHANGE_EMAIL: (userId, email) => _axios('PATCH', '/lid/' + userId, { email })
}

export {
    GET,
    PATCH
}
