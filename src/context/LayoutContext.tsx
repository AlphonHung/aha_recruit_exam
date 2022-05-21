import React, { createContext, useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type contextType = {
    mobileMode: boolean;
}

const LayoutStateContext = createContext<contextType | undefined>(undefined);

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const theme = useTheme();
    const mobileMode = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <LayoutStateContext.Provider value={{ mobileMode }}>
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