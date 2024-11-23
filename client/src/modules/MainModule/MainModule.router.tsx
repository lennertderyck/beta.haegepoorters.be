import { Navigate, RouteObject } from "react-router-dom";
import CreateNewEventPage from "../../components/pages/CreateNewEventPage/CreateNewEventPage";
import EventsTimelineGroupPage from "../../components/pages/EventsTimelineGroupPage/EventsTimelineGroupPage";
import EventsTimelineRootPage from "../../components/pages/EventsTimelineRootPage/EventsTimelineRootPage";
import groupDataLoader from "../../utils/funcs/routingLoaders/groupData";
import MainModule from "./MainModule";
import AccountIndexPage from "./pages/AccountIndexPage/AccountIndexPage";
import AccountOverviewPage from "./pages/AccountOverviewPage/AccountOverviewPage";
import BlogArticlePage from "./pages/BlogArticlePage/BlogArticlePage";
import BlogPage from "./pages/BlogPage/BlogPage";
import ContactPage from "./pages/ContactPage/ContactPage";
import EventEditorOverviewPage from "./pages/EditorV2/EventEditorOverviewPage/EventEditorOverviewPage";
import EventEditPage from "./pages/EventEditPage/EventEditPage";
import EventEditorPage from "./pages/EventEditorPage/EventEditorPage";
import EventsEditorEditonPage from "./pages/EventsEditorEditonPage/EventsEditorEditonPage";
import EventsEditorEventDetailPage from "./pages/EventsEditorEventDetailPage/EventsEditorEventDetailPage";
import EventsEditorGroupPage from "./pages/EventsEditorGroupPage/EventsEditorGroupPage";
import EventsEditorGroupPageV2 from "./pages/EventsEditorGroupPageV2/EventsEditorGroupPageV2";
import MemberCardPage from "./pages/MemberCardPage/MemberCardPage";
import OnboardingPage from "./pages/OnboardingPage/OnboardingPage";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import RequestBySlugPage from "./pages/RequestBySlugPage/RequestBySlugPage";
import StartPage from "./pages/StartPage/StartPage";
import TeamPage from "./pages/TeamPage/TeamPage";

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
                // { path: ':group', element: <EventsPage /> },
                // { path: ':group/activiteiten/:activityId', element: <EventsPage /> },
                { path: ':group', element: <EventsTimelineRootPage />, children: [
                    {index: true, element: <EventsTimelineGroupPage /> },
                    {path: 'activities/', element: <Navigate to=".." replace /> },
                    {path: 'activities/:activityId', element: <EventsTimelineGroupPage /> },
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
                ]},
                { path: 'editor/v2', children: [
                    { index: true, element: <EventEditorOverviewPage /> },
                    { path: ':groupId', element: <EventsEditorGroupPageV2 />},
                    { path: ':groupId/new', element: <CreateNewEventPage /> },
                    { path: ':groupId/:activityId/edit', element: <EventEditPage /> },
                ]}
            ]},
            { path: 'blog', children: [
                { index: true, element: <BlogPage /> },
                { path: ':slug', element: <BlogArticlePage /> },
            ]},
            { path: 'leiding', element: <TeamPage /> },
            { path: 'groepsadmin/*', element: <Navigate to="/ga" replace />},
            { path: 'ga', children: [
                { index: true, element: <AccountIndexPage /> },
                { path: 'account', element: <AccountOverviewPage /> },
                { path: 'onboarding', element: <OnboardingPage /> },
                { path: 'digitale-lidkaart', element: <MemberCardPage /> },
            ]},
            { path: '*', element: <RequestBySlugPage /> },
        ]
    },
    {
        path: 'betalen',
        children: [
            { index: true, element: <PaymentPage /> },
            { path: 'g/:paymentId', element: <PaymentPage /> }
        ]
    },
];

export default MainModuleRouter;