import React, { useRef } from 'react';
import Slider from '@mui/material/Slider';

const sliderMarks = [
    {
        value: 3,
        label: '3',
    },
    {
        value: 10,
        label: '10',
    },
    {
        value: 20,
        label: '20',
    },
    {
        value: 30,
        label: '30',
    },
    {
        value: 40,
        label: '40',
    },
    {
        value: 50,
        label: '50',
    },
];

const sliderStyle = {
    color: '#FFD05D',
    height: 8,
    padding: '4px 0',
    '& .MuiSlider-rail': {
        backgroundColor: '#FFFFFF',
        opacity: 0.3
    },
    '& .MuiSlider-track': {
        border: 'none',
        backgroundImage: 'linear-gradient(to right, #FF5C01, #FFD25F)'
    },
    '& .MuiSlider-thumb': {
        height: 26,
        width: 26,
        backgroundColor: '#1B1B1B',
        border: '6px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-mark': {
        display: 'none',
    },
    '& .MuiSlider-markLabel': {
        fontSize: '0.8rem',
        color: '#FFFFFF',
        opacity: 0.5
    },
    '& .MuiSlider-markLabelActive': {
        opacity: 1
    }
}

/** A custom slider for change query's page size.
 * 
 * @param defaultValue A initial value of slider.
 * @param handleChange Callback function that is fired when the slider's value changed.
 */
export function PageSizeSlider(props: { defaultValue: number; handleChange: (event: Event, newValue: number | number[], activeThumb: number) => void; }) {
    const defaultValueRef = useRef(props.defaultValue);

    return (
        <Slider
            aria-label="SearchCount"
            defaultValue={defaultValueRef.current}
            onChange={props.handleChange}
            step={null}
            min={3}
            max={50}
            marks={sliderMarks}
            sx={sliderStyle}
        />
    )
}