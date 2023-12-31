import { Wand2 } from "lucide-react"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
import { Textarea } from "../components/ui/textarea"
import { Label } from "../components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select"
import { Slider } from "../components/ui/slider"
import { VideoForm } from "../components/videoForm"
import { PromptSelect } from "../components/promptSelect"
import { useState } from "react"
import { useCompletion } from 'ai/react'
import { Header } from "../components/header"
import { auth } from "@/lib/firebase"
import { useNavigate } from "react-router-dom"
import { User } from "firebase/auth"
import { api } from "@/lib/axios"

export function Home() {
  const [temperature, setTemperature] = useState(0.5);
  const [videoId, setVideoId] = useState<null | string>(null);
  const [userdata, setUserdata] = useState<User>({} as User)

  const navigate = useNavigate();

  useState(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        api.post('/user', { id: user.uid })
        localStorage.setItem('uuid', user.uid)
        setUserdata(user)
      }
      else {
        navigate('/')
      }
    })
  },)

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading
  } = useCompletion({
    api: `${import.meta.env.VITE_URL}/ai/complete`,
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-type': 'application/json'
    }
  })

  return (
    <div className="min-h-screen w-full flex flex-col gradient">
      <Header userdata={userdata} setUserdata={setUserdata} />

      <main className="flex-1 p-6 flex flex-col gap-6 md:flex-row mb-10 md:mb-0">
        <div className="flex flex-col flex-1 gap-4">
          <div className="grid grid-rows-2 gap-4 flex-1">
            <Textarea
              className="resize-none p-5 leading-relaxed bg-gray-950/70 border-green-400/50"
              placeholder="Inclua o prompt para IA..."
              value={input}
              onChange={handleInputChange}
            />
            <Textarea
              className="resize-none p-5 leading-relaxed bg-gray-950/70 border-green-400/50"
              placeholder="Resultado gerado pela IA..."
              readOnly
              value={completion}
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Lembre-se: você pode utilizar a variável <code className="text-green-500">{'{transcription}'}</code> no seu prompt para adicionar  conteúdo da transcrição do seu video selecionado
          </p>
        </div>

        <aside className="w-80 space-y-6">

          <VideoForm onVideoUploaded={setVideoId} />

          <Separator />

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-2">
              <Label>Prompt</Label>
              <PromptSelect onPromptSelected={setInput} />
            </div>

            <div className="space-y-2">
              <Label>Modelo</Label>
              <Select defaultValue="gpt3.5" disabled>
                <SelectTrigger className="bg-gray-950/70 border-green-400/60">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>
              <span className="block text-xs text-muted-foreground italic">
                Você poderá customizar essa opção em Breve
              </span>
            </div>
            <Separator />
            <div className="space-y-4">
              <Label>Temperatura {temperature}</Label>
              <Slider min={0} max={1} step={0.1} value={[temperature]} onValueChange={value => setTemperature(value[0])} />
              <span className="block text-xs text-muted-foreground italic leading-relaxed">
                Valores mais altos tendem a deixar o resultado mais criativo e com possíveis erros
              </span>

              <Separator />

              <Button type="submit" disabled={isLoading || !videoId} className="w-full">
                Executar
                <Wand2 className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        </aside>
      </main>
    </div>
  )
}

export default Home
