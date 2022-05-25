import React, { useRef } from 'react';
import TextField from '@mui/material/TextField';

/** A custom one line input field
 * 
 * @param handleInput Callback fired when change input value
 */
export function CustomInput(props: { placeholder: string; handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <TextField
            hiddenLabel
            placeholder={props.placeholder}
            onChange={props.handleInput}
            sx={{
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
            }}
        />
    )
}