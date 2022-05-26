import React, { useMemo } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import { createSvgIcon } from '@mui/material/utils';
import { useLayout } from '../context/LayoutContext';
import { Logo } from '../components/Logo';
import { BackButton } from '../components/BackButton';

/** Shared icon used in NavBar links. */
const PageIcon = createSvgIcon(
    <path fillRule='evenodd' clipRule='evenodd' d='M6.34146 6.10352e-05C5.51304 6.10352e-05 4.84146 0.671634 4.84146 1.50006C4.84146 2.32849 5.51304 3.00006 6.34146 3.00006H16.7578V12.4234C16.7578 13.2518 17.4294 13.9234 18.2578 13.9234C19.0863 13.9234 19.7578 13.2518 19.7578 12.4234V2.50006C19.7578 1.11935 18.6386 6.10352e-05 17.2578 6.10352e-05H6.34146ZM2 4.9147H13.122C14.2265 4.9147 15.122 5.81013 15.122 6.9147V18.0366C15.122 19.1412 14.2265 20.0366 13.122 20.0366H2C0.895432 20.0366 0 19.1412 0 18.0366V6.9147C0 5.81013 0.89543 4.9147 2 4.9147Z' transform='translate(2.12, 1.98)' />,
    'Nav',
);

/** A link item component inside NavBar. */
function NavBarItem(props: { label: string; link: string; matchLinks?: string[]; hideBadge?: boolean }) {
    const location = useLocation();
    const { mdDown } = useLayout();
    const active = useMemo(() => location.pathname === props.link || props.matchLinks?.includes(location.pathname), [location])
    return (
        <Link to={props.link} style={{ textDecoration: 'none' }}>
            <Stack alignItems={'center'}>
                <Badge variant='dot' invisible={props.hideBadge} sx={{ p: '2px', '.MuiBadge-badge': { backgroundColor: '#00D1FF' } }}>
                    <PageIcon style={{ fontSize: 24, color: active ? 'white' : '#8A8A8F' }} />
                </Badge>
                {!mdDown && <Typography variant='body1' component='div' fontSize={0.6} lineHeight={1.5} color={'white'} sx={{ visibility: active ? 'visible' : 'hidden', mt: '-2px' }}>{props.label}</Typography>}
            </Stack>
        </Link>
    )
}

/** The button to switch the page back to Home in mobile screen. */
function MobileBackButton() {
    return (
        <BackButton>
            <Typography variant="h5" component="h5" fontWeight={700} fontSize={'1.2rem'} lineHeight={1.5} pl={1.351} sx={{ color: 'white' }}>{'Home Page'}</Typography>
        </BackButton>
    )
}

/** NavBar that displays in top or left of screen. */
function TopNavBar() {
    const { mdDown, smDown } = useLayout();
    const location = useLocation();
    const showBackButton = useMemo(() => mdDown && location.pathname !== '/', [mdDown, location])

    const px = useMemo(() => {
        if (smDown) return 1.9;
        else if (mdDown) return 2.9;
        return 0;
    }, [smDown, mdDown])

    return (
        <Box
            component={'nav'}
            width={mdDown ? undefined : '80px'}
            height={mdDown ? '70px' : undefined}
            px={px}
            py={mdDown ? undefined : 3.7}
            display={'flex'}
            flexDirection={mdDown ? 'row' : 'column'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            sx={{ background: mdDown ? '#181818' : '#1B1B1B' }}>
            {showBackButton ? <MobileBackButton /> : <Logo />}
            {!mdDown && <Stack spacing={2} mt={4}>
                <NavBarItem label={'Home'} link={'/'} matchLinks={['/results']} hideBadge={true} />
                <NavBarItem label={'Tags'} link={'/tags'} />
            </Stack>}
        </Box>
    )
}

/** NavBar that displays in bottom of screen when in mobile device */
function BottomTabBar() {
    const { mdDown } = useLayout();
    const location = useLocation();

    if (!mdDown || location.pathname !== '/') return null;
    return (
        <Box
            component={'nav'}
            height={'66px'}
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{
                background: 'rgba(24, 24, 24, 0.2)',
                boxShadow: 'inset 0px 0.5px 0px rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(54.3656px)'
            }}>
            <Stack direction={'row'} spacing={5}>
                <NavBarItem label={'Home'} link={'/'} matchLinks={['/results']} hideBadge={true} />
                <NavBarItem label={'Tags'} link={'/tags'} />
            </Stack>
        </Box>
    )
}

export function NavBar(props: { location: 'top' | 'bottom' }) {
    switch (props.location) {
        case 'top': return <TopNavBar />;
        case 'bottom': return <BottomTabBar />;
    }
    return null;
}