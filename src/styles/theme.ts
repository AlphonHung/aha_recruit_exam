import { createTheme } from '@mui/material/styles';

// typescript自訂theme型別
declare module '@mui/material/styles' {
    // 定義取用時的介面
    interface Theme {
        custom: {
            backgroundLinear: string;
            primaryLinear: string;
            buttonGrayLinear: string;
        };
    }
    // 定義建立時的介面
    interface ThemeOptions {
        custom?: {
            backgroundLinear?: string;
            primaryLinear?: string;
            buttonGrayLinear?: string;
        };
    }
}

// 產生器 https://bareynol.github.io/mui-theme-creator/
const theme = createTheme({
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
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
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
    custom: {
        backgroundLinear: 'linear-gradient(to right bottom, rgb(49, 51, 61), rgb(5, 5, 8))',
        primaryLinear: 'linear-gradient(to right bottom, rgb(234, 216, 170), rgb(227, 186, 124))',
        buttonGrayLinear: 'linear-gradient(150deg, rgb(97, 95, 100) 0%, rgb(80, 78, 81) 30%, rgb(60, 58, 63) 100%)',
    }
});

export default theme;