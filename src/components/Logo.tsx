import React from 'react';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

export function Logo() {
    const theme = useTheme();
    return (
        <Typography
            variant="h1"
            component="div"
            sx={{
                fontSize: '0.65rem',
                fontWeight: 700,
                lineHeight: '15px',
                color: 'transparent',
                background: theme.custom.highlightLinear,
                backgroundClip: 'text',
            }}>LOGO
        </Typography >
    )
}