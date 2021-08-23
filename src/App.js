import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import VisitorProvider from "./contexts/visitorContext";
import NetworkContext from "./contexts/networkContext";
import { BaseLayout } from "./layouts";
import { ActivityPage, BasePage, BlogPage, GalleryPage, HomePage, SearchPage, ContactPage, TeamPage } from "./pages";
import { ContextMenu, ErrorPopup } from "./components";
import { cookieHook } from './utils';

console.log(cookieHook.set('test'))
console.log(cookieHook.exists('test'))

function App() {
    return (
        <NetworkContext>
            <VisitorProvider>
                <Router>
                    <div className="App">
                        <BaseLayout>
                            <Switch>
                                <Route path="/" exact>
                                    <HomePage />
                                </Route>
                                <Route path="/leiding/:person?" exact>
                                    <TeamPage />
                                </Route>
                                <Route path="/haegeprekerke/:group?" exact>
                                    <ActivityPage />
                                </Route>
                                <Route path="/blog/:slug?" exact>
                                    <BlogPage />
                                </Route>
                                <Route path="/galerij" exact>
                                    <GalleryPage />
                                </Route>
                                <Route path="/zoeken/:query?" exact>
                                    <SearchPage />
                                </Route>
                                <Route path="/contact" exact>
                                    <ContactPage />
                                </Route>
                                
                                {/* Catch all other pages by slug */}
                                <Route path={['/:slug', '/pagina/:slug' ]} exact>
                                    <BasePage />
                                </Route>
                            </Switch>
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
