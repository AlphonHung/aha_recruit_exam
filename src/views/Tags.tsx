import React, { useState, useCallback } from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export function Tags() {
    return (
        <Container maxWidth={'md'}>
            <Stack height={1} flex={1} spacing={2}>
                <Typography variant="h5" component="h5" fontSize={'1.2rem'} lineHeight={1.5}>Tags</Typography>
            </Stack>
        </Container>
    )
}