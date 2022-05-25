import React from 'react';
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

export function Logo() {
    const theme = useTheme();
    return (
        <Link to={'/'} style={{ textDecoration: 'none' }}>
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
            </Typography>
        </Link>
    )
}