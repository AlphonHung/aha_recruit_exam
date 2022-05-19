import React, { useRef } from 'react';
import Slider from '@mui/material/Slider';
import { theme } from '../styles/theme';

const PAGE_SIZE_MARKS = [3, 10, 20, 30, 40, 50].map(value => ({ value, label: value.toString() }));

/** A custom slider for change query's page size.
 * 
 * @param defaultValue A initial value of slider.
 * @param handleChange Callback fired when the slider's value changed.
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
            marks={PAGE_SIZE_MARKS}
            sx={{
                color: '#FFD05D',
                height: 8,
                '& .MuiSlider-rail': {
                    backgroundColor: '#FFFFFF',
                    opacity: 0.3
                },
                '& .MuiSlider-track': {
                    border: 'none',
                    backgroundImage: theme.custom.highlightLinear
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
                    opacity: 0.5,
                    lineHeight: 1.5,
                    marginTop: '5px'
                },
                '& .MuiSlider-markLabelActive': {
                    opacity: 1
                }
            }}
        />
    )
}