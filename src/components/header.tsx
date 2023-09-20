import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { Linkedin, Github } from "lucide-react"
import IconMain from '@/assets/resume.png'
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { User } from "firebase/auth"

type Userdataty = {
    setUserdata: any,
    userdata: User | null
 }

export function Header(props: Userdataty) {
    return (
        <div className="px-6 py-3 flex items-center justify-between border-b">
            <div className="flex">
                <Avatar className="w-7 h-7 mr-2">
                    <AvatarImage src={IconMain} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h1 className="text-xl font-bold">Resume.aí</h1>
            </div>
            <div className="flex items-center gap-3">

                <Button variant={"outline"} >
                    <span className="text-sm text-muted-foreground mr-2">
                        {props.userdata ? props.userdata.displayName : ''}
                    </span>
                    {props.userdata?.photoURL && (
                        <Avatar className="w-7 h-7 mr-2">
                            <AvatarImage src={props.userdata.photoURL ? props.userdata.photoURL : undefined} />
                        </Avatar>
                    )}
                </Button>


                <Separator orientation="vertical" className="h-6" />

                <Button variant={"outline"} >

                    <span className="text-sm text-muted-foreground mr-2">
                        Linkedin
                    </span>
                    <Linkedin className="h-4 w-4" /></Button>






                <Button variant={"outline"}>
                    <Github className="w-4 h-4 mr-2" />
                    Github
                </Button>
            </div>
        </div>
    )
}