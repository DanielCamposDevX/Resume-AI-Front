import { Label } from "./ui/label";
import { FileVideo, Upload } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import { getFFmpeg } from "@/lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { api } from "@/lib/axios";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";

type Status = 'waiting' | 'converting' | 'uploading' | 'generating' | 'sucess'


interface VideoInputProps {
    onVideoUploaded: (id: string) => void
}
export function VideoForm(props: VideoInputProps) {

    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [status, setStatus] = useState<Status>('waiting');
    const [loadingpercent, setLoadingpercent] = useState<number>(0);
    const [videoName, setVideoName] = useState<string>('')

    const promptInputRef = useRef<HTMLTextAreaElement>(null)


    function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
        const { files } = event.currentTarget;

        if (!files) {
            return
        }

        const selectedFile = files[0];

        setVideoFile(selectedFile);

    }

    async function convertVideoToAudio(video: File) {
        console.log("Convert started");

        const ffmpeg = await getFFmpeg();

        await ffmpeg.writeFile('input.mp4', await fetchFile(video));
        ffmpeg.on('progress', progress => {
            setLoadingpercent(Math.round(progress.progress * 100));
        })

        await ffmpeg.exec([
            '-i',
            'input.mp4',
            '-map',
            '0:a',
            '-b:a',
            '20k',
            '-acodec',
            'libmp3lame',
            'output.mp3'
        ]);

        const data = await ffmpeg.readFile('output.mp3');

        const audioFileBlob = new Blob([data], { type: 'audio/mpeg' });
        const audioFile = new File([audioFileBlob], 'audio.mp3', { type: 'audio/mpeg' });

        console.log('Convert Finished')
        return audioFile;
    }

    async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const prompt = promptInputRef.current?.value

        if (!videoFile) {
            return
        }

        setStatus('converting');

        const audioFile = await convertVideoToAudio(videoFile);

        const data = new FormData();

        data.append('file', audioFile);

        setStatus('uploading');
        const uuid = localStorage.getItem('uuid')
        const response = await api.post(`/videos/${uuid}`, data);
        const videoId = response.data.video.id;
        setStatus('generating');
        
        const promise = api.post('/tokens', { id: uuid })
        promise.catch((err) => { alert(err.response.data) })


        await api.post(`/videos/${videoId}/transcription`, {
            prompt, videoName
        })

        setStatus('sucess');

        props.onVideoUploaded(videoId)

    }

    const previewURL = useMemo(() => {
        if (!videoFile) {
            return null
        }

        return URL.createObjectURL(videoFile);
    }, [videoFile])

    return (
        <form onSubmit={handleUploadVideo} className="space-y-6 ">

            <label
                htmlFor="video"
                className="relative border flex rounded-md aspect-video cursor-pointer border-dashed border-green-400/50 text-sm flex-col gap-2 items-center justify-center text-muted-foreground bg-gray-950/90 hover:bg-primary/10"
            >
                {previewURL ? (
                    <video src={previewURL} controls={false} className="pointer-events-none absolute inset-0" />
                )
                    :
                    (
                        <>
                            <FileVideo className="w-4 h-4" />
                            Selecione um Video
                        </>
                    )
                }
            </label>

            <input type="file" id="video" accept="video/mp4" className="sr-only" onChange={handleFileSelected} />
            <Input type="text"  className="bg-gray-950/70 border-green-400/50" required placeholder="Nome do Video" id="name" value={videoName} onChange={e => setVideoName(e.target.value)} />

            <div className="space-y-2">
                <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>
                <Textarea disabled={status != 'waiting'} ref={promptInputRef} id="transcription_prompt" className="h-20 leading-relaxed resize-none bg-gray-950/70 border-green-400/60" placeholder="Inclua palavras chave mencionadas no Vídeo separadas por virgula(,)" />
            </div>

            {status === 'waiting' ?
                (
                    <Button disabled={status != 'waiting'} type="submit" className="w-full">
                        Carregar Video
                        <Upload className="w-4 h-4 ml-2" />
                    </Button>
                ) : status === 'generating' ?
                    (
                        <Button disabled type="submit" className="w-full">
                            Gerando
                            <Upload className="w-4 h-4 ml-2" />
                        </Button>
                    )
                    : status === 'sucess' ?
                        (
                            <Button disabled type="submit" className="w-full">
                                Sucess
                                <Upload className="w-4 h-4 ml-2" />
                            </Button>
                        )
                        :
                        (
                            <Progress value={loadingpercent} />
                        )}


        </form>
    )
}