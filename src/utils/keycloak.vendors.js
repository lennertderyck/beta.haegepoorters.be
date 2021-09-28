import * as Keycloak from 'keycloak-js';

const manualToken = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ5MnZ0TVVCSG01QnVsSV9iWGs0R0lpNVQtT1NvNnJWWjBrV2FLWlJSOGZFIn0.eyJleHAiOjE2MzE3MzIxMDAsImlhdCI6MTYzMTczMTgwMCwiYXV0aF90aW1lIjoxNjMxNzMwNDE0LCJqdGkiOiJlYzIxMGM4Zi1lYTNkLTQwNjMtYTY2Ni1iYTE4OTA1ODA3MjciLCJpc3MiOiJodHRwczovL2xvZ2luLnNjb3V0c2VuZ2lkc2VudmxhYW5kZXJlbi5iZS9hdXRoL3JlYWxtcy9zY291dHMiLCJzdWIiOiI4MmY5ZDFjNy05OGUwLTQ1MGYtYWIyOS0wOTg5Y2IzNmNhY2UiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJncm9lcC1PMTMwNkctSGFlZ2Vwb29ydGVycy1EZXN0ZWxiZXJnZW4iLCJub25jZSI6IjM5YTY3ZDg0LWQxYmYtNDJhOS04ZTczLTAwZDRjMjg4NTJmOCIsInNlc3Npb25fc3RhdGUiOiIxNWZkZTA3Yi05YzgzLTQyNTgtOTY0MS05YzEyNjZhYjkxNWUiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vYmV0YS5oYWVnZXBvb3J0ZXJzLmJlIl0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZ3JvZXBzYWRtaW4tZnVsbC1hY2Nlc3MgZW1haWwiLCJ1cmxzIjoiW3tcIm5hYW1cIjpcIlNjb3V0cyBlbiBHaWRzZW4gVmxhYW5kZXJlblwiLFwidXJsXCI6XCJodHRwczovL3d3dy5zY291dHNlbmdpZHNlbnZsYWFuZGVyZW4uYmVcIn0se1wibmFhbVwiOlwiSG9wcGVyXCIsXCJ1cmxcIjpcImh0dHA6Ly93d3cuaG9wcGVyLmJlXCJ9LHtcIm5hYW1cIjpcIkdyb2Vwc2FkbWluaXN0cmF0aWVcIixcInVybFwiOlwiaHR0cHM6Ly9ncm9lcHNhZG1pbi5zY291dHNlbmdpZHNlbnZsYWFuZGVyZW4uYmUvZ3JvZXBzYWRtaW5cIn0se1wibmFhbVwiOlwiLk9yZ1wiLFwidXJsXCI6XCJodHRwczovL3d3dy5zY291dHNlbmdpZHNlbnZsYWFuZGVyZW4ub3JnXCJ9LHtcIm5hYW1cIjpcIk9ua29zdGVuXCIsXCJ1cmxcIjpcImh0dHBzOi8vb25rb3N0ZW4uc2NvdXRzZW5naWRzZW52bGFhbmRlcmVuLm9yZ1wifSx7XCJuYWFtXCI6XCJWYWNhdHVyZXNcIixcInVybFwiOlwiaHR0cHM6Ly92YWNhdHVyZS5zY291dHNlbmdpZHNlbnZsYWFuZGVyZW4uYmVcIn0se1wibmFhbVwiOlwiRXZlbmVtZW50ZW5cIixcInVybFwiOlwiaHR0cHM6Ly93d3cuc2NvdXRzZW5naWRzZW52bGFhbmRlcmVuLmJlL2V2ZW5lbWVudGVuXCJ9XSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwia2xhbnRudW1tZXIiOiJJMTgxOTEiLCJuYW1lIjoiTGVubmVydCBEZSBSeWNrIiwicHJlZmVycmVkX3VzZXJuYW1lIjoibGVubmVydGRlcnljayIsImdpdmVuX25hbWUiOiJMZW5uZXJ0IiwiZmFtaWx5X25hbWUiOiJEZSBSeWNrIiwiZW1haWwiOiJsZW5ueWRlcnlja0BnbWFpbC5jb20iLCJrbGFudHByaWpzZ3JvZXAiOiJHUk9FUCJ9.hji3dcZAbfJhvc8GLvLPDTF4QIxIo-AWaiHmsrwVCXHr76OvpJd4_TE8Q1Z1_Ki6ozty5MuP_mZP39oMA91IEu60en8-fyh3tlMgrLnC93pg-PNRpH5uC3uWOAHfheXiudILogobHMVAcYteBWrqpnVBy5lCYdbzIN0Z2zV3d_ngsYTlfzKV5YeOTjzGiYoVHnxEg9msefFuiRH1WtNJjcPoBHLqS0fTCo2C_EU9eNf1OOkwEeS0Nk-AtZmK1N1Ye1ShDeazLB6m6RJuoaKjaiSaHBK77ChatjEIe8QFYUbvdxosO92RKbtMWfnYxU9LtaHdh-n0qekhHTreilhPRg'

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

// Keycloak instance
const _keycl = new Keycloak(config);

// Methods
const initKeycloak = (callback) => {
    return _keycl
        .init(initOptions)
        .then((auth) => {
            if (auth) {
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
                await updateToken();
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
    manualToken,
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