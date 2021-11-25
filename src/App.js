import {
  BrowserRouter as Router
} from "react-router-dom";

import VisitorProvider from "./contexts/visitorContext";
import NetworkContext from "./contexts/networkContext";
import { BaseLayout } from "./layouts";
import { AppRouter, ErrorPopup } from "./components";
import Test from './components/Test';

function App() {
    return (
        <NetworkContext>
            <VisitorProvider>
                <Router>
                    <div className="App">
                        <BaseLayout>
                            <AppRouter />
                        </BaseLayout>
                        {/* { process.env.NODE_ENV !== 'development' && <ContextMenu /> } */}
                        <ErrorPopup />
                    </div>
                </Router>
            </VisitorProvider>
        </NetworkContext>
    );
}

export default App;
