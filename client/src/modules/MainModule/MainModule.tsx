import { FC } from 'react';
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import MainNavigation from './components/MainNavigation/MainNavigation';

interface Props {};

const MainModule: FC<Props> = () => {
    return (
        <div className="flex h-full">
            <MainNavigation />
            <div className="flex-1 flex flex-col">
                <div className="flex-1">
                    <Outlet />
                </div>
                <div className="mt-24">
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default MainModule;