import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { Home } from '../views/Home';
import { NavBar } from '../components/NavBar';

/** Main routes with basic layout */
const MainRoute = () => (
    <Stack direction={'row'} height={1}>
        <NavBar />
        <Switch>
            <Route exact path="/" component={withRouter(Home)} />
        </Switch>
        {/** todo: followers */}
    </Stack>

);

export default MainRoute;