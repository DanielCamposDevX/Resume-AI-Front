import VdImage from '@/assets/VideoImage.png'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, } from "@/components/ui/accordion"

type userData = {
    name: string,
    date: Date,
    transcription: string
}


export function VideoCard(props:userData) {

    return (
        <Accordion type="single" collapsible className="w-full border p-3">
            <AccordionItem value="item-1" >
                <AccordionTrigger>
                    <img src={VdImage} className='h-40'/>
                    <h1 className='text-lg'>{props.name}
                        <span className='block text-sm text-muted-foreground'>{props.date.toString()}</span>
                    </h1>
                    
                    </AccordionTrigger>
                <AccordionContent>
                    <h1 className='text-lg mb-3 font-bold'>Transcrição:</h1>
                    <p className='text-muted-foreground'>{props.transcription}</p>
                    
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}