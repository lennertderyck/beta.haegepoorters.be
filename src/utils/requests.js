import axios from 'axios';
import { getToken } from './keycloak.vendors';

const access_token = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ5MnZ0TVVCSG01QnVsSV9iWGs0R0lpNVQtT1NvNnJWWjBrV2FLWlJSOGZFIn0.eyJleHAiOjE2MzE4ODE2MzcsImlhdCI6MTYzMTg4MTMzNywiYXV0aF90aW1lIjoxNjMxODc3NTgwLCJqdGkiOiI3OGU5MjJkYy01NzU3LTQyMTAtYjAzZi0xYzFkMzEzODkxMDAiLCJpc3MiOiJodHRwczovL2xvZ2luLnNjb3V0c2VuZ2lkc2VudmxhYW5kZXJlbi5iZS9hdXRoL3JlYWxtcy9zY291dHMiLCJzdWIiOiI4MmY5ZDFjNy05OGUwLTQ1MGYtYWIyOS0wOTg5Y2IzNmNhY2UiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJncm9lcC1PMTMwNkctSGFlZ2Vwb29ydGVycy1EZXN0ZWxiZXJnZW4iLCJub25jZSI6ImI2ZjBhMjY1LTRjMmEtNDNmNy05YTZiLTkzY2RmNmJhZmQ0YiIsInNlc3Npb25fc3RhdGUiOiIwMTI1Yjc2MC0yMzllLTRiZjQtOTNiNC0xMTdiN2E3NzZkNjEiLCJhY3IiOiIwIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vYmV0YS5oYWVnZXBvb3J0ZXJzLmJlIl0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZ3JvZXBzYWRtaW4tZnVsbC1hY2Nlc3MgZW1haWwiLCJ1cmxzIjoiW3tcIm5hYW1cIjpcIlNjb3V0cyBlbiBHaWRzZW4gVmxhYW5kZXJlblwiLFwidXJsXCI6XCJodHRwczovL3d3dy5zY291dHNlbmdpZHNlbnZsYWFuZGVyZW4uYmVcIn0se1wibmFhbVwiOlwiSG9wcGVyXCIsXCJ1cmxcIjpcImh0dHA6Ly93d3cuaG9wcGVyLmJlXCJ9LHtcIm5hYW1cIjpcIkdyb2Vwc2FkbWluaXN0cmF0aWVcIixcInVybFwiOlwiaHR0cHM6Ly9ncm9lcHNhZG1pbi5zY291dHNlbmdpZHNlbnZsYWFuZGVyZW4uYmUvZ3JvZXBzYWRtaW5cIn0se1wibmFhbVwiOlwiLk9yZ1wiLFwidXJsXCI6XCJodHRwczovL3d3dy5zY291dHNlbmdpZHNlbnZsYWFuZGVyZW4ub3JnXCJ9LHtcIm5hYW1cIjpcIk9ua29zdGVuXCIsXCJ1cmxcIjpcImh0dHBzOi8vb25rb3N0ZW4uc2NvdXRzZW5naWRzZW52bGFhbmRlcmVuLm9yZ1wifSx7XCJuYWFtXCI6XCJWYWNhdHVyZXNcIixcInVybFwiOlwiaHR0cHM6Ly92YWNhdHVyZS5zY291dHNlbmdpZHNlbnZsYWFuZGVyZW4uYmVcIn0se1wibmFhbVwiOlwiRXZlbmVtZW50ZW5cIixcInVybFwiOlwiaHR0cHM6Ly93d3cuc2NvdXRzZW5naWRzZW52bGFhbmRlcmVuLmJlL2V2ZW5lbWVudGVuXCJ9XSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwia2xhbnRudW1tZXIiOiJJMTgxOTEiLCJuYW1lIjoiTGVubmVydCBEZSBSeWNrIiwicHJlZmVycmVkX3VzZXJuYW1lIjoibGVubmVydGRlcnljayIsImdpdmVuX25hbWUiOiJMZW5uZXJ0IiwiZmFtaWx5X25hbWUiOiJEZSBSeWNrIiwiZW1haWwiOiJsZW5ueWRlcnlja0BnbWFpbC5jb20iLCJrbGFudHByaWpzZ3JvZXAiOiJHUk9FUCJ9.Kz45Z_EcdCfXon0Kq2E5kCoJny83QcAMBkhYKd31YlQg1m50UjbIW8G6ApHoeAQ4m9szDme15fczs-OFLoTy5586d7ccdGONEuaz8KAQAAL6sdSv8SKYAZMFUtk7oMInGNK0E50zmhcmCioz4cuS2lwI1D7TLB6pif2rvMmf_AZdSFEc-wZGAmD0JM-ZLIpGpl-v1kS00WLzvRKudiFrpu9P8kOf6h7paHPe955DVO20UtgKR2uGNt0OKaIGOpjMLD4FuZZD6Nhrr6-UIvfDS3wJ9FIgN3PRyZ-u9IIBO7OqQB2ALXfEbpYYXnyKR0BSRnpqtGqSOT--naB4dDzcDQ"

const _gaBase = async (method, url, data) => {
    const freshToken = await getToken(true)
    const req = await axios({
        method,
        url: 'https://groepsadmin.scoutsengidsenvlaanderen.be/groepsadmin/rest-ga' + url,
        data,
        headers: {
            'Authorization': `Bearer ${ process.env.NODE_ENV === 'development' ? access_token : await freshToken }`
        }
    })

    return req;
}

const _req = async (method, url, data, params) => {
    const req = await axios({
        method,
        url,
        data,
        params
    })
    
    return req
}

const set = (name, url) => {
    const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3001/api' : 'https://site.hpi.haegepoorters.be/api';
    
    return {
        [name]: baseUrl + url
    }
}

const ENDPOINTS = {
    ...set('SITE_CONFIG', '/site_config'),
    ...set('CUSTOM_FIELDS', '/custom_fields'),
    ...set('LEADER_KEYS', '/keys'),
    ...set('SURVEY_1_SITE', '/survey/1'),
}

const GET = {
    PROFILE: () => _gaBase('GET', '/lid/profiel'),
    USER_TAGS: () => _gaBase('GET', '/functie'),
    LEADER_CALENDAR: {
        url: 'https://www.googleapis.com/calendar/v3/calendars/7gpbo1ecja01hkdtpbo157v4m4@group.calendar.google.com/events',
        params: { key: 'AIzaSyDWPbXMKtMPi6cXFMtiVQrIAwwe8CWmf4A', maxResults: 4 }
    },
    GROUP_STATS: () => _gaBase('GET', '/groep/O1306G/ledenaantallen')
}

const PATCH = {
    CHANGE_EMAIL: (userId, email) => _gaBase('PATCH', '/lid/' + userId, { email })
}

export {
    GET,
    PATCH,
    ENDPOINTS
}
