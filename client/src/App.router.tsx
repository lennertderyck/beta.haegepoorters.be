import {
    createBrowserRouter,
} from "react-router-dom";
import MainModuleRouter from "./modules/MainModule/MainModule.router";

const router = createBrowserRouter([
    {
        path: "/",
        children: MainModuleRouter
    },
]);

export default router;
  