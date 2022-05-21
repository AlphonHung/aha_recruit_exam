import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CustomBlockButton } from '../components/CustomButtons';

interface Props {
    children: ReactNode;
}
interface State {
    hasError: boolean;
    error?: Error;
    showReload: boolean;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            hasError: false,
            showReload: false,
        };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, showReload: false };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo): void {
        this.setState({ ...this.state, showReload: true });
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            console.log(this.state)
            return (
                <Box>
                    <Typography variant="body1" component="p" mb={1}>{'Something went wrong. Please try again.'}</Typography>
                    <CustomBlockButton handleClick={() => {
                        this.setState({ hasError: false });
                        window.location.href = '/';
                    }}>
                        {'Reload'}
                    </CustomBlockButton>
                </Box>
            )
        }
        return this.props.children;
    }
}