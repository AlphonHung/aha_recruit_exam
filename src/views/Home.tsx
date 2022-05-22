import React, { useState, useCallback } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useLayout } from '../context/LayoutContext';
import { CustomInput } from '../components/CustomInputs';
import { PageSizeSlider } from '../components/CustomSliders';
import { CustomBlockButton } from '../components/CustomButtons';

export function Home() {
    const { mobileMode } = useLayout();
    const [keyword, setKeyword] = useState('');
    const [pageSize, setPageSize] = useState(10);

    const handleKeywordInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value !== keyword) setKeyword(event.target.value);
    }, [keyword])

    const handlePageSizeChange = useCallback((event: Event, newValue: number | number[], activeThumb: number) => {
        if (typeof newValue === 'number') {
            setPageSize(newValue);
        }
    }, [])

    return (
        <Container maxWidth={'md'} sx={{ height: '100%', overflowY: 'scroll', pt: mobileMode ? 0 : 5.4, pb: mobileMode ? 2.4 : 8.7 }}>
            <Stack height={1} spacing={mobileMode ? 1.6 : 2}>
                <Typography variant="h5" component="h5" fontSize={'1.2rem'} lineHeight={1.5}>Search</Typography>
                <CustomInput placeholder={"Keyword"} handleInput={handleKeywordInput} />
                {!mobileMode && <Box sx={{ py: 1 }}>
                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                </Box>}
                <Typography variant="h5" component="h5" fontSize={'1.2rem'} lineHeight={1.5} pt={mobileMode ? 1.2 : 0}># Of Results Per Page</Typography>
                <Typography variant="body1" component="p" fontSize={'0.8rem'}>
                    <span style={{ fontSize: 48, fontWeight: 700, marginRight: 10, lineHeight: 0.875 }}>{pageSize}</span>
                    results
                </Typography>
                <PageSizeSlider defaultValue={pageSize} handleChange={handlePageSizeChange} />
                {!mobileMode && <Box sx={{ pt: 3, pb: 1 }}>
                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                </Box>}
                <Box flex={1} minHeight={'66px'} display={'flex'} justifyContent={"flex-start"} alignItems={"flex-end"}>
                    <CustomBlockButton>{'Search'}</CustomBlockButton>
                </Box>
            </Stack>
        </Container>
    )
}