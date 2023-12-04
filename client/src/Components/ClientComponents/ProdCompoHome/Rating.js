import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import ReactStars from 'react-stars'

export const Rating = ({rating}) => {
    return (
        <Flex>
            <ReactStars
                count={5}
                value={rating.rate}
                half={true}
                size={18}
                color2={'colors.blue.400'}
                edit={false}
            />
            <Text>200</Text>
        </Flex>
    )
}


