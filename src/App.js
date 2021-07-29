import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import BaseLayout from "./Layouts/BaseLayout";
import { BasePage, BlogArticlePage, GalleryPage, HomePage, SearchPage } from "./pages";

function App() {
    return (
        <Router>
            <div className="App">
                <BaseLayout>
                    <Switch>
                        <Route path="/" exact>
                            <HomePage />
                        </Route>
                        <Route path="/blog/:slug" exact>
                            <BlogArticlePage />
                        </Route>
                        <Route path="/galerij" exact>
                            <GalleryPage />
                        </Route>
                        <Route path="/zoeken" exact>
                            <SearchPage />
                        </Route>
                        <Route path="/:slug" exact>
                            <BasePage />
                        </Route>
                    </Switch>
                </BaseLayout>
            </div>
        </Router>
    );
}

export default App;
