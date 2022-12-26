import { RouteObject } from "react-router-dom";
import MainModule from "./MainModule";
import StartPage from "./pages/StartPage/StartPage";

const MainModuleRouter: RouteObject[] = [
    {
        path: '/',
        element: <MainModule />,
        children: [
            { path: '/', element: <StartPage />}
        ]
    }
];

export default MainModuleRouter;