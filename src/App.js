import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import VisitorProvider from "./contexts/visitorContext";
import NetworkContext from "./contexts/networkContext";
import { BaseLayout } from "./layouts";
import { ActivityPage, BasePage, BlogPage, GalleryPage, HomePage, SearchPage, ContactPage, TeamPage, GroupAdminLogin } from "./pages";
import { AppRouter, ContextMenu, ErrorPopup } from "./components";
import { cookieHook } from './utils';

function App() {
    return (
        <NetworkContext>
            <VisitorProvider>
                <Router>
                    <div className="App">
                        <BaseLayout>
                            <AppRouter />
                        </BaseLayout>
                        { process.env.NODE_ENV !== 'development' && <ContextMenu /> }
                        <ErrorPopup />
                    </div>
                </Router>
            </VisitorProvider>
        </NetworkContext>
    );
}

export default App;
