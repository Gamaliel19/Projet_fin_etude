import { Button, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'



const ErrorModalOverlay = (props) => {
    return (
        <>
            <Flex
                onClick={props.onConfirm}
                bg={'rgba(0, 0, 0, 0.753)'}
                position={'fixed'}
                top={0}
                left={0}
                width={'100%'}
                height={'100vh'}

            ></Flex>
            <Flex
                position={'fixed'}
                top={'40vh'}
                left={{ base: '4%', sm: '17.5%', lg: '32.2%' }}
                w={{ base: '92%', sm: '65%', lg: '35.6%' }}
                zIndex={10}
                overflow={'hidden'}
                bg={'gray'}
                flexDir={'column'}
                borderRadius={5}
            >
                <Flex
                    align={'center'}
                    justify={'center'}
                    w={'100%'}
                    bg={'yellow'}
                    p={'1rem'}
                >
                    <Heading fontSize={20} color={'red.500'} >{props.title}</Heading>
                </Flex>

                <Flex p={'2rem'} bg={'white'}>
                    <Text>
                        {props.message}
                    </Text>
                </Flex>

                <Flex justify={'flex-end'} bg={'white'}>
                    <Button
                        onClick={props.onConfirm}
                        bg={'green.400'}
                        colorScheme='teal'
                        borderRadius={5}
                        border={'1px solide green.400'}
                        m={'1rem'}
                        p={'0.5rem 2rem'}
                    >OK</Button>
                </Flex>

            </Flex>

        </>
    )
}

export default function ErrorModal(props) {
    return (
        <>
            {/* aafiicher la modale*/}
            {ReactDOM.createPortal(
                <ErrorModalOverlay
                    title={props.title}
                    message={props.message}
                    onConfirm={props.onConfirm}
                />,
                document.getElementById("modal-root")
            )}
        </>
    )
}
