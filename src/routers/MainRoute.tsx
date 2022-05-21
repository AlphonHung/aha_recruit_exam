import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useLayout } from '../context/LayoutContext';
import { Home } from '../views/Home';
import { Tags } from '../views/Tags';
import { NavBar } from '../components/NavBar';
import { Logo } from '../components/Logo';

/** Main routes with basic layout */
const MainRoute = () => {
    const { mobileMode } = useLayout();
    return (
        <Stack direction={mobileMode ? 'column' : 'row'} height={1}>
            {mobileMode
                ? <Box width={1} height={'70px'} display={'flex'} alignItems={'center'} px={2.1}><Logo /></Box>
                : <NavBar />}
            <Box flex={1} pt={mobileMode ? 0 : 5.4} pb={mobileMode ? 2.4 : 8.7} sx={{ overflowY: 'scroll' }}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/tags" component={Tags} />
                    <Route path="*" render={() => (
                        <Redirect to={{ pathname: "/" }} />
                    )} />
                </Switch>
            </Box>
            {mobileMode && <NavBar />}
            {/** todo: followers */}
        </Stack>

    );
}

export default MainRoute;