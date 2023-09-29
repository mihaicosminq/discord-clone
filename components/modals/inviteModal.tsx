import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import useModal from "@/hooks/modalStore";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Check, Copy, RefreshCw} from "lucide-react";
import {useOrigin} from "@/hooks/useOrigin";
import {useState} from "react";
import axios from "axios";


const InviteModal = () => {

    const {isOpen,onOpen, onClose, type,data} = useModal();

    const [copied, setCopied] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const { server } = data


    const origin = useOrigin()

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`



    const isModalOpen = isOpen && type === "invite";

    const onCopy = () =>{
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true)
        setTimeout(()=>{
            setCopied(false)
        },1000)
    }

    const newLink = async () =>{
        try {
            setIsLoading(true)
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`)
            onOpen("invite",{server:response.data})
        }catch (e){
            console.log(e)
        }finally {
            setIsLoading(false)
        }
    }


    //TODO:FRIENDS INVITE


    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">Invite friends</DialogTitle>
                    <div className="p-6">
                        <Label className="uppercase text-xs font-bold text-black dark:text-secondary/70">
                            Server invite link
                        </Label>
                        <div className="flex items-center mt-2 gap-x-2">
                            <Input
                                disabled={isLoading}
                                className="bg-black border-0 focus-visible:ring-0 text-white focus-visible:ring-offset-0"
                                value={inviteUrl}
                            />
                            <Button
                                onClick={onCopy}
                                size="icon"
                                disabled={isLoading}>
                                {copied ? <Check className="w-4 h-4"/> : <Copy className="w-4 h-4"/>}
                            </Button>
                        </div>
                        <Button
                            disabled={isLoading}
                            variant="link"
                            size="sm"
                            onClick={()=>newLink()}
                            className="text-xs text-pink-950">
                            Generate a link <RefreshCw className="w-4 h-4 ml-2"/>
                        </Button>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
export default InviteModal