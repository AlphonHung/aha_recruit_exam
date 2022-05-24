import React from 'react';

/** Shows a number of children component when loading. */
export function LoadingSkeletons(props: { visible: boolean; size: number; children: React.ReactNode; }) {
    if (!props.visible) return null;
    return (
        <React.Fragment>
            {new Array(props.size).fill('').map((item, index) => <React.Fragment key={`fake_item_${index}`}>{props.children}</React.Fragment>)}
        </React.Fragment>
    )
}