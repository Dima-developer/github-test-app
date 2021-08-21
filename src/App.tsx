import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Header from "./components/Header";
import Profile from "./components/Profile";
import Pagination from "./components/Pagination";
import { AppStateProvider } from "./context";

const App: React.FC = () => {
  
  return (
    <AppStateProvider>
      <Router>
        <div>
          <Header />
          <div className="container">
            <Pagination />
            
            <Switch>

              <Redirect from='/' to='/1' exact/>
              
              <Route exact path='/:page'>
                <Profile/>
              </Route>

            </Switch>
          </div>
        </div>
      </Router>
    </AppStateProvider>
  );
}

export default App;
