import { createTheme } from '@mui/material/styles';

// typescript自訂theme型別
declare module '@mui/material/styles' {
    // 定義取用時的介面
    interface Theme {
        custom: {
            backgroundLinear: string;
            highlightLinear: string;
        };
    }
    // 定義建立時的介面
    interface ThemeOptions {
        custom?: {
            backgroundLinear?: string;
            highlightLinear?: string;
        };
    }
}

// 產生器 https://bareynol.github.io/mui-theme-creator/
export const theme = createTheme({
    spacing: 10,
    palette: {
        primary: {
            main: '#FFFFFF',
        },
        text: {
            primary: '#FFFFFF',
        },
        background: {
            default: '#181818',
        }
    },
    shape: {
        borderRadius: 0
    },
    typography: {
        fontFamily: [
            'Ubuntu',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 910,
            lg: 1200,
            xl: 1536,
        },
    },
    custom: {
        backgroundLinear: 'linear-gradient(to right bottom, rgb(49, 51, 61), rgb(5, 5, 8))',
        highlightLinear: 'linear-gradient(to right, #FF5C01, #FFD25F)',
    }
});