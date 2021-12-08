import * as Keycloak from 'keycloak-js';

const KEYCL_TOKEN_LIFESPAN = 300;

const config = {
    url: 'https://login.scoutsengidsenvlaanderen.be/auth',
    realm: 'scouts',
    clientId: 'groep-O1306G-Haegepoorters-Destelbergen',
    redirectUri: window.location.href
}

const initOptions = {
    token: localStorage.getItem('gaToken') || null,
    refreshToken: localStorage.getItem('gaRefreshToken') || null
}

/**
 * Keycloak instance
 */
const _keycl = new Keycloak(config);

// Methods
const initKeycloak = (callback) => {
    return _keycl
        .init(initOptions)
        .then(async (auth) => {
            if (auth) {
                await _keycl.updateToken(KEYCL_TOKEN_LIFESPAN)
                localStorage.setItem('gaToken', _keycl.token);
                localStorage.setItem('gaRefreshToken', _keycl.refreshToken);
            }
        })
        .then(callback && callback)
}

const login = _keycl.login

const logout = ({ redirectUri }) => {
    localStorage.removeItem('gaToken')
    localStorage.removeItem('gaRefreshToken')
    _keycl.logout({ redirectUri })
}

/**
 * Returns the current bearer token, the token is also saved to the localStorage if needed
 * @param { Boolean } save Whether to save the token to the localStorage
 * @returns { Promise } Bearer-token
 */
const getToken = (save) => {
    const tokenValid = !_keycl.isTokenExpired();

    return new Promise(async (resolve, reject) => {
        try {
            if (tokenValid) {
                const token = _keycl.token;
                resolve(token);
            } else {
                await updateToken(KEYCL_TOKEN_LIFESPAN);
                return resolve(_keycl.token);
            }
        } catch (error) { reject(error) }
    })
}

const isLoggedIn = () => !!_keycl.token

const updateToken = (callback) => {
    return _keycl
        .updateToken(5)
        .then(() => {
            localStorage.setItem('gaToken', _keycl.token);
            localStorage.setItem('gaRefreshToken', _keycl.refreshToken);
        })
        .then(callback && callback)
        .catch(login);
}

const getProfile = () => {
    return _keycl
        .loadUserProfile()
}

const userSaved = () => {
    const stored = localStorage.getItem('gaToken');
    
    return stored ? true : false;
}

export default _keycl
export {
    _keycl,
    initKeycloak,
    login,
    logout,
    getToken,
    isLoggedIn,
    updateToken,
    getProfile,
    userSaved
}