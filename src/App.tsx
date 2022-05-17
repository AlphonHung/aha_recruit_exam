import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './styles/theme';
import MainRoute from './routers/MainRoute';

/** 根節點 */
const App = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <div style={{ position: 'relative', flex: 1, background: theme.custom.backgroundLinear, overflowY: 'scroll' }}>
            <BrowserRouter>
                <MainRoute />
            </BrowserRouter>
        </div>
    </ThemeProvider>
)

export default App;