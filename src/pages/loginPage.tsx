import { Header } from "../components/header";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc'

import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase";
import { api } from "@/lib/axios";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: '',
        pass: ''
    })


    function handleSimpleLogin() {
        signInWithEmailAndPassword(auth, user.email, user.pass)
            .then((user) => {
                api.post('/user', { id: user.user.uid })
                localStorage.setItem('token', user.user.uid)
                navigate('/home')
            })
            .catch((error) => {
                alert(error)
            })
    }

    function handleGoogleSignIn() {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((user) => {
                api.post('/user', { id: user.user.uid })
                localStorage.setItem('token', user.user.uid)
                navigate('/home')
            })
            .catch((error) => {
                alert(error)
            })
    }




    return (
        <div className="min-h-screen flex flex-col">
            <Header userdata={null} setUserdata={1} />
            <main className="fixed w-full h-screen flex justify-center items-center">
                <Card className="w-[350px] flex flex-col justify-center items-center">
                    <CardHeader className="mb-5 flex justify-center items-center">
                        <CardTitle className="text-accent-foreground text-xl">Login</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-center items-center gap-3">
                        <div className="flex flex-col gap-3">
                            <label>Email</label>
                            <Input type="email" required placeholder="Email" id="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} />
                            <label>Senha</label>
                            <Input type="password" required placeholder="Senha" id="pass" value={user.pass} onChange={e => setUser({ ...user, pass: e.target.value })} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-3 justify-between mt-10">
                        <Button className="w-full" variant={"secondary"} onClick={handleSimpleLogin}>Login</Button>
                        <Button className="w-full" onClick={() => navigate('/signup')}>Crie sua Conta</Button>
                        <Button className="w-full" variant={"outline"} onClick={handleGoogleSignIn}><FcGoogle className="h-5 w-5 mr-2" />Login com Google</Button>
                    </CardFooter>
                </Card>
            </main>

        </div >
    )
}