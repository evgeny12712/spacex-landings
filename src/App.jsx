import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import './assets/scss/global.scss';
import { AppHeader } from './cmps/AppHeader';
import { LandingApp } from './pages/LandingApp';
import { LandingDetails } from './pages/LandingDetails';

export function App() {
  return (
    <Router>
      <div className="App">
        <AppHeader />
        <main className="container">
          <Switch>
            <Route component={LandingDetails} path="/landing/:id" />
            <Route exactcomponent={LandingApp} path="/" />
          </Switch>
        </main>
      </div>
    </Router>
  );
}
