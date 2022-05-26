import React, { createContext, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type contextType = {
    mdDown: boolean;
    smDown: boolean;
    desktopMode: boolean;
}

const LayoutStateContext = createContext<contextType | undefined>(undefined);

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const desktopMode = useMediaQuery('(min-width:1440px)');

    return (
        <LayoutStateContext.Provider value={{ mdDown, smDown, desktopMode }}>
            {children}
        </LayoutStateContext.Provider>
    )
}
const useLayout = () => {
    const context = useContext(LayoutStateContext)
    if (context === undefined) {
        throw new Error('useLayout must be used within a LayoutProvider')
    }
    return context;
}

export { LayoutProvider, useLayout };