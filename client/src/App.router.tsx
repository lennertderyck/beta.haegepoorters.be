import {
    createBrowserRouter,
} from "react-router-dom";
import App from "./App";
import MainModuleRouter from "./modules/MainModule/MainModule.router";
import PaymentExportPage from "./modules/MainModule/pages/PaymentPage/PaymentExportPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: MainModuleRouter
    },
    {
        path: 'betalen/g/:paymentId/export',
        children: [
            { index: true, element: <PaymentExportPage /> },
        ]
    }
]);

export default router;
  