import { Button, Flex, HStack, Heading, IconButton, Spacer } from '@chakra-ui/react'
import { FiBell } from 'react-icons/fi'
import { Link } from 'react-router-dom'
export default function Navbar() {
    return (
        <Flex justifyContent={'space-around'} as={'nav'} p={"10px"} alignItems={"center"}>
            <Heading as={"h1"}>Logo Edene</Heading>
            <Spacer />
            <HStack>
                <Link to={'/notifications'}>
                    <IconButton
                        fontSize={28}
                        background={"none"}
                        mt={5}
                        marginRight={10}
                        _hover={{ textDecor: 'none', color: '#AEC8CA' }}
                        icon={<FiBell />}
                    //color={"gray"}
                    />
                </Link>
                <Button
                    p={18}
                    bg={"green"}
                    borderRadius={5}
                    color={"white"}
                    _hover={{ textDecor: 'none', backgroundColor: '#AEC8CA' }}
                >Déconnexion</Button>
            </HStack>
        </Flex>
        //<Flex bg={"gray"} justify={"space-between"} wrap={"wrap"} gap={2}>
        //<Box w={"150px"} h={"50px"} bg={"red"}>1</Box>
        //<Box w={"150px"} h={"50px"} bg={"blue"}>2</Box>
        //<Box w={"150px"} h={"50px"} bg={"green"}>3</Box>
        //<Box w={"150px"} h={"50px"} bg={"yellow"}>4</Box>
        //</Flex>
    )
}
