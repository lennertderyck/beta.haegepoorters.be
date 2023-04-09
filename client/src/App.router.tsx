import {
    createBrowserRouter,
} from "react-router-dom";
import MainModuleRouter from "./modules/MainModule/MainModule.router";
import App from "./App";
import PaymentExportPage from "./modules/MainModule/pages/PaymentPage/PaymentExportPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: MainModuleRouter
    },
    {
        path: 'betalen/g/:paymentId/export',
        element: <PaymentExportPage />
    }
]);

export default router;
  