import { Box, Stack, Typography } from '@mui/material';

const item = [
  'tomato',
  'potato',
  'cabbage',
  'carrot',
  'onion',
  'garlic',
  'ginger',
  'chilli',
  'pepper',
  'salt',
  'sugar',
  'milk',
  'butter',
]

export default function Home() {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={'column'}
      > 

      <Box
      border={'1px solid #333'}
      >

      {/* header */}
      <Box width={'800px'} height={'100px'} bgcolor={'#FF9BC0'} display={'flex'} justifyContent={"center"} alignItems={'center'}>
        <Typography 
          variant="h2"
          color={'#333'}
          textAlign={'center'}
          textTransform={'capitalize'} 
        >
        Grocery List
        </Typography>
      </Box>

      <Stack width="800px" height="300px" spacing={2} overflow={"scroll"}>
        {item.map((i) => (
          <Box
          key={i}
          width="100%"
          height= "300px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor={'#f0f0f0'}
          > 
          <Typography 
            variant="h4"
            color={'#000'}
            textAlign={'center'}
            textTransform={'capitalize'} 
          >{i}</Typography>
          </Box>
        ))}

      </Stack>
      </Box>
    </Box>
  );
}
