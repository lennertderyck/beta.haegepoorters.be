import React from 'react';
import {
  Switch,
  Route,
  useLocation
} from "react-router-dom";
import { HomePage, TeamPage, ActivityPage, BlogPage, GalleryPage, SearchPage, ContactPage, GroupAdminLogin, BasePage, PaymentsPage } from '../../pages';

/**
 * embedded param so that not needed padding can be removed in views
 */
const AppRouter = ({ route, embedded }) => {
    const currentLocation = useLocation()
    
    const routeObject = {
        pathname: route
    }

    return (
        <Switch location={ route ? routeObject : currentLocation }>
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
            <Route path={['/ga', '/profiel']} exact>
                <GroupAdminLogin />
            </Route>
            <Route path={['/ga/leden']} exact>
                <GroupAdminLogin />
            </Route>
            <Route path={['/betalingen/:code?', '/payments/:code?']} exact>
                <PaymentsPage />
            </Route>
                                    
            {/* Catch all other pages by slug */}
            <Route path={['/:slug', '/pagina/:slug' ]} exact>
                <BasePage />
            </Route>
        </Switch>
    )
}

export default AppRouter