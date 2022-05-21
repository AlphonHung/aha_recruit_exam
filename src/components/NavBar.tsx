import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createSvgIcon } from '@mui/material/utils';
import { Logo } from '../components/Logo';

/** Shared icon used in NavBar links. */
const PageIcon = createSvgIcon(
    <path fill-rule='evenodd' clip-rule='evenodd' d='M6.34146 6.10352e-05C5.51304 6.10352e-05 4.84146 0.671634 4.84146 1.50006C4.84146 2.32849 5.51304 3.00006 6.34146 3.00006H16.7578V12.4234C16.7578 13.2518 17.4294 13.9234 18.2578 13.9234C19.0863 13.9234 19.7578 13.2518 19.7578 12.4234V2.50006C19.7578 1.11935 18.6386 6.10352e-05 17.2578 6.10352e-05H6.34146ZM2 4.9147H13.122C14.2265 4.9147 15.122 5.81013 15.122 6.9147V18.0366C15.122 19.1412 14.2265 20.0366 13.122 20.0366H2C0.895432 20.0366 0 19.1412 0 18.0366V6.9147C0 5.81013 0.89543 4.9147 2 4.9147Z' transform='translate(2.12, 1.98)' />,
    'Nav',
);

/** One link item inside NavBar. */
function NavBarItem(props: { label: string; link?: string; active?: boolean; hideBadge?: boolean }) {
    return (
        <Link href={props.link} underline='none'>
            <Stack alignItems={'center'}>
                <Badge color='primary' variant='dot' invisible={props.hideBadge} sx={{ p: '2px' }}>
                    <PageIcon style={{ fontSize: 24, color: props.active ? 'white' : '#8A8A8F' }} />
                </Badge>
                <Typography variant='body1' component='div' fontSize={0.6} lineHeight={1.5} color={'white'} sx={{ visibility: props.active ? 'visible' : 'hidden', mt: '-2px' }}>{props.label}</Typography>
            </Stack>
        </Link>
    )
}

export function NavBar() {
    return (
        <Box component={'nav'} width={'80px'} py={3.7} display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} alignItems={'center'}>
            <Logo />
            <Stack spacing={2} mt={4}>
                <NavBarItem label={'Home'} link={'#'} hideBadge={true} />
                <NavBarItem label={'Tags'} link={'#'} active />
            </Stack>
        </Box>
    )
}