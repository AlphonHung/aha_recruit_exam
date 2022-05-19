import React from 'react';
import Button from '@mui/material/Button';

/** A custom block level button for any common use.
 *
 * @param children Anything that will display inside button.
 * @param handleClick Callback fired when click button.
 */
export function CustomBlockButton(props: { children: React.ReactNode; handleClick?: () => void; }) {
    return (
        <Button
            variant="contained"
            onClick={props.handleClick}
            sx={{
                width: '100%',
                maxWidth: '343px',
                border: '1px solid #FFFFFF',
                fontSize: '0.7rem',
                fontWeight: 700,
                borderRadius: '4px',
                '&:hover': {
                    color: '#FFFFFF',
                    backgroundColor: '#121212'
                }
            }}>
            {props.children}
        </Button>
    )
}