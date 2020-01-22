import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from '../pages/App';
import DarwinApp from '../pages/DarwinApp';
import DarwinTourney from './DarwinTourney';
import TourneyMaker from '../pages/TourneyMaker';
import TournamentPage from '../pages/TournamentPage';
import NotFound from '../pages/NotFound';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/darwin" component={DarwinApp} />
            <Route path="/darwin/tourneymaker" component={DarwinTourney} />
            <Route path="/darwin/create" component={TourneyMaker} />
            <Route path="/darwin/tournament/:tourneyId" component={TournamentPage} />
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Router;