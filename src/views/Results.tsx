import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useLocation } from "react-router-dom";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useLayout } from '../context/LayoutContext';
import { BackButton } from '../components/BackButton';
import { CustomBlockButton } from '../components/CustomButtons';
import { LoadingSkeletons } from '../components/LoadingSkeletons';
import { SearchResult, UserData } from '../domain';
import { IMG_SOURCE } from '../constants';

/** PC mode: back button. Mobile mode: page title */
function ResultsPageTitle() {
    const { mdDown } = useLayout();

    if (mdDown) return (
        <Typography variant="h5" component="h5" fontWeight={400} fontSize={'1.2rem'} lineHeight={1.5} sx={{ color: 'white' }}>{'Results'}</Typography>
    )
    return (
        <BackButton>
            <Typography variant="h4" component="h4" fontWeight={400} fontSize={'1.5rem'} lineHeight={1.5} pl={2.5645} sx={{ color: 'white' }}>{'Results'}</Typography>
        </BackButton>
    )
}

/** A container with aspect ratio. */
function AspectRatioBox(props: { width: number | string; ratio: number; children: React.ReactNode; }) {
    return (
        <Box position={'relative'} width={props.width} pb={`${(1 / props.ratio) * 100}%`}>
            <Box position={'absolute'} top={0} right={0} bottom={0} left={0}>
                {props.children}
            </Box>
        </Box>
    )
}

/** Display a user in the form of card. If image url not found then use Figma's design picture. */
function UserCard(props: { user?: UserData; index: number; }) {
    const { smDown } = useLayout();
    const [loadError, setLoadError] = useState(false);
    const width = useMemo(() => smDown ? '100%' : 'calc((100% - 68px)/3)', [smDown]);
    const maxWidth = useMemo(() => smDown ? undefined : '216px', [smDown]);

    if (props.user === undefined) return (
        <Box width={width} maxWidth={maxWidth}>
            <AspectRatioBox width={'100%'} ratio={219 / 146}>
                <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
            </AspectRatioBox>
            <Skeleton variant="text" sx={{ mt: '12px', borderRadius: '6px' }} />
            <Skeleton variant="text" sx={{ borderRadius: '6px' }} />
        </Box>
    )

    return (
        <Box width={width} maxWidth={maxWidth}>
            <AspectRatioBox width={'100%'} ratio={219 / 146}>
                <img
                    src={loadError ? IMG_SOURCE.RESULT_DEFAULT[props.index % 3] : props.user.avater}
                    alt={props.user.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={() => { setLoadError(true); }}
                />
            </AspectRatioBox>
            <Typography variant="body1" fontSize={'14.9px'} lineHeight={1.5} mt={1.2} whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>{props.user.name}</Typography>
            <Typography variant="body1" fontSize={'11.175px'} lineHeight={1.5} sx={{ color: '#B2B2B2' }}>{`by ${props.user.username}`}</Typography>
        </Box>
    )
}

/** If there are no data after loading, shows this hint to user. */
function NoResultHint(props: { visible: boolean; }) {
    if (!props.visible) return null;
    return (
        <Typography variant="body1">{'No data found.'}</Typography>
    )
}

/** Search results page */
export function Results() {
    const { mdDown } = useLayout();
    const { search } = useLocation();
    const urlParams = new URLSearchParams(search);
    const keyword = urlParams.get('keyword') || '';
    const pageSize = Number(urlParams.get('pageSize')) || 10;
    const [page, setPage] = useState(1);
    const [repeat, setRepeat] = useState(1); // A counter for Infinite loading with same api.
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(false);
    const totalPages = useRef(0);

    useEffect(() => {
        setLoading(true);
        fetch(`https://avl-frontend-exam.herokuapp.com/api/users/all?page=${page}&pageSize=${pageSize}&keyword=${keyword}`)
            .then(res => res.json())
            .then(data => {
                const result: SearchResult<UserData[]> = data;
                totalPages.current = result.totalPages;
                setUsers([...users].concat(result.data));
            })
            .catch(err => { console.log(err) })
            .finally(() => { setLoading(false); })
    }, [page, repeat])

    const handleNextPage = useCallback(() => {
        let nextPage = page;
        let nextRepeat = repeat
        // Start a new round to load from page 1
        if (page === totalPages.current) {
            nextRepeat += 1;
            nextPage = 1;
        } else {
            nextPage += 1;
        }
        setRepeat(nextRepeat)
        setPage(nextPage);
    }, [page, repeat])

    return (
        <Container maxWidth={'md'} sx={{ height: '100%', overflowY: 'scroll', pt: mdDown ? 2 : 9.2, pb: mdDown ? 2.4 : 8.7 }}>
            <ResultsPageTitle />
            <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'flex-start'} flexWrap={'wrap'} mt={2.4} px={mdDown ? undefined : 4.3585} rowGap={3.1} columnGap={3.6}>
                <NoResultHint visible={!loading && users.length === 0} />
                {users.map((user, i) => (<UserCard key={`user_${i}`} user={user} index={i} />))}
                <LoadingSkeletons visible={loading} size={users.length === 0 ? 6 : 3}>
                    <UserCard user={undefined} index={0} />
                </LoadingSkeletons>
            </Box>
            {users.length > 0 && <Box flex={1} display={'flex'} justifyContent={"flex-start"} alignItems={"flex-end"} mt={3.9} px={mdDown ? undefined : 4.3585}>
                <CustomBlockButton handleClick={handleNextPage}>{'More'}</CustomBlockButton>
            </Box>}
        </Container>
    )
}