import React from 'react';
import Button from '@mui/material/Button';
import { useLayout } from '../context/LayoutContext';

/** A custom block level button for any common use.
 *
 * @param children Anything that will display inside button.
 * @param handleClick Callback fired when click button.
 */
export function CustomBlockButton(props: { children: React.ReactNode; handleClick?: () => void; }) {
    const { smDown } = useLayout();
    return (
        <Button
            variant="contained"
            onClick={props.handleClick}
            sx={{
                width: '100%',
                maxWidth: smDown ? undefined : '343px',
                backgroundColor: 'white',
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

/** Follow button in UserRow. */
export function FollowButton(props: { isFollowing: boolean; handleClick?: () => void; }) {
    return (
        <Button
            variant="outlined"
            onClick={props.handleClick}
            sx={{
                fontSize: 1,
                lineHeight: 1,
                padding: '8px 10px',
                borderRadius: '20px',
                textTransform: 'initial',
                backgroundColor: props.isFollowing ? 'white' : undefined,
                border: '1px solid white',
                color: props.isFollowing ? '#121212' : undefined,
                '&:hover': {
                    color: props.isFollowing ? 'white' : '#121212',
                    backgroundColor: props.isFollowing ? '#121212' : 'white'
                }
            }}>
            {props.isFollowing ? 'Following' : 'Follow'}
        </Button>
    )
}