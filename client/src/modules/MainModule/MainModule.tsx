import { FC } from 'react';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';

interface Props {};

const MainModule: FC<Props> = () => {
    return (
        <div className="flex flex-col h-full">
            <div className="flex-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default MainModule;