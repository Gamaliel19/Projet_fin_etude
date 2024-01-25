import { Flex, Heading } from '@chakra-ui/react';
import React from 'react'

function SectionHeading({ title }) {
    return (
        <Flex ml={{base:'40%',lg:'0rem',xl:'4.5rem'}} align={'center'} justify={'start'}>
            <Heading size={'lg'} my={'1.5rem'}>
                {title}
            </Heading>
        </Flex>
    );
}

export default SectionHeading
