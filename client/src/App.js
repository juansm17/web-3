import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import Tweets from './components/kvitter/KvitterFeed';
import Profile from './components/profile/Profile'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={LandingPage} />
        <Route path='/kvitter' component={Tweets} />
        <Route path='/profile' component={Profile} />
        <Route path='/' component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
