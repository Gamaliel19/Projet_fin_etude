import React from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'
import SwiperListeProduits from '../../Components/ProdCompoHome/SwiperListeProduits'
import { TopCategories } from '../../Components/ProdCompoHome/TopCat'
import Home from '../../Components/ProdCompoHome/Home'


function ClientHomePage() {
  return (
    <Box bg={useColorModeValue('white', 'gray.700')}>
      <Home />
      <TopCategories/>
      <SwiperListeProduits title={"Médicaments"} />
    </Box>
  )
}

export default ClientHomePage
