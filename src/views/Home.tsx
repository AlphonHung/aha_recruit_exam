import React, { useState, useCallback } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Input } from '../components/Input';
import { PageSizeSlider } from '../components/Slider';



export const Home = () => {
    const [pageSize, setPageSize] = useState(10);

    const handleChange = useCallback((event: Event, newValue: number | number[], activeThumb: number) => {
        if (typeof newValue === 'number') {
            setPageSize(newValue);
        }
    }, [])

    return (
        <Container maxWidth={'lg'}>
            <Box height={1}>
                <Stack height={1} flex={1} spacing={2} sx={{ paddingTop: 5.4 }}>
                    <Typography variant="h5" component="h5" fontSize={'1.2rem'} lineHeight={1.5}>Search</Typography>
                    <Input placeholder={"Keyword"} />
                    <Divider sx={{ borderColor: '#FFFFFF1A' }} />
                    <Typography variant="h5" component="h5" fontSize={'1.2rem'} lineHeight={1.5}># Of Results Per Page</Typography>
                    <Typography variant="body1" component="p" fontSize={'0.8rem'}>
                        <span style={{ fontSize: 48, fontWeight: 700, marginRight: 10, lineHeight: 0.875 }}>{pageSize}</span>
                        results
                    </Typography>
                    <PageSizeSlider defaultValue={pageSize} handleChange={handleChange} />
                    <Divider sx={{ borderColor: '#FFFFFF1A' }} />
                    <Box flex={1} display={'flex'} justifyContent={"flex-start"} alignItems={"flex-end"}>
                        <Button variant="contained">SEARCH</Button>
                    </Box>
                </Stack>
            </Box>
        </Container>
    )
}