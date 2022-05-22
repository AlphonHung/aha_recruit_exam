import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface TagData {
    id: string;
    name: string;
    count: number;
}

/** Display a tag in the form of card. */
function TagCard(props: { tag: TagData; }) {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box width={smDown ? 'calc((100% - 24px)/2)' : '150px'}>
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

function AllTags(props: { tags: TagData[]; }) {
    return (
        <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-start'} alignItems={'flex-start'} flexWrap={'wrap'} rowGap={3.6} columnGap={2.4}>
            {props.tags.map(tag => (<TagCard key={`tag_${tag.id}`} tag={tag} />))}
        </Box>
    )
}

const mock: TagData[] = [
    {
        "id": "218ffc18-58f0-4ea2-bddf-63ca8e3861d2",
        "name": "Small Granite Car",
        "count": 165
    },
    {
        "id": "706f7fbb-cc5b-4d75-9e91-7f5c6aa17c2c",
        "name": "Licensed Cotton Keyboard",
        "count": 77
    },
    {
        "id": "901d5fab-3fb4-4678-b516-0c2449199fbb",
        "name": "Incredible Metal Ball",
        "count": 159
    },
    {
        "id": "f9e2a567-a4e9-455b-874f-52ebdafbaf4d",
        "name": "Refined Granite Computer",
        "count": 195
    },
    {
        "id": "0e133616-5bac-4f3c-9ca0-e81547223a3d",
        "name": "Rustic Granite Bike",
        "count": 28
    },
    {
        "id": "a8b5d348-cf4b-46b4-b29e-1591b7a4ea35",
        "name": "Incredible Frozen Tuna",
        "count": 116
    },
    {
        "id": "0918d661-95b5-400b-863d-b39d634adb8a",
        "name": "Fantastic Cotton Fish",
        "count": 139
    },
    {
        "id": "2fbef9a7-8d2f-48df-ab44-0291d38a215e",
        "name": "Ergonomic Metal Cheese",
        "count": 90
    },
    {
        "id": "fd1886f7-1fd8-45ca-b7b6-7430589a8a5d",
        "name": "Ergonomic Plastic Chips",
        "count": 35
    },
    {
        "id": "423d30a0-57cd-4827-be34-4c21deee5cf3",
        "name": "Small Frozen Shoes",
        "count": 80
    },
    {
        "id": "640c003e-371c-4521-aa55-020aced9fe16",
        "name": "Sleek Plastic Ball",
        "count": 31
    },
    {
        "id": "16e35b6a-7eff-4128-b005-fc968f62db85",
        "name": "Unbranded Granite Salad",
        "count": 9
    },
    {
        "id": "6f4e013a-998b-4eef-baba-c90b683631ce",
        "name": "Intelligent Plastic Sausages",
        "count": 97
    },
    {
        "id": "db1a4c51-609c-496f-8db7-859efdfccca4",
        "name": "Gorgeous Granite Hat",
        "count": 10
    },
    {
        "id": "852b5fb4-2788-4e0d-a8cf-ed61b1b6b95b",
        "name": "Awesome Steel Salad",
        "count": 185
    },
    {
        "id": "7692f195-c35e-4de7-8abb-8dfbfbb943f9",
        "name": "Refined Rubber Shirt",
        "count": 24
    },
    {
        "id": "b5caf974-8057-4d0a-a766-42750aa13062",
        "name": "Ergonomic Concrete Chicken",
        "count": 125
    },
    {
        "id": "33715c37-3f9c-4e97-954b-21a1a82bf028",
        "name": "Gorgeous Cotton Sausages",
        "count": 95
    },
    {
        "id": "fd988bb1-380c-410e-99aa-21b9c54b8861",
        "name": "Handcrafted Rubber Keyboard",
        "count": 172
    },
    {
        "id": "1be3e5d7-7d7c-4591-b803-ee88ba7f8db2",
        "name": "Ergonomic Soft Shoes",
        "count": 38
    },
    {
        "id": "b7cd002e-8cda-423f-9215-28f7648cec3a",
        "name": "Generic Plastic Fish",
        "count": 120
    },
    {
        "id": "f2528967-315c-4633-88bd-854b758db62e",
        "name": "Rustic Plastic Chicken",
        "count": 174
    },
    {
        "id": "1d35541e-760f-4531-b51b-83c3b503305c",
        "name": "Practical Concrete Hat",
        "count": 145
    },
    {
        "id": "538f047a-26ee-44d5-8f7b-34b6c518928f",
        "name": "Fantastic Rubber Computer",
        "count": 73
    }
]

export function Tags() {
    const [tags, setTags] = useState<TagData[]>(mock);
    // useEffect(() => {
    //     fetch('https://avl-frontend-exam.herokuapp.com/api/tags')
    //         .then(res => res.json())
    //         .then(data => { setTags(data); console.log(data) })
    //         .catch(err => { console.log('QQ 取直錯誤', err) })
    // }, [])
    return (
        <Container maxWidth={'md'}>
            <Box height={1} flex={1}>
                <Typography variant="h4" component="h4" fontSize={'1.5rem'} lineHeight={1.5} mb={2.4}>Tags</Typography>
                <AllTags tags={tags} />
            </Box>
        </Container>
    )
}