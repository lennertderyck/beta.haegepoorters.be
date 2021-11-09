import React from 'react';
import {
  Switch,
  Route,
  useLocation
} from "react-router-dom";

import { HomePage, TeamPage, ActivityPage, BlogPage, GalleryPage, SearchPage, ContactPage, GroupAdminLogin, BasePage, PaymentsPage, ActivityEditor, DropboxLeaderArchive, CoronaUpdatesPage } from '../../pages';

/**
 * embedded param so that not needed padding can be removed in views
 */
const AppRouter = ({ route }) => {
    const currentLocation = useLocation()
    
    // useEffect(() => {
    //     if (process.env.NODE_ENV !== 'development' && searchParams.get('force') !== 'dev') {
    //         addListener( state => setDevTools(state));
    //         launch()
    //     }
    //     return stop
    // }, [])
    
    const routeObject = {
        pathname: route
    }
    
    // if (devTools) return <div className="h-full flex items-center justify-center">
    //     <CenterMessage intro="Sluit de devtools" icon="bug">
    //         Sluit de ontwikkelaartools om verder te gaan.
    //     </CenterMessage>
    // </div>

    return (
        <>
            <Switch location={ route ? routeObject : currentLocation }>
                <Route path="/" exact>
                    <HomePage />
                </Route>
                <Route path="/leiding/:person?" exact>
                    <TeamPage />
                </Route>
                <Route path="/haegeprekerke/edit/:group?" exact>
                    <ActivityEditor />
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
                <Route path="/account/dropbox" exact>
                    <DropboxLeaderArchive />
                </Route>
                <Route path={['/ga', '/profiel', '/account']} exact>
                    <GroupAdminLogin />
                </Route>
                <Route path={['/ga/leden']} exact>
                    <GroupAdminLogin />
                </Route>
                <Route path={['/betalingen/:code?', '/payments/:code?']} exact>
                    <PaymentsPage />
                </Route>
                <Route path={['/corona']} exact>
                    <CoronaUpdatesPage />
                </Route>
                                        
                {/* Catch all other pages by slug */}
                <Route path={['/:slug', '/pagina/:slug' ]} exact>
                    <BasePage />
                </Route>
            </Switch>
        </>
    )
}

export default AppRouter