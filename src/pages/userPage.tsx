import { Header } from "@/components/header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { User } from "firebase/auth"
import { api } from "@/lib/axios";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";
import { VideoCard } from "@/components/userVideoCard";
import { UserIcon } from "lucide-react";

type video = {
    id: string;
    name: string;
    path: string;
    transcription: string;
    createdAt: Date;
    userId: string;
}


export default function UserPage() {

    const navigate = useNavigate()
    const [user, setUser] = useState<User>({} as User)
    const [videos, setVideos] = useState<video[]>([] as video[])

    useState(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                api.post('/user', { id: user.uid })
                localStorage.setItem('uuid', user.uid)
                setUser(user)
                getVideos(user.uid)
            }
            else {
                navigate('/')
            }
        })
    },)

    function getVideos(id: string) {
        api.get(`/${id}/videos`)
            .then(res => { setVideos(res.data) })
            .catch(err => { console.log(err) })

    }


    return (
        <div className="min-h-screen flex flex-col">
            <Header setUserdata={setUser} userdata={user} />
            <main className="flex-1 flex flex-col items-center  mt-24">
               <h1 className="text-2xl mb-10 text-primary font-bold">Meus Videos</h1>
                <div className="w-3/5 border p-14">
                    <div className="flex gap-4 items-center mb-20">
                        <Avatar className="w-60 h-60 mr-2">
                            <AvatarImage src={user.photoURL || undefined} />
                            <AvatarFallback><UserIcon /></AvatarFallback>
                        </Avatar>
                        <h1 className="text-3xl leading-relaxed">{user.displayName}
                            <span className="block text-xl text-muted-foreground">{user.email}</span>
                        </h1>
                    </div>
                    {videos.map((video, index) => (
                        <VideoCard key={index} name={video.name} transcription={video.transcription} date={video.createdAt} />
                    ))}

                </div>
            </main>
        </div>
    )
}