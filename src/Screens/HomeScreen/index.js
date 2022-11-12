import React, { useEffect, useState } from 'react';
import moment from 'moment';
// COMPONENTS
import Header from '../../Components/Header';
import DetailJob from '../../Components/DetailJob';
// CHAKRA UI COMPONENTS
import {
   Text,
   Box,
   FormControl,
   FormLabel,
   FormHelperText,
   Input,
   Checkbox,
   Button,
   Divider,
   useToast,
   Skeleton,
   Stack
} from '@chakra-ui/react';
// Function
import { getJobList, getJobListSearch, getDetailJob } from '../../Functions';

export default function HomeScreen() {
   const [jobData, setJobData] = useState([]);
   const [page, setPage] = useState(1);
   const [isFullTime, SetIsFullTime] = useState(true);
   const [jobSearch, setJobSearch] = useState('');
   const [locationSearch, setLocationSearch] = useState('');
   const [errorDesc, setErrorDesc] = useState(false);
   const [errorLocation, setErrorLocation] = useState(false);
   const [titleList, setTitleList] = useState(false);
   const [loading, setLoading] = useState(false)
   const [dataDetail, setDataDetail] = useState({})
   const [isDetail, setIsDetail] = useState(false)
   const toast = useToast();

   useEffect(() => {
      handleGetJobList()
   }, [])

   const handleGetJobList = async () => {
      setLoading(true)
      const response = await getJobList(page)

      if (response) {
         if (page > 1) {
            setJobData([...jobData, response])
         } else {
            setJobData(response)
         }
         setLoading(false)
      } else {
         toast({
            title: 'Error Get More Data',
            description: "Terjadi Kesalahan Pada Server",
            status: 'error',
            duration: 5000,
            isClosable: true,
         })
         setLoading(false)
      }
   }

   const handleFilterJobList = async () => {
      if (jobSearch === '') {
         setErrorDesc(true)
         return
      }

      if (locationSearch === '') {
         setErrorLocation(true)
         return
      }

      const response = await getJobListSearch(jobSearch.toLowerCase(), locationSearch.toLowerCase())

      if (response.length) {
         setJobData(response)
         setTitleList(true)
      } else {
         toast({
            title: 'Data Tidak Ditemukan',
            description: "Example Data : Job Description 'Python' & Location 'Berlin'",
            status: 'error',
            duration: 5000,
            isClosable: true,
         })
      }
   }

   const handlerSeeDetail = async (id) => {
      const response = await getDetailJob(id)

      if (response) {
         setDataDetail(response)
         setIsDetail(!isDetail)
      }
   }

   return (
      <React.Fragment>
         <Header />

         {isDetail ? (
            <DetailJob dataDetail={dataDetail} back={() => setIsDetail(!isDetail)} /> /** --- Detail Content --- */
         ) : (
            <Box width={'100%'} height={'auto'} padding={'90px 20px 20px 20px'}> {/** --- Home Screen Content --- */}
               {/** --- Search Content Section Start --- */}
               <Box display={'flex'} marginBottom={'24px'}>
                  <FormControl marginRight={'12px'} width={'500px'}>
                     <FormLabel>Job Description</FormLabel>
                     <Input borderColor={errorDesc ? 'red' : '#EAEAEA'} type='text' placeholder={'Silakan masukkan job description'} onChange={(text) => {
                        setErrorDesc(false)
                        setJobSearch(text.target.value)
                     }} />
                     {errorDesc && <FormHelperText color={'red'}>Silakan masukkan job description </FormHelperText>}
                  </FormControl>
                  <FormControl marginRight={'24px'} width={'500px'}>
                     <FormLabel>Location</FormLabel>
                     <Input borderColor={errorLocation ? 'red' : '#EAEAEA'} type='text' placeholder={'Silakan masukkan location'} onChange={(text) => {
                        setErrorLocation(false)
                        setLocationSearch(text.target.value)
                     }} />
                     {errorLocation && <FormHelperText color={'red'}>Silakan masukkan location</FormHelperText>}
                  </FormControl>
                  <Box display={'flex'} alignItems={'center'} marginTop={'28px'}>
                     <Checkbox isChecked={isFullTime} marginRight={'24px'} onChange={(e) => SetIsFullTime(e.target.checked)}>Full Time Only</Checkbox>
                     <Button colorScheme='teal' width={'150px'} onClick={() => handleFilterJobList()}>Search</Button>
                  </Box>
               </Box>
               {/** --- Search Content Section End --- */}

               {loading ? (
                  <Stack>
                     <Skeleton height='50px' width={'100px'} />
                     <Skeleton height='40px' />
                     <Skeleton height='40px' width={'500px'} />
                     <Skeleton height='40px' width={'500px'} />
                     <Skeleton height='40px' width={'800px'} />
                  </Stack>
               ) : (
                  <React.Fragment>
                     {/** --- Job List Content Section Start */}
                     <Box boxShadow='lg' p='6' rounded='md' bg='white'>
                        <Text fontWeight={'bold'} fontSize={'24px'} marginBottom={'18px'}>{
                           titleList ? `Show ${jobData.length} Jobs` : 'Job List'
                        }</Text>
                        <Divider />
                        {jobData && jobData.map((value, key) => {
                           return (
                              <Box key={key} marginTop={'12px'} onClick={() => handlerSeeDetail(value.id)}>
                                 <Box marginBottom={'12px'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                    <Box>
                                       <Text fontSize={'22px'} fontWeight={'bold'} color={'teal'}>{value?.title}</Text>
                                       <Box display={'flex'} marginBottom={'12px'}>
                                          <Text>{value?.company}</Text>
                                          <Text marginRight={'10px'} marginLeft={'10px'}>|</Text>
                                          <Text fontWeight={'bold'}>{value?.type}</Text>
                                       </Box>
                                    </Box>
                                    <Box>
                                       <Text fontWeight={'bold'} fontSize={'14px'}>{value?.location}</Text>
                                       <Text fontSize={'14px'}>{moment(value?.created_at).calendar()}</Text>
                                    </Box>
                                 </Box>
                                 <Divider />
                              </Box>
                           )
                        })}
                     </Box>
                     {/** --- Job List Content Section End */}

                     <Box display={'flex'} justifyContent={'center'} marginTop={'24px'} marginBottom={'24px'}>
                        <Button colorScheme='teal' width={'250px'} onClick={() => {
                           setPage(page + 1)
                           handleGetJobList()
                        }}>Load More</Button>
                     </Box>
                  </React.Fragment>
               )
               }
            </Box>
         )}



      </React.Fragment >
   )
}
