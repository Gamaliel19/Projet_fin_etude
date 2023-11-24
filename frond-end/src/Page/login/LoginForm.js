import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Link,
    Text
} from "@chakra-ui/core";
import { useState } from "react";
import httpClient from "../httpClient";

//const VARIANT_COLOR = 'green'

export default function LoginForm() {
    const [email, setEmail] = useState([])
    const [nom, setNom] = useState([])
    const [profil, setProfil] = useState([])
    const [password, setPassword] = useState([])

    const logInUser = async () => {
        console.log(email, password)

        try {
            const resp = await httpClient.post("http://127.0.0.1:5000/login", {
                nom,
                profil,
                password,
            });
            window.location.href = "/accueil"
        } catch (e) {
            if (e.response.status === 401) {
                alert("La connexion a échouée! Votre email ou mot de passe est incorrect.")
            }
        }

    };

    return (
        <Box my={8} textAlign={"left"}>
            <form>
                <FormControl>
                    <FormLabel>Nom d'utilisateur</FormLabel>
                    <Input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Veuillez entrer votre nom d'utilisateur, SVP!"
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

                <Button
                    type="button"
                    onClick={() => logInUser()}
                    //variantColor={VARIANT_COLOR}
                    width={'full'} mt={4}
                >
                    Connecter
                </Button>
                <Text textAlign={'center'} mt={4}>
                    <a href="/register">
                        <Link
                            to="/register"
                        //color={`${VARIANT_COLOR}.500`}
                        >
                            Créer un nouveau compte.
                        </Link>
                    </a>
                </Text>

            </form>
        </Box>
    )
}