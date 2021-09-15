import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
import { visitorRoles } from '../data/site';
import * as keycloakServices from '../utils/keycloak.vendors';

const visitorContext = createContext();
const { Provider } = visitorContext;

const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJ5MnZ0TVVCSG01QnVsSV9iWGs0R0lpNVQtT1NvNnJWWjBrV2FLWlJSOGZFIn0.eyJleHAiOjE2MzE3MTk3NjgsImlhdCI6MTYzMTcxOTQ2OCwiYXV0aF90aW1lIjoxNjMxNzE5NDY4LCJqdGkiOiI3Yzc5MWY5MC01NzljLTQyZmItOTc3OS1mNGYxNTRhNDgwOGQiLCJpc3MiOiJodHRwczovL2xvZ2luLnNjb3V0c2VuZ2lkc2VudmxhYW5kZXJlbi5iZS9hdXRoL3JlYWxtcy9zY291dHMiLCJzdWIiOiI4MmY5ZDFjNy05OGUwLTQ1MGYtYWIyOS0wOTg5Y2IzNmNhY2UiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJncm9lcC1PMTMwNkctSGFlZ2Vwb29ydGVycy1EZXN0ZWxiZXJnZW4iLCJub25jZSI6ImNjYjI1NmZjLTZjNGQtNDlmMy05ZjA4LTQzNzBiM2I1MjE2YyIsInNlc3Npb25fc3RhdGUiOiI0M2RjMzA0NS1jYzA1LTRlZTYtYmQ2NS1lYjQwNzE2NjczOGUiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHBzOi8vYmV0YS5oYWVnZXBvb3J0ZXJzLmJlIl0sInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZ3JvZXBzYWRtaW4tZnVsbC1hY2Nlc3MgZW1haWwiLCJ1cmxzIjoiW3tcIm5hYW1cIjpcIlNjb3V0cyBlbiBHaWRzZW4gVmxhYW5kZXJlblwiLFwidXJsXCI6XCJodHRwczovL3d3dy5zY291dHNlbmdpZHNlbnZsYWFuZGVyZW4uYmVcIn0se1wibmFhbVwiOlwiSG9wcGVyXCIsXCJ1cmxcIjpcImh0dHA6Ly93d3cuaG9wcGVyLmJlXCJ9LHtcIm5hYW1cIjpcIkdyb2Vwc2FkbWluaXN0cmF0aWVcIixcInVybFwiOlwiaHR0cHM6Ly9ncm9lcHNhZG1pbi5zY291dHNlbmdpZHNlbnZsYWFuZGVyZW4uYmUvZ3JvZXBzYWRtaW5cIn0se1wibmFhbVwiOlwiLk9yZ1wiLFwidXJsXCI6XCJodHRwczovL3d3dy5zY291dHNlbmdpZHNlbnZsYWFuZGVyZW4ub3JnXCJ9LHtcIm5hYW1cIjpcIk9ua29zdGVuXCIsXCJ1cmxcIjpcImh0dHBzOi8vb25rb3N0ZW4uc2NvdXRzZW5naWRzZW52bGFhbmRlcmVuLm9yZ1wifSx7XCJuYWFtXCI6XCJWYWNhdHVyZXNcIixcInVybFwiOlwiaHR0cHM6Ly92YWNhdHVyZS5zY291dHNlbmdpZHNlbnZsYWFuZGVyZW4uYmVcIn0se1wibmFhbVwiOlwiRXZlbmVtZW50ZW5cIixcInVybFwiOlwiaHR0cHM6Ly93d3cuc2NvdXRzZW5naWRzZW52bGFhbmRlcmVuLmJlL2V2ZW5lbWVudGVuXCJ9XSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwia2xhbnRudW1tZXIiOiJJMTgxOTEiLCJuYW1lIjoiTGVubmVydCBEZSBSeWNrIiwicHJlZmVycmVkX3VzZXJuYW1lIjoibGVubmVydGRlcnljayIsImdpdmVuX25hbWUiOiJMZW5uZXJ0IiwiZmFtaWx5X25hbWUiOiJEZSBSeWNrIiwiZW1haWwiOiJsZW5ueWRlcnlja0BnbWFpbC5jb20iLCJrbGFudHByaWpzZ3JvZXAiOiJHUk9FUCJ9.XCX-oBToEhHmg6XdMr_8HRwz5M7cHO_EuDG_15C0u_-sKVkA4fuh8R7fVUf2_hs5Ww5k570vh3jLfhUv_SCS7U36Dt5nqwg_3GeinR71LQe3vUSkgZUoi2cndQsykXqOXwAd11q_9SKQGC-td2SJ1NV72Eke7Q_E0Docx7IUTBrDIaxV2V4I0Wj-GHIiYdZrxxQ422xMLatGJ6K4TS_B4nSV_j1_qmHQl_pe-CA3DfZ5KXHPI2tq7OIFxdfQRqnEMzzSc9ET2kdW9OhZb2QmzoqjskbU0XUmKxCiLxazlLsr9QK7xp5T3FNGKzkuaVlrAJ4EehgoYBG0C0Rh_OYUNg'

const useVisitor = () => useContext(visitorContext)
const VisitorProvider = ({ children }) => {
    const storedVisitorType = window.sessionStorage.getItem('visitorType');
    // const storedSensitiveHidden = window.sessionStorage.getItem('sensitiveHidden');
    
    const [ role, setType ] = useState(storedVisitorType || 'jgv')
    const [ subRole, setSubRole ] = useState()
    const [ sensitiveHidden, setSensitiveHidden ] = useState(true)
    
    useEffect(() => {
        window.sessionStorage.setItem(
            'visitorType',
            role
        )
    }, [role])
    
    // useEffect(() => {
    //     if (!sensitiveHidden) window.localStorage.setItem('sensitiveHidden', false)
    //     else window.localStorage.removeItem('sensitiveHidden')
    // }, [sensitiveHidden])

    return <Provider value={{
        visitorRoles,
        role: visitorRoles.find(({ value }) => value === role ),
        setRole: setType,
        subRole,
        setSubRole,
        sensitiveHidden,
        hideSensitive: () => setSensitiveHidden(true),
        showSensitive: () => setSensitiveHidden(false),

        // groepsadministratie
        ...keycloakServices
    }}>
        { children }
    </Provider>
}

export { useVisitor }
export default VisitorProvider