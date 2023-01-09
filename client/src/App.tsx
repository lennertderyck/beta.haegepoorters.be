import { FC } from 'react';
import {
    Outlet,
    RouterProvider, ScrollRestoration,
} from "react-router-dom";
import router from './App.router';
import './scss/index.scss';
import MainNavigation from './modules/MainModule/components/MainNavigation/MainNavigation';
import Footer from './modules/MainModule/components/Footer/Footer';

interface Props {};

const App: FC<Props> = () => {
    return (
        <>
            <ScrollRestoration />
            <div className="flex h-full">
                <MainNavigation />
                <div className="flex-1 flex flex-col">
                    <div className="flex-1">
                        <Outlet />
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default App;