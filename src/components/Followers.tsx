import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Skeleton from '@mui/material/Skeleton';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SearchResult, UserData } from '../domain';
import { LoadingSkeletons } from '../components/LoadingSkeletons';
import { FollowButton, CustomBlockButton } from '../components/CustomButtons';

const PAGE_SIZE = 10;

/** Get tab attributes by index. */
function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

/** Top tab buttons to switch panel.
 * 
 * @param value The current active index of tab.
 * @param setValue Callback when switch to another tab index.
 */
function TopTabs(props: { value: number; setValue: (newValue: number) => void; }) {
    const handleChange = useCallback((event: React.SyntheticEvent<Element, Event>, newValue: number) => {
        props.setValue(newValue);
    }, []);

    return (
        <Tabs value={props.value} onChange={handleChange} variant="fullWidth" aria-label="followers-tabs" sx={{
            '& .MuiTabs-indicator': {
                height: '2px'
            },
            '& .MuiButtonBase-root': {
                color: '#929292',
                fontSize: '16px',
                lineHeight: 1.5,
                borderBottom: '2px solid #1F1F1F',
                padding: '32px 16px 12px 16px'
            }
        }}>
            <Tab label="Followers" {...a11yProps(0)} />
            <Tab label="Following" {...a11yProps(1)} />
        </Tabs>
    )
}

/** Container of each tab data with lazy load */
function TabPanel(props: { children: React.ReactNode; value: number; index: number; }) {
    const [rendered, setRendered] = useState(false);

    useEffect(() => {
        if (rendered) return;
        if (props.value === props.index) setRendered(true);
    }, [props.value, rendered])

    return (
        <div
            role="tabpanel"
            hidden={props.value !== props.index}
            id={`simple-tabpanel-${props.index}`}
            aria-labelledby={`simple-tab-${props.index}`}
            style={{ flex: 1, paddingTop: '23px', paddingBottom: '23px', overflowY: 'scroll' }}>
            {rendered && props.children}
        </div>
    );
}

/** Display a user in the form of row item.
 * The follow button should implement a click event to toggle status with API.
*/
function UserRow(props: { user?: UserData; }) {
    if (props.user === undefined) return (
        <Stack width={1} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} my={0.8} px={1.6}>
            <Stack flexDirection={'row'} alignItems={'center'}>
                <Skeleton variant="rectangular" width={40} height={40} sx={{ borderRadius: '5px' }} />
                <Box pl={1.5} height={'45px'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'flex-start'}>
                    <Skeleton variant="text" width={68} height={24} />
                    <Skeleton variant="text" width={79} height={21} />
                </Box>
            </Stack>
            <Skeleton variant="rectangular" width={60} height={29} sx={{ borderRadius: '20px' }} />
        </Stack>
    )

    return (
        <Stack width={1} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} my={0.8} px={1.6}>
            <Stack flexDirection={'row'} alignItems={'center'}>
                <Box width={'40px'} height={'40px'} borderRadius={'5px'} overflow={'hidden'} sx={{ border: '1px solid white' }}>
                    <img src={props.user.avater} alt={props.user.name} loading="lazy" style={{ width: '100%', height: '100%' }} />
                </Box>
                <Box pl={1.5} height={'45px'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'flex-start'}>
                    <Typography variant="body1" fontSize={1} lineHeight={1.5} whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>{props.user.name}</Typography>
                    <Typography variant="body1" fontSize={1} lineHeight={1.5} whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'} letterSpacing={'0.25px'} sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>{`@${props.user.username}`}</Typography>
                </Box>
            </Stack>
            <FollowButton isFollowing={props.user.isFollowing} />
        </Stack>
    )
}

/** Auto generated followers list.
 * The documentation doesn't mention how to implement infinite loading, so I follow the button design of the results page
 */
function FollowersListPanel(props: { type: 'all' | 'friends' }) {
    const [page, setPage] = useState(1);
    const [repeat, setRepeat] = useState(1); // A counter for Infinite loading with same api.
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const totalPages = useRef(0);

    const url = useMemo(() => {
        switch (props.type) {
            case 'friends': return 'https://avl-frontend-exam.herokuapp.com/api/users/friends';
            default: return 'https://avl-frontend-exam.herokuapp.com/api/users/all'
        }
    }, [props.type])

    useEffect(() => {
        setLoading(true);
        fetch(`${url}?page=${page}&pageSize=${PAGE_SIZE}`)
            .then(res => res.json())
            .then(data => {
                const result: SearchResult<UserData[]> = data;
                totalPages.current = result.totalPages;
                setUsers([...users].concat(result.data));
            })
            .catch(err => { console.log(err) })
            .finally(() => { setLoading(false); })
    }, [page, repeat, url])

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
        <Box flex={1}>
            {users.map((user, i) => (<UserRow user={user} />))}
            <LoadingSkeletons visible={loading} size={users.length === 0 ? 10 : 5}><UserRow user={undefined} /></LoadingSkeletons>
            {users.length > 0 && <Box flex={1} display={'flex'} justifyContent={"flex-start"} alignItems={"flex-end"} mt={3.9} px={2}>
                <CustomBlockButton handleClick={handleNextPage}>{'More'}</CustomBlockButton>
            </Box>}
        </Box>
    )
}

/** Followers on right of screen, only display when screen width is larger than 1440px. */
export function Followers() {
    const [value, setValue] = useState(0);
    const matches = useMediaQuery('(min-width:1440px)');

    return (
        <Stack width={matches ? '375px' : 0} height={1} sx={{ backgroundColor: '#1B1B1B' }}>
            <TopTabs value={value} setValue={setValue} />
            <TabPanel value={value} index={0}>
                <FollowersListPanel type={'all'} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <FollowersListPanel type={'friends'} />
            </TabPanel>
        </Stack>
    )
}