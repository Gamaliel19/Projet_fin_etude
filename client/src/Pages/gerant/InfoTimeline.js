import { Flex, Heading, Td, Tr } from "@chakra-ui/react";
import React from "react";

export default function InfoTimeline(props) {

    const displayInfo = (props) => {
        const { menu, info } = props

        if (info.length > 0) {
            return (
                info.map((info, index) => {
                    console.log(info)
                    return (
                        <Tr key={info._id}>
                            <Td>{info.email}</Td>
                            <Td>{info.nom}</Td>
                            <Td>{info.prenom}</Td>
                            <Td>{info.profil}</Td>
                        </Tr>
                    )
                })
            )
        }
        else {
            return (
                <Heading>No users</Heading>
            )
        }
    }
    return (
        <Flex align={'center'} justify={'center'}>
            {displayInfo(props)}
        </Flex>
    )
}