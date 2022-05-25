import React from 'react';
import { Link } from "react-router-dom";
import Stack from '@mui/material/Stack';
import { createSvgIcon } from '@mui/material/utils';

/** Back icon in NavBar */
const LeftArrowIcon = createSvgIcon(
    <path d="M13.2702 2.10349L11.3333 0.166626L0.5 11L11.3333 21.8333L13.2702 19.8964L4.37374 11L13.2702 2.10349Z" transform='translate(5.615, 1.165)' />,
    'Back'
);

/** A button to switch the page back to Home with custom text children. */
export function BackButton(props: { children: React.ReactNode; }) {
    return (
        <Link to={'/'} style={{ textDecoration: 'none' }}>
            <Stack direction={'row'} alignItems={'center'}>
                <LeftArrowIcon style={{ fontSize: 26, color: 'white' }} />
                {props.children}
            </Stack>
        </Link>
    )
}