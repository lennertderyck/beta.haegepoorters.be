import { Navigate, RouteObject } from "react-router-dom";
import MainModule from "./MainModule";
import StartPage from "./pages/StartPage/StartPage";
import EventsPage from "./pages/EventsPage/EventsPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import BlogArticlePage from "./pages/BlogArticlePage/BlogArticlePage";
import TeamPage from "./pages/TeamPage/TeamPage";
import RequestBySlugPage from "./pages/RequestBySlugPage/RequestBySlugPage";
import AccountLaunchPage from "./pages/AccountLaunchPage/AccountLaunchPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import MemberCardPage from "./pages/MemberCardPage/MemberCardPage";
import OnboardingPage from "./pages/OnboardingPage/OnboardingPage";
import EventsEditPage from "./pages/EventsEditPage/EventsEditPage";
import EventsEditDetailPage from "./pages/EventsEditPage/EventsEditDetailPage";
import EventsEditorGroupPage from "./pages/EventsEditorGroupPage/EventsEditorGroupPage";
import EventsEditorEditonPage from "./pages/EventsEditorEditonPage/EventsEditorEditonPage";
import EventsEditorEventDetailPage from "./pages/EventsEditorEventDetailPage/EventsEditorEventDetailPage";
import EventEditorPage from "./pages/EventEditorPage/EventEditorPage";
import groupDataLoader from "../../utils/funcs/routingLoaders/groupData";
import AccountOverviewPage from "./pages/AccountOverviewPage/AccountOverviewPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";

const MainModuleRouter: RouteObject[] = [
    {
        path: '/',
        element: <MainModule />,
        children: [
            { path: '/', element: <StartPage />},
            { path: 'contact', children: [
                { index: true, element: <ContactPage /> },
                { path: ':group', element: <ContactPage /> },
            ]},
            { path: 'haegeprekerke', children: [
                { index: true, element: <Navigate to="kap" replace /> },
                { path: ':group', element: <EventsPage /> },
                { path: 'edit', children: [
                    { index: true, element: <EventsEditPage /> },
                ]},
                { path: 'editor', children: [
                    { index: true, element: <EventEditorPage />},
                    { path: ':group', loader: groupDataLoader, element: <EventsEditorGroupPage />, children: [
                        { path: ':edition', children: [
                            { index: true, element: <EventsEditorEditonPage />},
                        ]}
                    ]},
                    { path: ':group/:edition', children: [
                        { path: ':event', element: <EventsEditorEventDetailPage /> },
                        { path: 'new', element: <EventsEditorEventDetailPage createNew />},
                    ]}
                ]}
            ]},
            { path: 'blog', children: [
                { index: true, element: <BlogPage /> },
                { path: ':slug', element: <BlogArticlePage /> },
            ]},
            { path: 'leiding', element: <TeamPage /> },
            { path: 'groepsadmin/*', element: <Navigate to="/ga" replace />},
            { path: 'ga', children: [
                { index: true, element: <Navigate to="onboarding" /> },
                { path: '*', element: <AccountOverviewPage /> },
                { path: 'onboarding', element: <OnboardingPage /> },
                { path: 'digitale-lidkaart', element: <MemberCardPage /> },
            ]},
            { path: '*', element: <RequestBySlugPage /> },
        ]
    },
    {
        path: 'haegeprekerke/edit/:group',
        element: <EventsEditDetailPage />
    },
    {
        path: 'betalen',
        element: <PaymentPage />
    }
];

export default MainModuleRouter;