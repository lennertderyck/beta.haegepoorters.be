import { FC } from 'react';
import {
    RouterProvider,
} from "react-router-dom";
import router from './App.router';
import './scss/index.scss';

interface Props {};

const App: FC<Props> = () => {
    return (
        <>
            <RouterProvider router={ router } />
        </>
    )
}

export default App;