import {
    createBrowserRouter,
} from "react-router-dom";
import MainModuleRouter from "./modules/MainModule/MainModule.router";
import App from "./App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: MainModuleRouter
    },
]);

export default router;
  