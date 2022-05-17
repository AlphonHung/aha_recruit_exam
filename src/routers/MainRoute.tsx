import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Home } from '../views/Home';

/** 最上層的router，統合所有路由 */
const MainRoute = () => (
    <Switch>
        <Route exact path="/" component={withRouter(Home)} />
    </Switch>
);

export default MainRoute;