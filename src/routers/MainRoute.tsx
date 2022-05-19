import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import { Home } from '../views/Home';
import { Logo } from '../components/Logo';
import MailIcon from '@mui/icons-material/Mail';

function NavBarItem(props: { hideBadge?: boolean }) {
    return (
        <Badge color="secondary" variant="dot" invisible={props.hideBadge}>
            <MailIcon />
        </Badge>
    )
}

function NavBar() {
    return (
        <Box width={'80px'} py={3.7} display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'center'}>
            <Logo />
            <NavBarItem hideBadge={true} />
            <NavBarItem />
        </Box>
    )
}

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