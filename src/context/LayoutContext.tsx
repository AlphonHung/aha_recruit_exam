import React, { createContext, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type contextType = {
    mdDown: boolean;
    smDown: boolean;
}

const LayoutStateContext = createContext<contextType | undefined>(undefined);

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <LayoutStateContext.Provider value={{ mdDown, smDown }}>
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