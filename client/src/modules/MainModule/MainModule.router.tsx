import { Navigate, RouteObject } from "react-router-dom";
import MainModule from "./MainModule";
import StartPage from "./pages/StartPage/StartPage";
import EventsPage from "./pages/EventsPage/EventsPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import BlogArticlePage from "./pages/BlogArticlePage/BlogArticlePage";
import TeamPage from "./pages/TeamPage/TeamPage";
import RequestBySlugPage from "./pages/RequestBySlugPage/RequestBySlugPage";
import AccountPage from "./pages/AccountPage/AccountPage";
import ContactPage from "./pages/ContactPage/ContactPage";

const MainModuleRouter: RouteObject[] = [
    {
        path: '/',
        element: <MainModule />,
        children: [
            { path: '/', element: <StartPage />},
            { path: 'contact', element: <ContactPage /> },
            { path: 'haegeprekerke', children: [
                { index: true, element: <Navigate to="kap" replace /> },
                { path: ':group', element: <EventsPage /> },
            ]},
            { path: 'blog', children: [
                { index: true, element: <BlogPage /> },
                { path: ':slug', element: <BlogArticlePage /> },
            ]},
            { path: 'leiding', element: <TeamPage /> },
            { path: '*', element: <RequestBySlugPage /> },
            { path: 'groepsadmin', children: [
                { index: true, element: <AccountPage /> },
                { path: '*', element: <AccountPage /> }
            ]}
        ]
    }
];

export default MainModuleRouter;