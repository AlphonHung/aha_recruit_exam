import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Home } from '../views/Home';

/** 最上層的router，統合所有路由 */
const MainRoute = () => (
    <Switch>
        <Box height={1}>
            {/** todo: nav bar */}
            <Route exact path="/" component={withRouter(Home)} />
            {/** todo: followers */}
        </Box>
    </Switch>
);

export default MainRoute;