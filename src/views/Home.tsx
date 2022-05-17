import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

const sliderMarks = [
    {
        value: 0,
        label: '0°C',
    },
    {
        value: 20,
        label: '20°C',
    },
    {
        value: 37,
        label: '37°C',
    },
    {
        value: 100,
        label: '100°C',
    },
];

export const Home = () => (
    <Box height={1}>
        <Stack height={1} flex={1} spacing={2}>
            <Typography variant="h4" component="h4">Search</Typography>
            <TextField
                hiddenLabel
                placeholder="Placeholder"
            />
            <Divider />
            <Typography variant="h4" component="h4"># Of Results Per Page</Typography>
            <Typography variant="body2" component="div">
                <span style={{ fontSize: 30 }}>30</span>
                results
            </Typography>
            <Slider
                defaultValue={20}
                step={null}
                valueLabelDisplay="auto"
                marks={sliderMarks}
            />
            <Divider />
            <Box flex={1} display={'flex'} justifyContent={"flex-start"} alignItems={"flex-end"}>
                <Button variant="contained">SEARCH</Button>
            </Box>
        </Stack>
    </Box>
)