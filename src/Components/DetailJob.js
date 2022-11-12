import React from 'react'
import { Text, Box, Button, Divider, Image } from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';

export default function DetailJob(data) {
   const { dataDetail } = data;

   return (
      <Box display={'flex'} justifyContent={'center'} paddingTop={'90px'}>
         <Box width={'97%'} height={'auto'} p='6' boxShadow='lg' rounded='md' bg='white'>
            <Button leftIcon={<ChevronLeftIcon />} colorScheme='teal' variant='solid' paddingRight={'28px'} onClick={data.back}>
               Back
            </Button>

            <Box marginTop={'24px'}>
               <Text fontSize={'24px'} fontWeight={'bold'}>{dataDetail.title}</Text>
               <Text>{dataDetail.location}</Text>
               <Divider margin={'20px 0px 20px 0px'} />
               <Box boxSize='sm'>
                  <Image src={dataDetail.company_logo} alt='dans' /> {/** The Image url is not valid */}
                  {/* <Image src='https://bit.ly/dan-abramov' alt='dans' /> */}
               </Box>
               <Text>{dataDetail.description}</Text>
            </Box>
         </Box>
      </Box>
   )
}
