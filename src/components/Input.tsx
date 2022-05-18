import React, { useRef } from 'react';
import TextField from '@mui/material/TextField';

const textFieldStyle = {
    '& .MuiOutlinedInput-input': {
        height: '21px',
        padding: '20px 18px',
        fontSize: '14px',
        '&::placeholder': {
            color: '#FFFFFF',
            opacity: 0.25
        }
    },
    '& .MuiOutlinedInput-notchedOutline': {
        borderRadius: '6px',
        borderWidth: '3px !important',
        borderColor: '#FFFFFF80 !important',
    },
    '.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FF9B33 !important',
        }
    }
}

/** A custom one line input field
 * 
 * @param placeholder
 */
export function Input(props: { placeholder: string; }) {
    return (
        <TextField
            hiddenLabel
            placeholder={props.placeholder}
            sx={textFieldStyle}
        />
    )
}