import {
    createBrowserRouter,
} from "react-router-dom";
import MainModuleRouter from "./modules/MainModule/MainModule.router";
import App from "./App";
import PaymentExportPage from "./modules/MainModule/pages/PaymentPage/PaymentExportPage";
import PaymentExportPreviewPage from "./modules/MainModule/pages/PaymentPage/PaymentExportPreviewPage";

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
  