import { Header } from "../components/header";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc'

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "@/lib/firebase";
import { api } from "@/lib/axios";

export function Login() {
    const navigate = useNavigate();




    function handleGoogleSignIn() {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((user) => {
                api.post('/user', { id: user.user.uid })
                localStorage.setItem('token',user.user.uid)
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
                    <CardContent className="flex flex-col justify-center items-center">
                        <Button variant={"secondary"} onClick={() => navigate('/signup')}>Crie sua Conta</Button>
                        <Button variant={"secondary"} onClick={handleGoogleSignIn}><FcGoogle className="h-5 w-5 mr-2" />Login com Google</Button>
                    </CardContent>
                    <CardFooter className="flex justify-between mt-10">
                    </CardFooter>
                </Card>
            </main>

        </div >
    )
}