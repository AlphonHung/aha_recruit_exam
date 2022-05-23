import React, { useState, useEffect, useMemo } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useLayout } from '../context/LayoutContext';

interface TagData {
    id: string;
    name: string;
    count: number;
}

/** Display a tag in the form of card. */
function TagCard(props: { tag?: TagData; }) {
    const { smDown } = useLayout();
    const width = useMemo(() => smDown ? 'calc((100% - 24px)/2)' : '150px', [smDown])

    if (props.tag === undefined) return (
        <Box width={width}>
            <Skeleton variant="rectangular" width={'100%'} height={150} sx={{ borderRadius: '10px' }} />
            <Skeleton variant="text" sx={{ mt: '10px' }} />
            <Skeleton variant="text" />
        </Box>
    )

    return (
        <Box width={width}>
            <Box width={1} height={'150px'} borderRadius={'10px'} px={1} py={1.4} display={'flex'} alignItems={'flex-end'} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }}>
                <Box borderRadius={'8px'} width={1} height={'50px'} px={1} py={0.3} sx={{ border: '4px solid #FFFFFF' }}>
                    <Typography variant="h5" component="h5" fontWeight={700} fontSize={'1.2rem'} lineHeight={1.5} whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>{props.tag.name}</Typography>
                </Box>
            </Box>
            <Typography variant="body1" fontSize={'14.9px'} lineHeight={1.5} mt={1} whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>{props.tag.name}</Typography>
            <Typography variant="body1" fontSize={'11.175px'} lineHeight={1.5} sx={{ color: '#B2B2B2' }}>{`${props.tag.count} Results`}</Typography>
        </Box>
    )
}

/** Tags page */
export function Tags() {
    const [tags, setTags] = useState<TagData[] | undefined[]>(new Array(10).fill(0).map(x => undefined));
    const { mdDown } = useLayout();
    useEffect(() => {
        fetch('https://avl-frontend-exam.herokuapp.com/api/tags')
            .then(res => res.json())
            .then(data => { setTags(data); })
            .catch(err => { console.log(err) })
    }, [])
    return (
        <Container maxWidth={'md'} sx={{ height: '100%', overflowY: 'scroll', pt: mdDown ? 2 : 5.4, pb: mdDown ? 2.4 : 8.7 }}>
            <Typography variant="h4" component="h4" fontSize={mdDown ? '1.2rem' : '1.5rem'} lineHeight={1.5} mb={2.4}>Tags</Typography>
            <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'flex-start'} flexWrap={'wrap'} rowGap={3.6} columnGap={2.4}>
                {tags.map((tag, i) => (<TagCard key={`tag_${i}`} tag={tag} />))}
            </Box>
        </Container>
    )
}