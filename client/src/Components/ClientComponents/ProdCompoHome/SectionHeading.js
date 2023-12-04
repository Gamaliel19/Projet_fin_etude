import { Heading } from '@chakra-ui/react';
import React from 'react'

function SectionHeading({title}) {
    return (
        <Heading size={'md'} my={'1.5rem'}>
            {title}
        </Heading>
    );
}

export default SectionHeading
