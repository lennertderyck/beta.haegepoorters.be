import { FC } from 'react';
import Footer from './components/Footer/Footer';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import MainNavigation from './components/MainNavigation/MainNavigation';

interface Props {};

const MainModule: FC<Props> = () => {
    return (
        <>
            <div className="flex-1">
                <Outlet />
            </div>
            <div className="mt-12 lg:mt-24">
                <Footer />
            </div>
        </>
    )
}

export default MainModule;