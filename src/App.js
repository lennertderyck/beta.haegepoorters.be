import {
  BrowserRouter as Router
} from "react-router-dom";

import VisitorProvider from "./contexts/visitorContext";
import NetworkContext from "./contexts/networkContext";
import { BaseLayout } from "./layouts";
import { AppRouter, ContextMenu, ErrorPopup } from "./components";

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
