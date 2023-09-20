import { Header } from "../components/header";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "@/lib/firebase";

export function Login() {
    const navigate = useNavigate();




    function handleGoogleSignIn() {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then(() => {
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
                <Card className="w-[350px] ">
                    <CardHeader className="mb-5 flex justify-center items-center">
                        <CardTitle className="text-accent-foreground text-xl">Login</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={handleGoogleSignIn}>Login com Google</Button>
                    </CardContent>
                    <CardFooter className="flex justify-between mt-10">
                    </CardFooter>
                </Card>
            </main>

        </div >
    )
}