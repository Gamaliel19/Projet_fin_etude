import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, Divider, Grid, GridItem, Heading} from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";

export default function RootLayout() {
    return (
        <Grid
            templateColumns={"repeat(6, 1fr)"}
        // bg={'gray.50'}

        >
            <GridItem
                as="aside"
                colSpan={{ base: 6, lg: 2, xl: 1 }}
                bg={"#000014"}
                minHeight={"100vh"}
                p={{ base: '20px', lg: '30px' }}
                borderRadius={5}
            >
                <Box
                    as={'nav'}
                    p={"10px"}
                    color={'green'}
                    fontSize={20}
                    fontWeight={'bold'}
                    alignItems={"center"}
                >
                    <Heading as={"h1"}>PHARMACIE EDENE</Heading>
                </Box>
                <Divider />
                <Sidebar />
            </GridItem>

            <GridItem
                as={"main"}
                colSpan={5}
                p={"2px"}
            >
                <Navbar />
                <Outlet />
            </GridItem>
        </Grid>
    )
}