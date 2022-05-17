import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import theme from './styles/theme';
import MainRoute from './routers/MainRoute';

/** 根節點 */
const App = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box height={1} sx={{ position: 'relative', background: theme.custom.backgroundLinear, overflowY: 'scroll' }}>
            <BrowserRouter>
                <MainRoute />
            </BrowserRouter>
        </Box>
    </ThemeProvider>
)

export default App;