import { useState } from "react";
import { Header } from "../components/header";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "../components/ui/input";
import { api } from "../lib/axios";
import { useNavigate } from "react-router-dom";

type UserT = {
    name: string,
    email: string,
    password: string,
    phone: string
}


export function Signup() {
    const navigate = useNavigate();

    const [user, setUser] = useState<UserT>({
        name: '',
        email: '',
        password: '',
        phone: ''
    })

    function handleCreate() {
        api.post('/signup', user)
            .then(() => { navigate('/') })
            .catch(err => { alert(err) });
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="fixed w-full h-screen flex justify-center items-center">
                <Card className="w-[350px] ">
                    <CardHeader className="mb-5 flex justify-center items-center">
                        <CardTitle className="text-accent-foreground text-xl">Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Nome</Label>
                                    <Input type="nome" id="nome" onChange={(e) => setUser((prevUser) => ({ ...prevUser, nome: e.target.value, }))} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Email</Label>
                                    <Input type="email" id="email" onChange={(e) => setUser((prevUser) => ({ ...prevUser, email: e.target.value, }))} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Senha</Label>
                                    <Input type="password" id="senha" onChange={(e) => setUser((prevUser) => ({ ...prevUser, password: e.target.value, }))} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">telefone</Label>
                                    <Input type="tel" id="telefone" onChange={(e) => setUser((prevUser) => ({ ...prevUser, phone: e.target.value, }))} />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between mt-10">
                        <Button variant="outline" onClick={() => { navigate('/')}}>Já tenho conta</Button>
                        <Button onClick={handleCreate}>Criar conta</Button>
                    </CardFooter>
                </Card>
            </main>

        </div >
    )
}