import { Box, Button, FormControl, FormLabel, Input, Select, Text } from "@chakra-ui/core";
import { useState } from "react";
import httpClient from "../../httpClient";
import { Link } from "react-router-dom";
import { FormErrorMessage, FormHelperText } from "@chakra-ui/react";

const VARIANT_COLOR = 'teal'

export default function RegisterForm() {
    const [email, setEmail] = useState([])
    const [nom, setNom] = useState([])
    const [profil, setProfil] = useState([])
    const [password, setPassword] = useState([])
    const [confirmPassword, setConfirmPassword] = useState([])

    const regisInUser = async () => {
        console.log(email, nom, profil, password, confirmPassword)

        try {
            const resp = await httpClient.post("http://127.0.0.1:5000/register", {
                email,
                nom,
                profil,
                password,
                confirmPassword
            });
            window.location.href = "/adminHome"
        } catch (e) {
            if (e.response.status === 409) {
                alert("La création de compte a échouée. Réessayez plus tard!")
            }
        }

    };

    return (
        <Box my={8} textAlign={"left"}>
            <form>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Veuillez entrer votre adresse email, SVP!"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Nom</FormLabel>
                    <Input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Veuillez entrer votre nom d'utilisateurl, SVP!"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Profil</FormLabel>
                    <Input
                        type="text"
                        value={profil}
                        onChange={(e) => setProfil(e.target.value)}
                    />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Mot de passe</FormLabel>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Veuillez entrer votre mot de passe, SVP!"
                    />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel>Confirmer votre mot de passe</FormLabel>
                    <Input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirmez votre mot de passe, SVP!"
                    />
                </FormControl>

                <Button
                    type="button"
                    onClick={() => regisInUser()}
                    //variantColor={VARIANT_COLOR}
                    width={'full'} mt={4}
                >
                    Créer un nouveau compte
                </Button>
                <Text textAlign={'center'} mt={4}>
                    <a href="/"> <Link to="/"
                        //color={`${VARIANT_COLOR}.500`}
                    >
                        Connectez-vous.
                    </Link>
                    </a>
                </Text>

            </form>
        </Box>
    )
}