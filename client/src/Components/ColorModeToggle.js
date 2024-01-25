import { Button, Flex, useColorMode } from "@chakra-ui/react"
import { BsSun, BsMoonStarsFill, BsMoon } from 'react-icons/bs'

export default function ColorModeToggle() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Flex
            w={{ base: '100%', lg: '50%' }}
            color="'white"
        >
            <Button
                borderRadius={'full'}
                bg={'transparent'}
                _hover={{ bg: 'blue.500' }}
                onClick={toggleColorMode}
                _focus={{ boxShadow: 'none' }}>
                {colorMode === 'light' ? <BsMoon fontSize={25} color="white" /> : <BsSun fontSize={25} />}
            </Button>
        </Flex>
    )
}
