import { useContext, createContext, useState } from 'react';

const networkContext = createContext()
const { Provider } = networkContext;

const useNetwork = () => useContext(networkContext);
const NetworkContext = ({ children }) => {
    const test = () => navigator.onLine ? "online" : "offline";
    const [ status, setStatus ] = useState(test)
    
    function updateOnlineStatus() {
        setStatus(test())
    }
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    return <Provider value={{ 
        status
    }}>
        { children }
    </Provider>
}

export { useNetwork }
export default NetworkContext