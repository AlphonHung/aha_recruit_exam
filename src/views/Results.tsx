import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useLocation, useParams } from "react-router-dom";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { useLayout } from '../context/LayoutContext';
import { BackButton } from '../components/BackButton';
import { CustomBlockButton } from '../components/CustomButtons';
import { ConstructionOutlined } from '@mui/icons-material';

interface SearchResult<T> {
    data: T;
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
}

interface UserData {
    id: string;
    name: string;
    username: string;
    avater: string;
    isFollowing: boolean;
}

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

/** Display a user in the form of card. */
function UserCard(props: { user?: UserData; }) {
    const { smDown } = useLayout();
    const width = useMemo(() => smDown ? '100%' : 'calc((100% - 68px)/3)', [smDown]);
    const maxWidth = useMemo(() => smDown ? undefined : '216px', [smDown]);

    if (props.user === undefined) return (
        <Box width={width} maxWidth={maxWidth}>
            <AspectRatioBox width={'100%'} ratio={219 / 146}>
                <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
            </AspectRatioBox>
            <Skeleton variant="text" sx={{ mt: '12px' }} />
            <Skeleton variant="text" />
        </Box>
    )

    return (
        <Box width={width} maxWidth={maxWidth}>
            <AspectRatioBox width={'100%'} ratio={219 / 146}>
                <img
                    src={props.user.avater}
                    alt={props.user.name}
                    loading="lazy"
                />
            </AspectRatioBox>
            <Typography variant="body1" fontSize={'14.9px'} lineHeight={1.5} mt={1.2} whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>{props.user.name}</Typography>
            <Typography variant="body1" fontSize={'11.175px'} lineHeight={1.5} sx={{ color: '#B2B2B2' }}>{`by ${props.user.username}`}</Typography>
        </Box>
    )
}

/** Search results page */
export function Results() {
    const { mdDown } = useLayout();
    const { search } = useLocation();
    const urlParams = new URLSearchParams(search);
    const keyword = urlParams.get('keyword');
    const pageSize = urlParams.get('pageSize');
    const [page, setPage] = useState(1);
    const [users, setUsers] = useState<(UserData | undefined)[]>(new Array(6).fill(0).map(x => undefined));
    const totalPages = useRef(0);

    useEffect(() => {
        fetch(`https://avl-frontend-exam.herokuapp.com/api/users/all?page=${page}&pageSize=${pageSize}&keyword=${keyword}`)
            .then(res => res.json())
            .then(data => {
                const result: SearchResult<UserData[]> = data;
                totalPages.current = result.totalPages;
                if (page === 1) setUsers(result.data);
                else setUsers([...users].concat(result.data));
            })
            .catch(err => { console.log(err) })
    }, [page])

    const handleNextPage = useCallback(() => {
        setPage(page + 1);
    }, [page])

    return (
        <Container maxWidth={'md'} sx={{ height: '100%', overflowY: 'scroll', pt: mdDown ? 2 : 9.2, pb: mdDown ? 2.4 : 8.7 }}>
            <ResultsPageTitle />
            <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'flex-start'} flexWrap={'wrap'} mt={2.4} px={mdDown ? undefined : 4.3585} rowGap={3.1} columnGap={3.6}>
                {users.map((user, i) => (<UserCard key={`user_${i}`} user={user} />))}
                {users.length === 0 && <Typography variant="body1">{'No data found.'}</Typography>}
            </Box>
            {(users.length > 0 && page < totalPages.current) && <Box flex={1} display={'flex'} justifyContent={"flex-start"} alignItems={"flex-end"} mt={3.9} px={mdDown ? undefined : 4.3585}>
                <CustomBlockButton handleClick={handleNextPage}>{'More'}</CustomBlockButton>
            </Box>}
        </Container>
    )
}