import {Outlet } from "react-router-dom";
import { 
    Box, 
    Flex, 
    IconButton, 
    useColorMode 
} from "@chakra-ui/core";
import LoginHeader from "./LoginHeader";
import LoginForm from "./LoginForm";
import React from "react";


export default function LoginArea(){
    const ThemeSelector = ()=>{
        const {colorMode, toggleColorMode} = useColorMode()

        return(
            <Box textAlign={'right'} py={4}>
                <IconButton 
                icon={colorMode ==='light'? 'moon':'sun'} 
                onClick={toggleColorMode}
                variant="ghost"
                />
                
            </Box>
        )
    }

    return(
        <Flex 
        minHeight={'100vh'} 
        width={'full'}
        align={'center'}
        justifyContent={'center'}
        >
            <Box
            borderWidth={1}
            px={4}
            width={'full'}
            maxWidth={'500px'}
            textAlign={'center'}
            boxShadow={'lg'}
            >
                <Box p={4}>
                    <LoginHeader/>
                    <LoginForm/>
                </Box>
            </Box>
        </Flex>
    )
}