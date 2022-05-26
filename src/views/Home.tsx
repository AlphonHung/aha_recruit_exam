import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
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
    const history = useHistory();
    const { mdDown, desktopMode } = useLayout();
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

    const handleClickSearch = () => {
        history.push(`/results?${keyword.length > 0 ? `keyword=${keyword}` : ''}&pageSize=${pageSize}`)
    }

    return (
        <Container maxWidth={'md'} sx={{ height: '100%', overflowY: 'scroll', pt: mdDown ? 0 : 5.4, pb: mdDown ? 2.5 : 8.7, px: desktopMode ? '93px !important' : undefined }}>
            <Stack height={1} spacing={mdDown ? 1.6 : 2}>
                <Typography variant="h5" component="h5" fontSize={'1.2rem'} lineHeight={1.5}>Search</Typography>
                <CustomInput placeholder={"Keyword"} handleInput={handleKeywordInput} />
                {!mdDown && <Box sx={{ pt: 0.8, pb: 1 }}>
                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                </Box>}
                <Typography variant="h5" component="h5" fontSize={'1.2rem'} lineHeight={1.5} pt={mdDown ? 1.2 : 0}># Of Results Per Page</Typography>
                <Typography variant="body1" component="p" fontSize={'0.8rem'}>
                    <span style={{ fontSize: 48, fontWeight: 700, marginRight: 10, lineHeight: 0.875 }}>{pageSize}</span>
                    results
                </Typography>
                <PageSizeSlider defaultValue={pageSize} handleChange={handlePageSizeChange} />
                {!mdDown && <Box sx={{ pt: 2.8, pb: 1 }}>
                    <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                </Box>}
                <Box flex={1} minHeight={'66px'} display={'flex'} justifyContent={"flex-start"} alignItems={"flex-end"}>
                    <CustomBlockButton handleClick={handleClickSearch}>{'Search'}</CustomBlockButton>
                </Box>
            </Stack>
        </Container>
    )
}