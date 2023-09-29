"use client"


import useModal from "@/hooks/modalStore";
import {useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

function DeleteServer(){


    const {isOpen, onClose, type, data} = useModal();

    const [isLoading, setIsLoading] = useState(false)

    const {server} = data

    const isModalOpen = isOpen && type === "deleteServer";

    const router = useRouter()

    const confirmClick = async () => {
        try {
            setIsLoading(true)
            await axios.delete(`/api/servers/${server?.id}`);
            onClose()
            router.refresh();
            router.push("/");
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center font-bold">Delete server ?</DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to delete <span className="font-bold text-pink-950">{server?.name} </span>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button disabled={isLoading} onClick={onClose} variant="ghost">
                            Cancel
                        </Button>
                        <Button disabled={isLoading} variant="primary" onClick={() => confirmClick()}>
                            Confirm
                        </Button>
                    </div>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default DeleteServer;