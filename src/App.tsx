import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import { LayoutProvider } from './context/LayoutContext';
import { ErrorBoundary } from './views/ErrorBoundary';
import { theme } from './styles/theme';
import { MainRoute } from './routers/MainRoute';

/** 根節點 */
const App = () => (
    <ThemeProvider theme={theme}>
        <ErrorBoundary>
            <LayoutProvider>
                <CssBaseline />
                <Box height={1} sx={{ position: 'relative', overflowY: 'scroll' }}>
                    <HashRouter>
                        <MainRoute />
                    </HashRouter>
                </Box>
            </LayoutProvider>
        </ErrorBoundary>
    </ThemeProvider>
)

export default App;