import React from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import Home from '../../Components/ClientComponents/ProdCompoHome/Home'
import TopCategories from '../../Components/ClientComponents/ProdCompoHome/TopCat'
import SwiperListeProduits from '../../Components/ClientComponents/ProdCompoHome/SwiperListeProduits'


function ClientHomePage() {
  return (
    <Box bg={useColorModeValue('white', 'gray.700')}>
      <Home/>
      <TopCategories/>
      <SwiperListeProduits title={"Médicaments"} />
    </Box>
  )
}

export default ClientHomePage
