import { Header } from "../components/header";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc'
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { handleGoogleSignIn, handleSimpleLogin } from "@/services/loginHandlers";

export function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        pass: ''
    })








    return (
        <div className="h-screen md:min-h-screen flex flex-col gradient">
            <Header userdata={null} setUserdata={1} />
            <main className="fixed w-full h-screen flex justify-center items-center">
                <Card className="w-[350px] flex flex-col justify-center items-center border border-green-400/60 ">
                    <CardHeader className="mb-5 flex justify-center items-center">
                        <CardTitle className="text-accent-foreground text-xl">Login</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-center items-center gap-3">
                        <div className="flex flex-col gap-3">
                            <label>Email</label>
                            <Input type="email" className="border border-green-400/30" required placeholder="Email" id="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
                            <label>Senha</label>
                            <Input type="password" className="border border-green-400/30" required placeholder="Senha" id="pass" value={user.pass} onChange={e => setUser({ ...user, pass: e.target.value })} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3 justify-between mt-10">
                        <Button className="w-full" variant={"secondary"} onClick={() => handleSimpleLogin(navigate, user)}>Login</Button>
                        <Button className="w-full" onClick={() => navigate('/signup')}>Crie sua Conta</Button>
                        <Button className="w-full" variant={"outline"} onClick={() => handleGoogleSignIn(navigate)}><FcGoogle className="h-5 w-5 mr-2" />Login com Google</Button>
                    </CardFooter>
                </Card>
            </main>

        </div >
    )
}