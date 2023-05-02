import { FC } from 'react';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import useConnectionState from '../../utils/hooks/useConnectionState/useConnectionState';
import OfflineStatusPage from './pages/OfflineStatusPage/OfflineStatusPage';

interface Props {};

const MainModule: FC<Props> = () => {
    const online = useConnectionState();
    
    if (online) return (
        <>
            <div className="flex-1">
                <Outlet />
            </div>
            <div className="mt-12 lg:mt-24">
                <Footer />
            </div>
        </>
    ) 
    else return <OfflineStatusPage />
}

export default MainModule;