import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useLayout } from '../context/LayoutContext';
import { Home } from '../views/Home';
import { Results } from '../views/Results';
import { Tags } from '../views/Tags';
import { NavBar } from '../components/NavBar';

/** Main routes with basic layout */
export function MainRoute() {
    const { mdDown } = useLayout();
    return (
        <Stack direction={mdDown ? 'column' : 'row'} height={1}>
            <NavBar location={'top'} />
            <Box flex={1} sx={{ overflowY: 'scroll' }}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/results" component={Results} />
                    <Route path="/tags" component={Tags} />
                    <Route path="*" render={() => (
                        <Redirect to={{ pathname: "/" }} />
                    )} />
                </Switch>
            </Box>
            <NavBar location={'bottom'} />
            {/** todo: followers */}
        </Stack>

    );
}