import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { Linkedin, Github } from "lucide-react"
import IconMain from '@/assets/resume.png'
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { User } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { LogOut } from "lucide-react"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { UserIcon } from "lucide-react"

type Userdataty = {
    setUserdata: any,
    userdata: User | null
}

export function Header(props: Userdataty) {
    const navigate = useNavigate();


    function handlesignOut() {
        signOut(auth).then(() => {
            navigate('/')
        }).catch((error) => {
            alert(error)
        });
    }

    return (
        <div className="px-6 py-3 flex items-center justify-between border-b border-green-400/60 z-50">
            <div className="flex">
                <Avatar className="w-7 h-7 mr-2" onClick={() => navigate('/home')}>
                    <AvatarImage src={IconMain} />
                    <AvatarFallback><UserIcon /></AvatarFallback>
                </Avatar>
                <h1 onClick={() => navigate('/home')} className="text-xl hidden md:flex font-bold cursor-pointer">Resume.aí</h1>
            </div>
            <div className="flex items-center gap-3">
                {props.userdata && (<>

                    <Button variant={"outline"} className="bg-gray-950/70 border-green-400/50" onClick={() => navigate('/user')}>
                        <span className="text-sm text-muted-foreground mr-2 hidden md:flex">
                            {props.userdata.displayName ? props.userdata.displayName : 'Meu Perfil'}
                        </span>
                        <Avatar className="w-7 h-7 md:mr-2">
                            <AvatarImage src={props.userdata.photoURL ? props.userdata.photoURL : undefined} />
                            <AvatarFallback><UserIcon /></AvatarFallback>
                        </Avatar>
                    </Button>
                    <Button variant={"outline"} onClick={handlesignOut} className="bg-gray-950/70 border-green-400/50">
                        <LogOut className="h-4 w-4" />
                    </Button>
                </>)
                }

                <Separator orientation="vertical" className="h-6 hidden md:flex" />

                <a href="https://www.linkedin.com/in/daniel-campos-e-silva-37ab48238/">
                    <Button variant={"outline"} className="bg-gray-950/70 border-green-400/50">
                        <span className="text-sm text-muted-foreground mr-2 hidden md:flex">
                            Linkedin
                        </span>
                        <Linkedin className="h-4 w-4" />
                    </Button>
                </a>

                <a href="https://github.com/DanielCamposDevX">
                    <Button variant={"outline"} className="bg-gray-950/70 border-green-400/50">
                        <Github className="w-4 h-4 mr-2" />
                        <span className="text-sm text-muted-foreground mr-2 hidden md:flex">
                            Github
                        </span>
                    </Button>
                </a>
            </div>
        </div>
    )
}