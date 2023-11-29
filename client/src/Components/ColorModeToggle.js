import { Button, Flex, Tooltip, useColorMode } from "@chakra-ui/react"
import { BsSun, BsMoonStarsFill } from 'react-icons/bs'

export default function ColorModeToggle() {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Flex justifyContent="center" alignItems="center">
            <Tooltip hasArrow label='Blancer le theme' bg='gray.300' color='black'>
                <Button
                    bg={'transparent'}
                    aria-label="Toggle Color Mode"
                    onClick={toggleColorMode}
                    _focus={{ boxShadow: 'none' }}>
                    {colorMode === 'light' ? <BsMoonStarsFill /> : <BsSun />}
                </Button>
            </Tooltip>
        </Flex>
    )
}
