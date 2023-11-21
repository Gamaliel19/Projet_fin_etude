import { EditIcon } from '@chakra-ui/icons'
import {Divider, IconButton, List, ListIcon, ListItem} from '@chakra-ui/react'
import React from 'react'
import { FiBell, FiBriefcase, FiDatabase, FiHome, FiSettings } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
    return (
        <List
            alignItems={'center'}
            marginTop={'3vh'}
            marginLeft={'3.5vh'}
            marginRight={'2.5vh'}
            fontSize="1.2em"
            color={"white"}
            spacing={4}
        >

            <ListItem p={3}
                borderRadius={8}
                _hover={
                    {
                        textDecor: 'none',
                        backgroundColor: 'green'
                    }
                }
            >
                <NavLink to='/'>
                    <IconButton
                        fontSize={"xl"}
                        icon={<FiHome />}
                    />
                    Accueil
                </NavLink>
            </ListItem>

            <ListItem
                mt={4}
                borderRadius={8}
                _hover={
                    {
                        textDecor: 'none',
                        backgroundColor: 'green'
                    }
                }
            >
                <NavLink to='/ventes'>
                    <IconButton
                        fontSize={"xl"}
                        icon={<FiBriefcase />}
                    />
                    Ventes
                </NavLink>
            </ListItem>

            <ListItem
                mt={6}
                borderRadius={8}
                _hover={
                    {
                        textDecor: 'none',
                        backgroundColor: 'green'
                    }
                }
            >
                <NavLink to='/stock'>
                    <IconButton fontSize={"xl"} icon={<FiDatabase />} />
                    Stock
                </NavLink>
            </ListItem>
            <ListItem
                mt={6}
                borderRadius={8}
                _hover={{ textDecor: 'none', backgroundColor: 'green' }}
            >
                <NavLink to='/invent'>
                    <ListIcon
                        as={EditIcon}
                        color={"white"}
                    />
                    Inventaires
                </NavLink>
            </ListItem>

            <ListItem
                mt={6}
                borderRadius={8}
                _hover={
                    {
                        textDecor: 'none',
                        backgroundColor: 'green'
                    }
                }
            >
                <NavLink to='/notifications'>
                    <IconButton
                        fontSize={"xl"}
                        icon={<FiBell />}
                    />
                    Notifications
                </NavLink>
            </ListItem>
            <Divider />
            <ListItem
                mt={8}
                borderRadius={8}
                _hover={
                    {
                        textDecor: 'none',
                        backgroundColor: 'green'
                    }
                }
            >
                <NavLink to='/settings'>
                    <IconButton icon={<FiSettings />} />
                    Paramètres
                </NavLink>
            </ListItem>
        </List>
    )
}
